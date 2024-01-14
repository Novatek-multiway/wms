import { useTranslation } from "react-i18next";
import {
	MwAction,
	MwCtrl,
	MwSearchTable,
	MwSearchTableField,
	MwTableCtrlField,
	Record,
	setDefaultDataFilter,
	useOptions
} from "multiway";
import { useRef, useState } from "react";
import service from "../services";
import areaService from "@/pages/basicConfiguration/composition/services";
import {
	getMaterialInfo,
	getQualityStatus,
	getRequirementStatus,
	getAutoAllocationStatus
} from "@/pages/basicConfiguration/material/services/materialInfo";
import { getMaterialForm } from "@/pages/basicConfiguration/material/services/materialForm";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import AllocationTable from "@/pages/shoppingBusiness/waveTime/components/allocationTable";
import { message } from "antd";

export default function Outbound() {
	const { t } = useTranslation();
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const tableRef = useRef(null);
	const [visible, setVisible] = useState(false);
	const [materialSizeValue, setMaterialSizeValue] = useState("");
	const [type, setType] = useState<"view" | "edit" | undefined>(undefined);
	const [choosedRecord, setChoosedRecord] = useState<Record | undefined>(undefined);

	const requirementStatusOPtions = useConvertorRequest(
		getRequirementStatus,
		option => ({ label: option.itemName, value: option.itemId }),
		["resultData"]
	);
	// const requirementStatusOPtions = [
	// 	{ label: "新建", value: 1 },
	// 	{ label: "分配", value: 2 },
	// 	{ label: "执行", value: 3 },
	// 	{ label: "完成", value: 4 },
	// 	{ label: "取消", value: 5 }
	// ];
	const autoAllocationOptions = [
		{ value: 1, label: t("初始") },
		{ value: 2, label: t("自动分配队列中") },
		{ value: 3, label: t("自动分配库存不足") },
		{ value: 4, label: t("分配成功") },
		{ value: 5, label: t("取消分配") }
	];

	const outboundRequirementOptions = [
		{ value: 1, label: t("无单据出库") },
		{ value: 2, label: t("发货单出库") },
		{ value: 3, label: t("波次出库") }
	];

	const { options: targetAreaOptions } = useOptions(areaService.getAreaSelectItemList, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData"],
		keepOrigin: true,
		transform: {
			label: "itemName",
			value: "itemId"
		}
	});
	const { options: materialOptios } = useOptions(getMaterialInfo, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData", "pageData"],
		keepOrigin: true,
		transform: { label: "materialName", value: "id" }
	});
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
	const materialModelOptions = useConvertorRequest(getMaterialForm, { label: "materialModelName", value: "id" }); //物料型号
	const allocationStatusOptions = useConvertorRequest(getAutoAllocationStatus, { label: "itemName", value: "itemId" }, [
		"resultData"
	]);
	const handleFinalAction = async (type, record) => {
		try {
			switch (type) {
				case "auto":
					await service.AutomaticAllocationInQuene({ requirementId: record.id });
					message.success(t("设置成功"));
					break;
				case "execute":
					await service.OutboundExecute({ requirementId: record.id });
					message.success(t("执行成功"));
					break;
				case "finish":
					await service.OutboundConfirm({ requirementId: record.id });
					message.success(t("操作成功"));
					break;
				default:
					break;
			}
			tableRef.current.refresh();
		} catch (err) {
			console.log("err>>", err);
		}
	};
	const handleAction = (type: "view" | "edit", record: Record) => {
		setVisible(true);
		setType(type);
		setChoosedRecord(record);
	};
	const fields: Array<MwSearchTableField> = [
		{
			title: t("出库需求编号"),
			key: "requirementCode",
			width: 160,
			ellipsis: true,
			search: true
		},
		{
			title: t("出库需求状态"),
			key: "requirementStatus",
			width: 160,
			type: "select",
			search: true,
			options: requirementStatusOPtions
		},
		{
			title: t("物料编码"),
			key: "materialCode",
			width: 120,
			search: true
		},
		{
			title: t("物料名称"),
			key: "materialName",
			width: 120
		},

		{
			title: t("物料型号"),
			key: "materialModelId",
			type: "select",
			width: 120,
			options: materialModelOptions,
			dialog: {}
		},
		{
			title: t("批次号"),
			key: "batchNumber",
			width: 120,
			dialog: {}
		},
		{
			title: t("物料数量"),
			key: "quantity",
			width: 160,
			dialog: {
				required: true
			}
		},
		{
			title: t("是否自动搬运"),
			key: "isCarry",
			width: 120,
			search: true,
			type: "radio-group",
			options: [
				{ label: t("是"), value: true },
				{ label: t("否"), value: false }
			],

			dialog: {
				required: true,
				defaultValue: true
			}
		},
		{
			title: t("自动分配状态"),
			key: "allocationStatus",
			width: 160,
			options: allocationStatusOptions
		},
		{
			title: t("搬运目标区域"),
			key: "toAreaId",
			width: 120,
			type: "select",
			search: true,
			options: targetAreaOptions,
			dialog: {
				required: true
			}
		},

		{
			title: t("发货单名称"),
			key: "shipmentLineNumber",
			width: 160,
			hidden: true
		},
		{
			title: t("出库需求类型"),
			key: "outboundRequirementType",
			width: 160,
			search: true,
			options: outboundRequirementOptions,
			hidden: true,
			checked: false
		},
		{
			title: t("自动分配状态"),
			key: "allocationStatus",
			width: 160,
			options: autoAllocationOptions,
			hidden: true,
			checked: false
		}

		// {
		// 	title: "区域名称",
		// 	key: "areaName",
		// 	width: 140,
		// 	hidden: true
		// }
	];
	const otherFields: Array<MwSearchTableField> = [
		{
			title: t("物料信息"),
			key: "materialId",
			width: 120,
			search: true,
			type: "select",
			options: materialOptios,
			dialog: {
				required: true
			},
			onChange: (_, record) => {
				setMaterialSizeValue(record.materialSize);
				tableRef.current.getFromRef().setFieldsValue({
					materialSize: record.materialSize
				});
			}
		},
		{
			title: t("物料规格"),
			key: "materialSize",
			width: 160,
			dialog: {
				disabled: true
			}
		},

		{
			title: t("质量状态"),
			key: "qualityStatus",
			type: "select",
			options: qualityStatusOptions,
			dialog: {
				required: true
			}
		},
		{
			title: t("是否货到人"),
			key: "isPickingByDistribution",
			width: 120,
			search: true,
			type: "radio-group",
			options: [
				{ label: t("是"), value: true },
				{ label: t("否"), value: false }
			],

			dialog: {
				required: true,
				defaultValue: true
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 250,
		fixed: "right",
		render: (_, record: Record) => {
			const { requirementStatus } = record;
			const actions: any = [];
			if (requirementStatus === 1) {
				actions.push(
					<MwAction style={{ color: "#faad14" }} onClick={() => handleFinalAction("auto", record)}>
						{t("设置自动分配")}
					</MwAction>,
					<MwAction onClick={() => handleAction("edit", record)}>{t("手动分配")}</MwAction>
				);
			}
			if (requirementStatus === 2) {
				actions.push(<MwAction onClick={() => handleFinalAction("execute", record)}>{t("执行")}</MwAction>);
			}
			if (requirementStatus === 1 || requirementStatus === 2) {
				actions.push(
					<MwAction record={record} action="delete" danger>
						{t("取消")}
					</MwAction>
				);
			}
			if (requirementStatus === 3) {
				actions.push(<MwAction onClick={() => handleFinalAction("finish", record)}>{t("完成")}</MwAction>);
			}
			if (requirementStatus === 3 || requirementStatus === 4) {
				actions.push(<MwAction onClick={() => handleAction("view", record)}>{t("查看分配")}</MwAction>);
			}
			return <MwCtrl>{actions}</MwCtrl>;
		}
	};
	return (
		<>
			<MwSearchTable
				ref={tableRef}
				api={service.GetOutboundRequirementData}
				searchExtend={{ visibleRow: 1 }}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={async res => {
					return await service.DelOutboundRequirement(res);
				}}
				dialogFormExtend={{
					fields: [...otherFields, ...fields],
					addApi: async res => {
						return await service.AddOutboundRequirement(res);
					},
					width: "70%",
					span: 12,
					dialogOnly: true
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
			<AllocationTable visible={visible} setVisible={setVisible} type={type} record={choosedRecord} />
		</>
	);
}
