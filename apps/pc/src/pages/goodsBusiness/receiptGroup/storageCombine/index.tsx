import { useTranslation } from "react-i18next";
import { Cascader, Input, InputNumber, message } from "antd";
import { isEmpty, omit, pick } from "lodash";
import moment from "moment";
import { MwButton, MwCard, MwForm, MwFormField, MwSearchTable, Record } from "multiway";
import { useEffect, useRef, useState } from "react";
import { getQuery } from "@/assets/js/publicFunc";
import service from "../../services";
import { CARRY_STATUS_OPTIONS, FILTER_RECEIPT_STATUS, findParentIds } from "./common/constants";
import useFormOptions from "./common/hooks/useFormOptions";

export default function StorageCombine() {
	const { t } = useTranslation();
	const { locationCodeOptions, containerCodeOptions, qualityStatusOptions, reloadContainerCodeOptions, refreshLocationOptions } =
		useFormOptions();

	const [receiptOptions, setReceiptOptions] = useState([]);

	const reloadReceipt = async () => {
		const res = await service.postReceiptHeaderList({
			pageIndex: 1,
			pageSize: 200,
			query: {
				receiptStatusList: FILTER_RECEIPT_STATUS // 2: 收货中、3: 待收货状态
			}
		});
		const options = (res?.resultData?.pageData ?? []).map(opt => ({
			...opt,
			label: opt.receiptCode,
			value: opt.id
		}));
		setReceiptOptions(options);
		return options;
	};

	const [loading, setLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	const [containerData, setContainerData] = useState({});

	const [receiptLineList, setReceiptLineList] = useState([]);

	const tableRef = useRef(null);
	const formRef = useRef(null);

	const onDeselect = (value: string, record: any) => {
		const selections = tableRef?.current?.getSelection?.() ?? []
		const newSelections = selections.filter(s => s.receiptCode !== record.receiptCode);
		tableRef?.current?.setSelection?.(newSelections)
	}

	const handleTableChange = (value, index: number, field: string) => {
		const newReceiptLineList = receiptLineList.map((item: Record, idx) => {
			if (idx === index) {
				return {
					...item,
					[field]: value
				};
			}
			return item;
		});
		setReceiptLineList(newReceiptLineList);
		tableRef?.current.setTableData(newReceiptLineList);
	};

	const initReceiptLines = (record: Array<any>) => {
		const receiptLines = record.reduce((acc, cur) => {
			if (cur.receiptLineList.length) {
				const receiptLineList = cur.receiptLineList.reduce((a, c) => {
					if (FILTER_RECEIPT_STATUS.includes(c.receiptStatus)) {
						a.push({
							...c,
							...pick(cur, ["supplierId", "supplierName", "receiptTypeName", "receiptTypeId"]),
							quantity: 1,
							materialUID: ''
						});
					}
					return a;
				}, []);
				acc.push(...receiptLineList);
			}
			return acc;
		}, []);
		setReceiptLineList(receiptLines);
	};

	const tableFields = [
		{
			title: t("收货单号"),
			key: "receiptCode",
			width: 150
		},
		{
			title: t("物料编号"),
			key: "materialCode",
			width: 120
		},
		{
			title: t("物料名称"),
			key: "materialName",
			width: 120
		},
		{
			title: t("物料规格"),
			key: "materialSize",
			width: 120
		},
		{
			title: t("质量状态"),
			key: "qualityStatus",
			width: 100,
			options: qualityStatusOptions
		},
		{
			title: t("应收数量"),
			key: "receivableQuantity",
			width: 120
		},
		{
			title: t("已收数量"),
			key: "receivedQuantity",
			width: 120
		},
		{
			title: t("单位"),
			key: "packagingName",
			width: 80
		},
		{
			title: t("供应商"),
			key: "supplierName",
			width: 120
		},
		{
			title: t("组盘数量"),
			key: "quantity",
			width: 120,
			render: (text, record, index) => (
				<InputNumber
					placeholder={t("请输入组盘数量")}
					min={1}
					onChange={val => handleTableChange(val, index, "quantity")}
					precision={0}
				></InputNumber>
			),

			fixed: "right"
		},
		{
			title: t("物料标识"),
			key: "materialUID",
			width: 120,
			render: (text, record, index) => (
				<Input placeholder={t("pleaseInput")} disabled={!record.hasMaterialSign} onChange={ev => handleTableChange(ev.target.value, index, 'materialUID')}></Input>
			),
			fixed: 'right',
		},
		{
			title: t("描述信息"),
			// type: "textarea",
			key: "materialItemDescription",
			width: 240,
			render: (text, record, index) => (
				<Input
					placeholder={t("请填写描述信息")}
					onChange={ev => handleTableChange(ev.target.value, index, "materialItemDescription")}
				></Input>
			),

			fixed: "right"
		}
	];

	const handleConfirm = async (values: any) => {
		const visited = (tableRef?.current?.getSelection?.() ?? []).reduce((acc, cur) => {
			acc[cur.id] = true;
			return acc;
		}, {});
		const combineItemList = receiptLineList.reduce<Record>((acc, cur: Record) => {
			if (visited[cur.id]) {
				visited[cur.id] = false;
				acc.push({
					...omit(cur, ["id", "rowSpan"]),
					receivingDate: values.receivingDate,
					expiresDays: 0,
					receiptLineId: cur.id,
					materialUID: cur.hasMaterialSign ? cur.materialUID : ''
				})
			}
			return acc;
		}, []);

		const {
			resultData: { receivingBusinessType = 0 }
		} = await service.GetSysReceivingTypeSetting();

		const data = {
			combineOption: receivingBusinessType,
			...containerData,
			...pick(values, ["carryStatus", "containerCode"]),
			locationCode: values.locationCode[1],
			combineItemList
		};
		try {
			setLoading(true);
			await service.storageCombine(data);
			message.success(t("提交成功！"));
			formRef?.current?.resetFields();
			refreshLocationOptions?.();
			reloadContainerCodeOptions?.();
			reloadReceipt?.();
			setReceiptLineList([]);
		} catch (err) {
			console.log("err: ", err);
		} finally {
			setLoading(false);
		}
	};

	const fields: Array<MwFormField> = [
		{
			title: t("组盘位置"),
			type: "custom",
			key: "locationCode",
			require: true,
			renderContent: (...args) => {
				return (
					<Cascader
						options={locationCodeOptions}
						displayRender={(labels: string[]) => labels[labels.length - 1]}
						style={{ width: "100%" }}
						placeholder={t("请选择组盘位置")}
					/>
				);
			}
		},
		{
			title: t("容器编号"),
			key: "containerCode",
			type: "select",
			require: true,
			options: containerCodeOptions,
			onChange: (field, record) => {
				setContainerData({
					containerTypeId: record?.dataItem?.containerTypeId ?? "",
					containerId: record.itemId
				});
				if ((record?.dataItem?.locationId ?? "0") !== "0") {
					const res = findParentIds(locationCodeOptions, record?.dataItem?.locationId);
					const values = formRef.current.getFieldsValue();
					formRef.current.setFieldsValue({
						...values,
						locationCode: res
					});
				}
			}
		},
		{
			title: t("收货单号"),
			key: "receiptCode",
			type: "select",
			require: true,
			options: receiptOptions,
			onChange: (field, record) => {
				if (Array.isArray(record)) {
					initReceiptLines(record);
				}
			},
			mode: 'multiple',
			onDeselect
		},
		{
			title: t("收货日期"),
			key: "receivingDate",
			type: "date",
			require: true,
			defaultValue: moment().format()
		},
		{
			title: t("载货状态"),
			key: "carryStatus",
			type: "select",
			require: true,
			options: CARRY_STATUS_OPTIONS,
			defaultValue: 1
		},
		{
			title: t("组盘物料"),
			type: "custom",
			key: "receiptLineList",
			renderContent: (...args) => {
				return (
					<MwSearchTable
						ref={tableRef}
						// ctrl={ctrl}
						scrollX={1000}
						editMode="row"
						selectionType="checkbox"
						onSelectionChange={values => {
							setIsDisabled(isEmpty(values));
						}}
						rowKey="id"
						extraVisible={false}
						selectShowKey="receiptCode"
						data={receiptLineList}
						fields={tableFields}
					/>
				);
			},
			span: 24,
			hidden: (receiptLineList?.length ?? 0) === 0
		}
	];

	useEffect(() => {
		reloadReceipt().then(options => {
			const { receiptId = "" } = getQuery();
			if (receiptId) {
				const values = formRef.current.getFieldsValue();
				formRef.current.setFieldsValue({
					...values,
					receiptCode: receiptId
				});
				const receiptLine = options.find(item => item.id === receiptId);
				if (receiptLine) {
					initReceiptLines([receiptLine]);
				}
			}
		});
	}, []);

	return (
		<MwCard>
			<MwForm fields={fields} span={8} onConfirm={handleConfirm} ref={formRef}>
				<div className="w-full flex justify-end mb-6">
					<MwButton type="primary" htmlType="submit" loading={loading} disabled={isDisabled}>
						{t("收货组盘")}
					</MwButton>
				</div>
			</MwForm>
		</MwCard>
	);
}
