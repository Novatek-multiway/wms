import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import service from "../services";
import Loading from "@/components/loading";
import useConvertorRequest from "@/hooks/useConvertorRequest";

export default function WorkbenchManagement() {
	const { t } = useTranslation();
	const { getWorkbenchData, delWorkbench, addWorkbench, updateWorkbench, getWarehouseList, getAreaOption, getContainerTypeData } =
		service;

	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const areaOption = useConvertorRequest(getAreaOption, { label: "itemName", value: "itemId" }, ["resultData"]); // 所属区域
	const warehouseOption = useConvertorRequest(getWarehouseList, { label: "warehouseName", value: "id" });
	const containerTypeOption = useConvertorRequest(getContainerTypeData, { label: "name", value: "id" });

	// 库位状态
	const stockInStatusOptions = [
		{ label: t("自动生成入库任务"), value: 1 },
		{ label: t("等待信号触发"), value: 2 },
		{ label: t("等待人工添加搬运任务"), value: 3 }
	];

	const formLayout = { labelCol: { span: 12 }, wrapperCol: { span: 12 } };

	const tableRef = useRef(null);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("行-列"),
			key: "canvasRow",
			width: 120,
			render: (_, record: Record) => {
				return (
					<div>
						{record.canvasRow}-{record.canvasColumn}
					</div>
				);
			}
		},
		{
			title: t("工作台编号"),
			key: "workbenchCode",
			width: 120,
			ellipsis: true,
			search: true,
			dialog: {
				required: true
			}
		},
		{
			title: t("工作台名称"),
			width: 150,
			key: "workbenchName",
			search: true,
			dialog: {
				required: true
			}
		},

		{
			title: t("位置编号"),
			width: 200,
			key: "locationCode",
			dialog: {}
		},
		{
			title: t("允许组盘"),
			width: 150,
			key: "allowReceivingCombine",
			type: "radio-group",
			options: [
				{ label: t("允许"), value: true },
				{ label: t("不允许"), value: false }
			],

			span: 12,
			dialog: {
				defaultValue: true,
				required: true
			}
		},
		{
			title: t("直接收货"),
			width: 150,
			key: "allowDirectReceiving",
			type: "radio-group",
			span: 12,
			options: [
				{ label: t("允许"), value: true },
				{ label: t("不允许"), value: false }
			],

			dialog: {
				defaultValue: false,
				required: true
			}
		},
		{
			title: t("描述"),
			width: 200,
			key: "workbenchDescription"
		},
		{
			title: t("入库模式"),
			width: 200,
			key: "stockInType",
			type: "select",
			options: stockInStatusOptions,
			dialog: {
				required: true
			}
		},
		{
			title: t("是否启用"),
			width: 120,
			key: "isEnabled",
			search: true,
			type: "radio-group",
			options: [
				{ label: t("启用"), value: true },
				{ label: t("禁用"), value: false }
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
			dialog: {
				defaultValue: true,
				required: true
			}
		},

		// {
		// 	title: "所属区域",
		// 	width: 100,
		// 	key: "areaName"
		// },
		{
			title: t("设备编号"),
			width: 180,
			key: "equimentCode",
			tooltip: t("对接WCS的设备编号"),
			dialog: {
				defaultValue: ""
			}
		},
		{
			title: t("容器类型"),
			width: 210,
			key: "containerTypeId",
			tooltip: t("组盘工作台绑定的容器类型"),
			type: "select",
			options: containerTypeOption,
			dialog: {
				defaultValue: 0
			}
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
	const otherFields: Array<MwSearchTableField> = [
		{
			title: t("所属仓库"),
			type: "select",
			key: "warehouseId",
			options: warehouseOption,
			dialog: {
				required: true
			}
		},
		{
			title: t("所属区域"),
			type: "select",
			key: "areaId",
			search: true,
			options: areaOption,
			dialog: {
				required: true
			}
		}
	];

	const coordFields: Array<MwSearchTableField> = [
		{
			title: t("主界面X轴坐标"),
			type: "number",
			key: "mainXaxis",
			dialog: {
				defaultValue: 0
			}
		},
		{
			title: t("主界面Y轴坐标"),
			key: "mainYaxis",
			type: "number",
			dialog: { defaultValue: 0 }
		},
		{
			title: t("画布排"),
			key: "canvasRow",
			type: "number",
			dialog: { defaultValue: 0 }
		},
		{
			title: t("画布列"),
			key: "canvasColumn",
			type: "number",
			dialog: { defaultValue: 0 }
		},
		{
			title: t("描述"),
			key: "workbenchDescription",
			type: "textarea",
			dialog: { defaultValue: "" }
		}
		// {
		// 	title: "区域界面X轴坐标",
		// 	key: "areaXaxis",
		// 	type: "number",
		// 	dialog: {}
		// },
		// {
		// 	title: "区域界面Y轴坐标",
		// 	key: "areaYaxis",
		// 	type: "number",
		// 	dialog: {}
		// },
		// {
		// 	title: "高度",
		// 	width: 80,
		// 	key: "styleHeight"
		// },
		// {
		// 	title: "布局区域图配置编码",
		// 	key: "areaCanvasCode",
		// 	dialog: {}
		// }
	];
	return (
		<Suspense fallback={<Loading>Loading...</Loading>}>
			<MwSearchTable
				ref={tableRef}
				api={getWorkbenchData}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delWorkbench}
				searchExtend={{ visibleRow: 1 }}
				dialogFormExtend={{
					fields: [...otherFields, ...fields, ...coordFields],
					addApi: addWorkbench,
					updateApi: updateWorkbench,
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
