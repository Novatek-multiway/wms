import { t } from "i18next";
import { registerAction, success, registerTableRender, RenderProps, MwAction, registerField } from "multiway";
import { PlusOutlined, BorderOuterOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Badge, Button, Cascader, Switch, Tag, Tooltip } from "antd";
import { find, last } from "lodash";
import SelectSearch from "@/components/selectSearch";
import MwTree from "@/components/MwTree";
import { InputNumber } from "antd";

export interface AnyKeyProps {
	[key: string]: any;
}
// 注册放在 MwCtrl 下的 action
registerAction("ng-add", (props, _record, searchTable) => {
	const { dialogTitle } = props;
	return {
		type: "primary",
		icon: <PlusOutlined />,
		onClick: () => {
			if (props.onOpen) {
				let result = props.onOpen(_record);
				if (result === false) {
					return;
				}
			}
			searchTable.formRef?.current?.add(
				{ ...props.params, ..._record },
				{
					title: dialogTitle || t("新增"),
					onSuccess: (res: any) => {
						success(props.successMsg || props.children + t("成功"));
						searchTable.tableRef.current.refresh();
						// 请求完成回调
						if (props.onFinish) {
							props.onFinish(res);
						}
					}
				}
			);
		},
		...props
	};
});
/**
 * 注册【修改】事件
 */
registerAction("ng-update", (props, record, searchTable) => {
	const [loading, setLoading] = useState(false);
	const { dialogTitle } = props;
	return {
		onClick: () => {
			if (props.onOpen) {
				let result = props.onOpen(record);
				if (result === false) {
					return;
				}
			}
			let extraParams = {
				title: dialogTitle || t("新增"),
				onSuccess: (res: any) => {
					success(props.successMsg || props.children + t("成功"));
					searchTable.tableRef.current.refresh();
					// 请求完成回调
					if (props.onFinish) {
						props.onFinish(res);
					}
				}
			};
			if (props.detailApi) {
				setLoading(true);
				props
					.detailApi(props.detailParams)
					.then((res: AnyKeyProps) => {
						searchTable.formRef?.current?.update(props.detailApiFilter ? props.detailApiFilter(res) : res.data, extraParams);
					})
					.finally(() => {
						setLoading(false);
					});
			} else {
				searchTable.formRef?.current?.update({ ...props.params, ...record }, extraParams);
			}
		},
		loading,
		...props
	};
});

registerTableRender("ng-switch", ({ text, record, field }: RenderProps) => {
	return (
		<Switch
			checkedChildren={t("开启")}
			unCheckedChildren={t("关闭")}
			checked={record[field.key]}
			onChange={val => field.change(record, val)}
		/>
	);
});
registerTableRender("ng-tags", ({ text, record, field }: RenderProps) => {
	const values = record[field.key];
	if (values instanceof Array && field.options) {
		return values.map((item: string) => {
			// console.log(find(field.options), ["value", item]);

			return (
				<Tag key={item} icon={<BorderOuterOutlined />} color="processing">
					{/* {item} */}
					{find(field.options, ["value", item])?.label}
				</Tag>
			);
		});
	} else {
		return (
			<Tooltip title={values}>
				<span className=" truncate ">{values}</span>
			</Tooltip>
		);
	}
});

/**
 * 根据行获取 rowKey，默认取 id
 * @param record 当前行
 * @param rowKey
 * @returns
 */
export const getRowKey = (record: AnyKeyProps, rowKey?: ((item: AnyKeyProps) => React.Key) | string) => {
	try {
		if (typeof rowKey === "function") {
			return rowKey(record);
		} else if (typeof rowKey === "string") {
			return rowKey;
		} else {
			return "id";
		}
	} catch {
		return "id";
	}
};
const getKey = (record: AnyKeyProps, rowKey?: ((item: AnyKeyProps) => React.Key) | string) => {
	return record[getRowKey(record, rowKey)];
};

/**
 * 注册【可编辑表格】【确定】事件
 */
registerAction("editable-confirm", (props, record, searchTable, form) => {
	return {
		onClick: async () => {
			if (record && form) {
				// 获取表单数据
				const values = await form.validateFields();
				// 将表单数据与行数据合并
				const newRow = { ...record, ...values };
				// 取消编辑模式
				delete newRow.editing;
				// 删除新增标识
				delete newRow._isNew;
				// @ts-ignore 重新构建数组
				const newTableData = [...searchTable.tableRef.current.getTableData()];
				// 寻找到对应行
				const index = newTableData.findIndex(row => getKey(row, searchTable?.rowKey) === getKey(newRow, searchTable?.rowKey));
				// 替换行
				newTableData.splice(index, 1, newRow);

				props.callback && props.callback(newRow);
				// 替换表格数据
				searchTable.tableRef.current.setTableData(newTableData);
			}
		},
		...props
	};
});

registerTableRender("renderCount", ({ text, record, field }: RenderProps) => {
	const length = record[field.key].length;
	return (
		<>
			{length ? (
				<>
					{t("数量：")}{" "}
					<Button style={{ padding: "0px", height: "auto" }} onClick={() => field.click(text, record)} type="link">
						{record[field.key].length}
					</Button>
				</>
			) : (
				"-"
			)}
		</>
	);
});

interface CascaderOptionType {
	value: string | number;
	label: string;
	disabled?: boolean;
	children?: CascaderOptionType[];
	isLeaf?: boolean;
}

const getLabelsFromValues = (values: string[], options: CascaderOptionType[]): string[] => {
	const labels: string[] = [];
	let currentOptions: CascaderOptionType[] = options;

	for (const value of values) {
		const option = currentOptions.find(opt => opt.value === value);
		if (option) {
			labels.push(option.label);
			currentOptions = option.children || [];
		} else {
			// 如果找不到对应的选项，则返回空数组
			return [];
		}
	}
	return labels;
};

registerTableRender("editable-cell-cascader", ({ text, record, field }: RenderProps) => {
	const options = field.options || [];
	//	TODO: 暂时取labels最后一项，后续有需求再改
	let labels = Array.isArray(text) ? getLabelsFromValues(text, options) : "";
	return ({ editing, save, mode }: AnyKeyProps) => {
		return !editing ? (
			last(labels)
		) : (
			<Cascader
				placeholder={t("请选择")}
				style={{ width: "100%" }}
				{...field.contentProps}
				displayRender={(labels: string[]) => labels[labels.length - 1]}
				options={options}
				onBlur={save}
			/>
		);
	};
});

registerTableRender("status", ({ text = 0, record, field }: RenderProps) => {
	const valueEnum = field.valueEnum;
	return (
		<>
			<Badge status={valueEnum[text]?.type || valueEnum.default.type} text={valueEnum[text]?.title || valueEnum.default.title} />
		</>
	);
});

/**
 * 注册【删除】事件
 * 重写删除事件，当删除当前页最后一条时，自动跳转到上一页
 */
registerAction("delete", (props, record, searchTable) => {
	return {
		confirm: true,
		confirmMsg: t("你确定要删除此行吗？"),
		onConfirm: () => {
			if (searchTable?.deleteApi && record) {
				const params = [getKey(record, searchTable?.rowKey)];
				searchTable?.deleteApi(params).then((data: any) => {
					success(props.successMsg || t("删除成功"));
					const tableCurrent = searchTable.tableRef.current;
					const tableDataLength = tableCurrent.getTableData().length - 1;
					const serchParams = tableCurrent.getApiParams();
					if (!tableDataLength && serchParams.pageIndex > 1) {
						tableCurrent.reset(Object.assign(serchParams, { pageIndex: serchParams.pageIndex-- }));
					} else {
						tableCurrent.refresh();
					}
					// 请求完成回调
					if (props.onFinish) {
						props.onFinish({ data, params });
					}
				});
			}
		},
		...props
	};
});

// 注册日期
registerField("search-select", {
	type: "search-select",
	defaultValue: "",
	render: ({ field, readonly, getFieldValue }: AnyKeyProps) => {
		let text = getFieldValue(field.key, readonly);
		if (typeof text !== "string") {
			text = "";
		}
		return readonly ? <span className="mw-form-text">{text}</span> : <SelectSearch {...field.props}></SelectSearch>;
	}
});

// 注册tree组件
registerField("tree", {
	type: "tree",
	defaultValue: "",
	render: ({ field, readonly, getFieldValue, setFieldsValue }: AnyKeyProps) => {
		let text = getFieldValue(field.key);
		if (typeof text !== "string") {
			text = "";
		}
		return <MwTree {...field.props} defaultCheckedKeys={field.defaultValue}></MwTree>;
	}
});
// 注册 MwCtrl 下的自定义事件，需要弹窗二次提醒
registerAction("confirm-action", props => {
	const { confirmtext, confirm } = props;
	return {
		confirm: true,
		confirmMsg: confirmtext,
		onConfirm: () => {
			typeof confirm === "function" && confirm();
		},
		...props
	};
});

registerTableRender("editable-cell-number", ({ text, field }: RenderProps) => {
	return ({ editing, mode, save }: AnyKeyProps) => {
		return !editing ? text : <InputNumber {...field.contentProps} onBlur={save} />;
	};
});
