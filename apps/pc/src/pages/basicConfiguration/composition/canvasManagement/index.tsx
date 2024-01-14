import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import service from "../services";
import Loading from "@/components/loading";
import useConvertorRequest from "@/hooks/useConvertorRequest";

export default function CanvasManagement() {
	const { getCanvasData, addCanvas, updateCanvas, delCanvas, getCanvasTypeList } = service;
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const { t } = useTranslation();
	const tableRef = useRef(null);
	const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 12 } };

	const canvasTypeOption = useConvertorRequest(getCanvasTypeList, { label: "itemName", value: "itemId" }, ["resultData"]);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("画布代码"),
			key: "canvasCode",
			align: "left",
			width: 150,
			search: true,
			dialog: { required: true }
		},
		{
			title: t("画布类型"),
			width: 150,
			key: "canvasType",
			align: "right",
			search: true,
			type: "select",
			options: canvasTypeOption,
			dialog: {
				required: true,
				align: "left"
			}
		},
		{
			title: t("X轴货格数"),
			align: "right",
			width: 120,
			key: "xaxisLength",
			dialog: {
				required: true
			}
		},
		{
			title: t("Y轴货格数"),
			align: "right",
			width: 120,
			key: "yaxisLength",
			dialog: {
				required: true
			}
		},
		{
			title: t("是否默认画布"),
			align: "center",
			width: 120,
			key: "isDefault",
			type: "radio-group",
			search: true,
			options: [
				{
					label: t("是"),
					value: true
				},
				{
					label: t("否"),
					value: false
				}
			],

			dialog: { required: true, align: "left" }
		},
		{
			title: t("展示类型"),
			align: "left",
			// width: 140,
			key: "displayType",
			options: [
				{
					label: t("俯视图"),
					value: 1
				},
				{
					label: t("侧视图"),
					value: 2
				}
			],

			type: "select",
			dialog: { required: true, align: "left" }
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 120,
		fixed: "right",
		render: (_, record: Record) => (
			<MwCtrl>
				<MwAction record={record} action="update">
					{t("编辑")}
				</MwAction>
				<MwAction record={record} danger action="delete">
					{t("删除")}
				</MwAction>
			</MwCtrl>
		)
	};
	return (
		<Suspense fallback={<Loading>Loading...</Loading>}>
			<MwSearchTable
				ref={tableRef}
				api={getCanvasData}
				searchExtend={{ visibleRow: 1 }}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delCanvas}
				dialogFormExtend={{
					fields: [...fields],
					addApi: addCanvas,
					updateApi: updateCanvas,
					width: "60%",
					span: 12,
					dialogOnly: true
					// formExtend: {
					// 	...formLayout
					// }
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
		</Suspense>
	);
}
