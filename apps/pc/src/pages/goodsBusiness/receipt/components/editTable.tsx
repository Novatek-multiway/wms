import { useTranslation } from "react-i18next";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { MwAction, MwButton, MwCtrl, MwSearchTable, MwTableCtrlField, useOptions, Record } from "multiway";
import React, { useEffect, useMemo, useRef } from "react";
import useConvertorRequest, { OptionItem } from "@/hooks/useConvertorRequest";
import { getMaterialInfo, getQualityStatus } from "../../../basicConfiguration/material/services/materialInfo";
import { IRecordBadge } from "@/hooks/useStatusOptions";

interface IProps {
	data: any;
	receiptStatus: OptionItem[];
	statusEnum: IRecordBadge;
	type?: "view";
}

function EditTable({ type, data: recordRow, receiptStatus, statusEnum }: IProps) {
	const { t } = useTranslation();
	const { goodsStore } = useStore();
	const isView = useMemo(() => type === "view", [type]);
	const tableRef = useRef<any>(null);
	goodsStore.setTableRef(tableRef);
	const materialOptions = useConvertorRequest(getMaterialInfo, option => ({
		...option,
		label: `${option.materialCode}(${option.materialName})`,
		value: option.id
	})); // 物料信息

	const { options: qualityStatusOptions } = useOptions(getQualityStatus, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData"],
		transform: (option: { itemName: any; itemId: any }) => {
			return {
				label: option.itemName,
				value: Number(option.itemId)
			};
		}
	});

	const handleMaterialIdChange = (value: string, option: Record) => {
		tableRef.current.getEditTableRowForm().forEach(({ form, ...args }) => {
			if (form.getFieldValue("materialId") === value) {
				form.setFieldValue("qualityStatus", option.defaultQualityStatus);
				form.setFieldValue("materialCode", option.materialCode);
				form.setFieldValue("packagingName", option.packagingName);
				form.setFieldValue("materialSize", option.materialSize);
				form.setFieldValue("materialTypeName", option.materialTypeName);
			}
		});
	};

	const fields = [
		{
			title: t("单行号"),
			key: "receiptLineNumber",
			width: 100,
			editable: true,
			contentProps: {
				placeholder: t("pleaseInput")
			},
		},
		{
			title: t("收货单行状态"),
			key: "receiptStatus",
			width: 120,
			options: receiptStatus,
			renderType: "status",
			valueEnum: statusEnum,
			hidden: !isView
		},
		{
			title: t("物料编号"),
			key: "materialId",
			width: 240,
			editable: true,
			renderType: "editable-cell-select",
			type: "select",
			options: materialOptions,
			contentProps: {
				onChange: handleMaterialIdChange,
				placeholder: t("请选择物料编号")
			}
		},
		{
			title: t("物料规格"),
			key: "materialSize",
			width: 200,
			editable: true,
			contentProps: {
				disabled: true,
				placeholder: t("pleaseSelect")
			}
		},
		{
			title: t("物料类型"),
			key: "materialTypeName",
			width: 200,
			editable: true,
			contentProps: {
				disabled: true,
				placeholder: t("pleaseInput")
			}
		},
		{
			title: t("单位"),
			key: "packagingName",
			width: 80,
			editable: true,
			contentProps: {
				disabled: true,
				placeholder: t("pleaseInput")
			}
		},
		{
			title: t("质量状态"),
			key: "qualityStatus",
			width: 120,
			editable: true,
			renderType: "editable-cell-select",
			type: "select",
			options: qualityStatusOptions,
			displayRender: (labels: string[]) => labels[labels.length - 1],
			contentProps: {
				placeholder: t("pleaseSelect")
			}
		},
		{
			title: t("批次号"),
			key: "batchNumber",
			width: 120,
			editable: true,
			contentProps: {
				placeholder: t("pleaseInput")
			}
		},
		{
			title: t("应收数量"),
			key: "receivableQuantity",
			width: 120,
			editable: true,
			renderType: "editable-cell-number",
			type: "number",
			formItemProps: {
				rules: [{ required: true, message: t("请输入应收数量") }]
			},
			contentProps: {
				precision: 0,
				min: 1,
				placeholder: t("pleaseInput")
			}
		},
		{
			title: t("已收数量"),
			key: "receivedQuantity",
			width: 120,
			hidden: !isView
		}
	];

	const ctrl: MwTableCtrlField = {
		title: t('operation'),
		width: 150,
		fixed: "right",
		render: (_, record) => {
			let actions = [];
			if (record.editing) {
				actions = [
					<MwAction key="editable-confirm" warning action="editable-confirm" record={record}>
						{t("确定")}
					</MwAction>,
					<MwAction key="editable-cancel" danger action="editable-cancel" record={record}>
						{t("删除")}
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
	return (
		<MwSearchTable
			title={t("明细")}
			ref={tableRef}
			searchVisible={false}
			pagination={false}
			extraVisible={false}
			data={recordRow.receiptLineList}
			fields={fields}
			scrollX={1000}
			ctrl={type === "view" ? [] : ctrl}
			editMode="row"
			rowKey="id"
			dialogFormExtend={{
				initialValues: {
					batchNumber: 1
				}
			}}
			after={type === "view" ? "" : <MwAction action="editable-add">{t("新增")}</MwAction>}
		></MwSearchTable>
	);
}

export default observer(EditTable);
