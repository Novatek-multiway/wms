import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import {
	MwAction,
	MwCtrl,
	MwSearchTable,
	MwSearchTableField,
	MwTableCtrlField,
	Record,
	setDefaultDataFilter,
	setDefaultSearchFilter
} from "multiway";
import service from "../services";
import Loading from "@/components/loading";
import useConvertorRequest from "@/hooks/useConvertorRequest";

export default function RoadwayManagement() {
	const { getTunnelData, delTunnel, addTunnel, updateTunnel, getAreaList, getWarehouseList } = service;
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const { t } = useTranslation();
	const tableRef = useRef(null);
	const areaOption = useConvertorRequest(getAreaList, { label: "areaName", value: "id" });

	const warehouseOption = useConvertorRequest(getWarehouseList, { label: "warehouseName", value: "id" });

	const fields: Array<MwSearchTableField> = [
		{
			title: t("巷道编码"),
			key: "tunnelCode",
			align: "center",
			width: 100,
			search: true,
			dialog: { required: true, placeholder: t("巷道编码长度为2个字符"), tooltip: t("巷道编码长度为2个字符，例如：A1") }
		},
		{
			title: t("巷道名称"),
			width: 120,
			key: "tunnelName",
			align: "center",
			search: true,
			dialog: {
				required: true,
				align: "left"
			}
		},
		{
			title: t("所属区域"),
			align: "center",
			width: 150,
			key: "areaId",
			type: "select",
			options: areaOption,
			dialog: {
				required: true,
				align: "left"
			}
		},
		{
			title: t("所属仓库"),
			align: "center",
			width: 150,
			key: "warehouseId",
			type: "select",
			options: warehouseOption,
			dialog: {
				required: true,
				align: "left"
			}
		},
		{
			title: t("关联货排"),
			align: "center",
			width: 100,
			key: "relationRows",
			dialog: {
				required: true,
				placeholder: t("并联货排(多个逗号隔开)"),
				tooltip: t("多个逗号隔开，例如：1,2,3..")
			}
		},
		{
			title: t("巷道状态"),
			align: "center",
			width: 100,
			key: "tunnelState",
			type: "radio-group",
			search: true,
			options: [
				{ label: t("禁用"), value: false },
				{ label: t("启用"), value: true }
			],

			renderType: "status",
			valueEnum: {
				true: {
					title: t("启用"),
					type: "processing"
				},
				default: {
					title: t("禁用"),
					type: "error"
				}
			},
			dialog: { required: true }
		},
		{
			title: t("巷道描述"),
			align: "center",
			// width: 120,
			key: "tunnelDescribe",
			type: "textarea",
			dialog: { required: true, span: 24 }
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
				api={getTunnelData}
				searchExtend={{ visibleRow: 1 }}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delTunnel}
				dialogFormExtend={{
					fields: [...fields],
					addApi: addTunnel,
					updateApi: updateTunnel,
					width: "50%",
					span: 12,
					dialogOnly: true
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
		</Suspense>
	);
}
