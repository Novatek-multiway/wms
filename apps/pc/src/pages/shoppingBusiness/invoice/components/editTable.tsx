import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import React, { ElementRef, forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef } from "react";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import { getMaterialInfo } from "@/pages/basicConfiguration/material/services/materialInfo";

export const materialTypeIdOptions = [
	{
		value: 2,
		label: "吨包"
	},
	{
		value: 1,
		label: "小包"
	}
];

interface IProps {
	record: Record;
}

export interface IRef {
	getTableData?: () => any[];
}

interface ITable<T> {
	getTableData: () => T[];
	getEditTableRowForm: () => { form: any }[];
}

const EditTable: ForwardRefRenderFunction<IRef, IProps> = ({ record }, ref) => {
	const { t } = useTranslation();
	const materialOptions = useConvertorRequest(getMaterialInfo, option => ({
		...option,
		value: option.id,
		label: `${option.materialCode}(${option.materialName})`
	}));

	const tableRef = useRef<ElementRef<typeof MwSearchTable> & ITable<any>>(null);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("单行号"),
			key: "invoiceLineNumber",
			width: 120,
			editable: true,
			contentProps: {
				placeholder: t("pleaseInput")
			}
		},
		{
			title: t("物料编号"),
			key: "materialId",
			width: 200,
			renderType: "editable-cell-select",
			options: materialOptions,
			editable: true,
			formItemProps: {
				rules: [{ required: true, message: t("请选择物料编号") }]
			},
			contentProps: {
				placeholder: t("请选择")
			}
		},
		{
			title: t("物料类型"),
			key: "materialTypeId",
			width: 200,
			renderType: "editable-cell-select",
			options: materialTypeIdOptions,
			editable: true,
			contentProps: {
				placeholder: t("请选择")
			}
		},
		{
			title: t("物料批次号"),
			key: "batchNumber",
			width: 150,
			editable: true,
			contentProps: {
				placeholder: t("pleaseInput")
			}
		},
		{
			title: t("等级"),
			key: "grade",
			width: 150,
			editable: true,
			contentProps: {
				placeholder: t("pleaseInput")
			}
		},
		{
			title: t("颜色"),
			key: "colour",
			width: 150,
			editable: true,
			contentProps: {
				placeholder: t("pleaseInput")
			}
		},
		{
			title: t("数量"),
			key: "quantity",
			renderType: "editable-cell-number",
			width: 120,
			editable: true,
			formItemProps: {
				rules: [
					{ required: true, message: t("请输入发货数量") },
					{
						validator: (_, val: number) => {
							if (val > 0) {
								return Promise.resolve();
							} else {
								return Promise.reject(t("必须大于1"));
							}
						}
					}
				]
			},
			contentProps: {
				precision: 0,
				min: 1,
				placeholder: t("pleaseInput")
			}
		},
		{
			title: t("描述信息"),
			key: "invoiceLineDescription",
			width: 120,
			editable: true,
			type: "textarea",
			ellipsis: "true",
			contentProps: {
				placeholder: t("pleaseInput")
			}
		}
	];

	const ctrl: MwTableCtrlField = {
		title: t("operation"),
		width: 120,
		fixed: "right",
		render: (_, record) => {
			let actions = [];
			if (record.editing) {
				actions = [
					<MwAction key="editable-confirm" action="editable-confirm" record={record}>
						{t("确定")}
					</MwAction>,
					<MwAction key="editable-cancel" danger action="editable-cancel" record={record}>
						{t("取消")}
					</MwAction>
				];
			} else {
				actions = [
					<MwAction key="editable-update" action="editable-update" record={record}>
						{t("编辑")}
					</MwAction>,
					<MwAction key="editable-delete" danger action="editable-delete" record={record}>
						{t("删除")}
					</MwAction>
				];
			}
			return <MwCtrl>{actions}</MwCtrl>;
		}
	};

	useEffect(() => {
		// 不知道为啥编辑的时候没有回显明细表格的数据，只能手动setTableData。
		if (record?.invoiceLineList?.length) {
			tableRef?.current?.setTableData?.(record?.invoiceLineList ?? []);
		}
	}, [record.invoiceLineList]);

	useImperativeHandle(ref, () => ({
		getTableData: tableRef?.current?.getTableData
	}));

	return (
		<>
			<MwSearchTable
				title={t("明细")}
				ref={tableRef}
				searchVisible={false}
				pagination={false}
				extraVisible={false}
				record={record?.invoiceLineList ?? []}
				fields={fields}
				ctrl={ctrl}
				rowKey="id"
				editMode="row"
				after={<MwAction action="editable-add">{t("新增")}</MwAction>}
			></MwSearchTable>
		</>
	);
};

export default forwardRef(EditTable);
