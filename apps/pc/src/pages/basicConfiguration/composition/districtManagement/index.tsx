import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import service from "../services";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import Loading from "@/components/loading";

export default function DistrictManagement() {
	const { getAreaList, delArea, addArea, updateArea, getWarehouseList } = service;
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const { t } = useTranslation();
	const tableRef = useRef(null);
	const formLayout = { labelCol: { span: 10 }, wrapperCol: { span: 12 } };
	// 所属仓库select
	const warehouseOption = useConvertorRequest(getWarehouseList, { label: "warehouseName", value: "id" });

	const allotLocationTypeOption = [
		{ value: 0, label: t("未定义") },
		{ value: 1, label: t("直接分配货位") },
		{ value: 2, label: t("先分配区域+层，再分配巷道+行+列+深") },
		{ value: 3, label: t("先分配区域+巷道，再分配行+列+层+深") },
		{ value: 4, label: t("先分配区域+巷道+行，再分配列+层+深") },
		{ value: 5, label: t("先分配区域+巷道+行，再分配列+层+深") },
		{ value: 6, label: t("先分配区域+巷道+行，再分配列，最后分配层+深") }
	];

	const fields: Array<MwSearchTableField> = [
		{
			ellipsis: true,
			title: t("区域编号"),
			key: "areaCode",
			align: "center",
			width: 100,
			search: true,
			dialog: { required: true }
		},
		{
			title: t("区域名称"),
			width: 120,
			key: "areaName",
			align: "center",
			search: true,
			dialog: {
				required: true
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
			title: t("货位分配过程类型"),
			align: "center",
			width: 150,
			key: "allotLocationProcessType",
			type: "select",
			options: allotLocationTypeOption,
			dialog: {
				required: true,
				align: "left"
			}
		},
		{
			title: t("区域类型"),
			align: "center",
			width: 100,
			key: "areaType",
			search: true,
			type: "radio-group",
			options: [
				{
					label: t("货位"),
					value: 1
				},
				{
					label: t("工位"),
					value: 2
				}
			],

			dialog: { required: true }
		},
		{
			title: t("区域状态"),
			align: "center",
			width: 100,
			key: "areaState",
			search: true,
			type: "radio-group",
			options: [
				{
					label: t("禁用"),
					value: 0
				},
				{
					label: t("启用"),
					value: 1
				}
			],

			dialog: { required: true }
		},
		{
			title: t("区域描述"),
			align: "center",
			key: "areaDescribe",
			type: "textarea",
			formItemProps: {
				labelCol: { span: 5 },
				wrapperCol: { span: 18 }
			},
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
				api={getAreaList}
				searchExtend={{ visibleRow: 1 }}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delArea}
				dialogFormExtend={{
					fields: [...fields],
					addApi: addArea,
					updateApi: updateArea,
					width: "60%",
					span: 12,
					dialogOnly: true,
					formExtend: {
						...formLayout
					}
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
		</Suspense>
	);
}
