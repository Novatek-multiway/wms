import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import service from "../services";
import Loading from "@/components/loading";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import { omit } from "lodash";

export default function SpaceManagement() {
	const { t } = useTranslation();
	const {
		getLocationData,
		delLocation,
		addLocation,
		updateLocation,
		getWarehouseList,
		getLocationOptions,
		getTunnelData,
		getLocationTypeData,
		getLocationStatusOptions,
		getPositionTypeList,
		getInboundTypeList
	} = service;
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const areaOption = useConvertorRequest(getLocationOptions, { label: "itemName", value: "itemId" }, ["resultData"]); // 所属区域
	const warehouseOption = useConvertorRequest(getWarehouseList, { label: "warehouseName", value: "id" });
	const tunnelOptions = useConvertorRequest(getTunnelData, { label: "tunnelName", value: "id" });
	const locationTypeOption = useConvertorRequest(getLocationTypeData, { label: "locationTypeName", value: "id" });
	const locationStatusOptions = useConvertorRequest(getLocationStatusOptions, { label: "itemName", value: "itemId" }, [
		"resultData"
	]);
	const positionTypeOptions = useConvertorRequest(getPositionTypeList, { label: "itemName", value: "itemId" }, ["resultData"]);
	const inboundTypeOptions = useConvertorRequest(getInboundTypeList, { label: "itemName", value: "itemId" }, ["resultData"]);

	// 货架类型
	const shelvesTypeOption = [
		{ label: t("地堆单层货位"), value: 1 },
		{ label: t("地堆多层货位"), value: 2 },
		{ label: t("多层叉入式高架"), value: 3 },
		{ label: t("多层驶入式高架"), value: 4 },
		{ label: t("流利式货架（高架）"), value: 5 },
		{ label: t("四向车立体货架"), value: 6 },
		{ label: t("自动立体货架"), value: 7 }
	];

	// 库位状态
	// const locationStatusOptions = [
	// 	{ label: "任务空闲", value: 1 },
	// 	{ label: "入库锁定", value: 2 },
	// 	{ label: "出库锁定", value: 3 },
	// 	{ label: "取空异常", value: 4 },
	// 	{ label: "占位异常", value: 5 },
	// 	{ label: "维修", value: 6 }
	// ];
	const formLayout = { labelCol: { span: 12 }, wrapperCol: { span: 24 } };

	const tableRef = useRef(null);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("货位编码（系统编码）"),
			key: "customCode",
			width: 210,
			dialog: {
				title: t("货位编码")
			},
			search: {
				title: t("货位编码"),
				defaultValue: undefined
			},
			ellipsis: "true",
			render: (text, record) => `${text}(${record.locationCode})`
		},
		{
			title: t("行-列-层"),
			key: "canvasRow",
			width: 120,
			render: (_, record: Record) => {
				return (
					<div>
						{record.canvasRow}-{record.canvasColumn}-{record.locationLayer}
					</div>
				);
			}
		},
		{
			title: t("位置类型"),
			width: 120,
			key: "positionType",
			type: "select",
			options: positionTypeOptions, // 位置类型：1-库位，2-工位，3-车载位
			dialog: {
				required: true
			},
			search: true
		},
		{
			title: t("仓库"),
			width: 120,
			key: "warehouseName"
		},
		{
			title: t("区域"),
			width: 120,
			key: "areaId",
			options: areaOption
		},
		{
			title: t("巷道"),
			width: 100,
			key: "tunnelName"
		},
		// {
		// 	title: "巷道编码",
		// 	width: 100,
		// 	key: "tunnelCode"
		// },
		{
			title: t("库位状态"),
			width: 100,
			key: "locationStatus", // 1-任务空闲、2-入库锁定、3-出库锁定、4-取空异常、5-占位异常、6-维修
			type: "select",
			search: true,
			options: locationStatusOptions,
			dialog: {
				required: true,
				defaultValue: locationStatusOptions[0]?.value
			}
		},
		{
			title: t("库位空满"),
			width: 120,
			key: "isFull", // 1-满、0-空
			search: true,
			type: "radio-group",
			options: [
				{ label: t("满"), value: true },
				{ label: t("空"), value: false }
			],

			dialog: {
				defaultValue: false,
				required: true
			}
		},
		{
			title: t("报警状态"),
			width: 100,
			key: "isAlarm", // 1-报警、0-正常
			type: "radio-group",
			search: true,
			options: [
				{ label: t("报警"), value: true },
				{ label: t("正常"), value: false }
			],

			dialog: {
				defaultValue: false,
				required: true
			}
		},
		{
			title: t("允许入库"),
			width: 100,
			key: "allowStockIn", //1-允许、0-不允许
			type: "radio-group",
			search: true,
			options: [
				{ label: t("允许"), value: true },
				{ label: t("不允许"), value: false }
			],

			dialog: {
				defaultValue: true,
				required: true
			}
		},
		{
			title: t("允许出库"),
			width: 100,
			key: "allowStockOut", //1-允许、0-不允许
			type: "radio-group",
			search: true,
			options: [
				{ label: t("允许"), value: true },
				{ label: t("不允许"), value: false }
			],

			dialog: {
				defaultValue: true,
				required: true
			}
		},
		{
			title: t("是否盘点中"),
			width: 110,
			key: "isStocktaking", // 1-盘点中、0-未盘点
			search: true,
			type: "radio-group",
			options: [
				{ label: t("盘点中"), value: true },
				{ label: t("未盘点"), value: false }
			],

			dialog: {
				required: true,
				defaultValue: false
			}
		},

		{
			title: t("货架类型"),
			width: 150,
			key: "shelvesType",
			type: "select",
			options: shelvesTypeOption,
			dialog: {
				required: true
			}
		},
		{
			title: t("货位类型"),
			width: 120,
			key: "locationTypeId",
			type: "select",
			options: locationTypeOption,
			dialog: {
				required: true
			}
		},
		{
			title: t("入库类型"),
			width: 120,
			key: "inboundType",
			type: "select",
			options: inboundTypeOptions, // 入库类型：1-直接上架（库位，无搬运任务），2-搬运上架（工位，直接生成搬运任务），3-WCS触发（工位，等待WCS信号生成搬运任务）
			dialog: {
				required: true
			}
		}
		// {
		// 	title: "相同排、列、层货位不同深位是否允许物料混放",
		// 	width: 350,
		// 	align: "center",
		// 	key: "isAllowMixedMaterials", //false不允许、true允许
		// 	type: "radio-group",
		// 	options: [
		// 		{ label: "允许", value: true },
		// 		{ label: "不允许", value: false }
		// 	],
		// 	dialog: {
		// 		title: "是否允许物料混放",
		// 		tooltip: "相同货位不同深位是否允许物料混放："
		// 	}
		// }
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
				required: true,
				defaultValue: warehouseOption[0]?.value
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
		},
		{
			title: t("所属巷道"),
			type: "select",
			key: "tunnelId",
			search: true,
			options: tunnelOptions,
			dialog: {
				required: true
			}
		}
	];

	const coordinateFields: Array<MwSearchTableField> = [
		{
			title: t("货位排"),
			width: 80,
			key: "locationRow",
			type: "number",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("货位列"),
			width: 80,
			key: "locationColumn",
			type: "number",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("货位层"),
			width: 80,
			key: "locationLayer",
			type: "number",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("货位深"),
			width: 110,
			key: "locationDepth",
			type: "number",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("货位分配排起始值"),
			width: 150,
			key: "allocationRowFrom"
		},
		{
			title: t("货位分配列起始值"),
			width: 150,
			key: "allocationColumnFrom"
		},
		{
			title: t("货位分配排差值绝对值"),
			width: 180,
			key: "allocationRowDifference"
		},

		{
			title: t("货位分配列差值绝对值"),
			width: 180,
			key: "allocationColumnDifference"
		},
		{
			title: t("货位分配层起始值"),
			width: 150,
			key: "allocationLayerFrom"
		},
		{
			title: t("货位分配层差值绝对值"),
			width: 180,
			key: "allocationLayerDifference"
		}
	];

	const coordFields: Array<MwSearchTableField> = [
		{
			title: t("X轴坐标"),
			type: "number",
			key: "mainXaxis",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("Y轴坐标"),
			key: "mainYaxis",
			type: "number",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("出库优先级"),
			key: "outboundPriority",
			type: "number",
			dialog: {
				defaultValue: 1,
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("画布排"),
			key: "canvasRow",
			type: "number",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("画布列"),
			key: "canvasColumn",
			type: "number",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
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
		// 	title: "布局区域图配置编码",
		// 	key: "areaCanvasCode",
		// 	dialog: {}
		// }
	];
	return (
		<Suspense fallback={<Loading>Loading...</Loading>}>
			<MwSearchTable
				ref={tableRef}
				api={getLocationData}
				searchExtend={{ visibleRow: 1 }}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delLocation}
				dialogFormExtend={{
					fields: [...otherFields, ...fields, ...coordinateFields, ...coordFields],
					addApi: async res => {
						res.locationAreaName = "";
						res.locationCode = "";
						res.id = 0; // 新增时id传0
						return await addLocation(res);
					},
					updateApi: async res => {
						res.locationAreaName = "";
						res.locationCode = "";
						return await updateLocation(
							omit(res, [
								"warehouseName",
								"tunnelCode",
								"tunnelName",
								"locationTypeName",
								"areaName",
								"containerSummary",
								"LocationCode"
							])
						);
					},
					width: "70%",
					span: 8,
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
