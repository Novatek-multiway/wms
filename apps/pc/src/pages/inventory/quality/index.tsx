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
import { useStore } from "@/store";
import areaService from "../../basicConfiguration/composition/services";
import { getMaterialInfo } from "../../basicConfiguration/material/services/materialInfo";
import ReadOnlyTable from "./components/readOnlyTable";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import { GetAreaSelectItemList } from "@/pages/basicConfiguration/material/services/materialFile";
import { message } from "antd";

export default function quality() {
	const { t } = useTranslation();
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const [tableData, setTableData] = useState({});
	const tableRef = useRef(null);
	const ReadOnlyTableRef = useRef<any>(null);
	const { goodsStore } = useStore();

	const qualityStatusOPtions = [
		{ label: t("新增"), value: 1 },
		{ label: t("分配"), value: 2 },
		{ label: t("执行"), value: 3 },
		{ label: t("完成"), value: 4 },
		{ label: t("取消"), value: 5 }
	];

	const targetAreaOptions = useConvertorRequest(
		() => GetAreaSelectItemList({ areaType: 2 }),
		item => ({
			label: item.itemName,
			value: item.itemId
		}),
		["resultData"]
	);
	const { options: materialOptios } = useOptions(getMaterialInfo, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData", "pageData"],
		keepOrigin: true,
		transform: { label: "materialName", value: "id" }
	});
	// 编辑&新增body参数统一处理
	const unifyBodyData = res => {
		const { materialName, materialSize, materialCode, qualityStatus, batchNumber, materialId } =
			ReadOnlyTableRef.current.getSelection()[0];
		const receiptHeaderInfo = { ...res, materialName, materialSize, materialCode, qualityStatus, batchNumber, materialId };
		return receiptHeaderInfo;
	};
	const handleAction = async (type, record: Record) => {
		try {
			switch (type) {
				case "execute":
					await service.ExecuteQualityTest(record.qualityTestCode);
					break;
				case "auto":
					await service.AllotQualityTest(record.qualityTestCode);
					break;
				case "finish":
					await service.CompleteQualityTest(record.qualityTestCode);
					break;
				case "cancel":
					await service.delQuality(record.qualityTestCode);
					break;
				default:
					break;
			}
			tableRef.current.refresh();
		} catch (err) {
			console.log("error", err);
		}
	};
	// 编辑&查看 回显
	const echoData = (current, resultData) => {
		let currentSelection = resultData.filter(v => {
			return current === v.uid;
		});
		ReadOnlyTableRef.current.refresh();
		ReadOnlyTableRef.current.setSelection(currentSelection);
	};
	const fields: Array<MwSearchTableField> = [
		{
			title: t("质检单号"),
			key: "qualityTestCode",
			width: 160,
			ellipsis: true,
			search: true
		},
		{
			title: t("质检单状态"),
			key: "qualityTestStatus",
			width: 120,
			search: true,
			type: "select",
			options: qualityStatusOPtions
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
			title: t("搬运目标区域"),
			key: "targetAreaId",
			width: 120,
			type: "select",
			search: true,
			options: targetAreaOptions,
			dialog: {}
		},
		{
			title: t("物料编码"),
			key: "materialCode",
			width: 120
		},
		{
			title: t("物料名称"),
			key: "materialName",
			width: 120
		},
		{
			title: t("质量状态"),
			key: "qualityStatus",
			width: 120,
			type: "select",
			options: [
				{ label: t("未知"), value: 0 },
				{ label: t("待检"), value: 1 },
				{ label: t("合格"), value: 2 },
				{ label: t("不合格"), value: 3 }
			]
		},
		{
			title: t("质检结果"),
			key: "resultQualityStatus",
			type: "select",
			options: [
				{ label: t("未知"), value: 0 },
				{ label: t("待检"), value: 1 },
				{ label: t("合格"), value: 2 },
				{ label: t("不合格"), value: 3 }
			],

			width: 120
		},
		{
			title: t("抽检容器数量"),
			key: "containerQuantity",
			width: 120,
			type: "number",
			dialog: {
				required: true
			}
		},
		{
			title: t("添加时间"),
			key: "createTime",
			width: 180
		},
		{
			title: t("添加人"),
			key: "createName",
			width: 120
		},
		{
			title: t("更新时间"),
			key: "updateTime",
			width: 180
		},
		{
			title: t("更新人"),
			key: "updateName",
			width: 120
		},
		{
			title: t("质检单描述"),
			key: "qualityTestDescription",
			width: 120,
			dialog: {}
		}
	];

	const otherFields: Array<MwSearchTableField> = [
		// {
		// 	title: "物料信息",
		// 	key: "materialId",
		// 	width: 120,
		// 	search: true,
		// 	type: "select",
		// 	options: materialOptios,
		// 	// onChange: val => {
		// 	// 	setCurrentQualityData(val);
		// 	// },
		// 	dialog: {
		// 		// required: true
		// 	}
		// },
		{
			title: "",
			key: "uid",
			type: "custom",
			renderContent: (_, record) => <ReadOnlyTable ref={ReadOnlyTableRef} record={record} callback={echoData} />,
			dialog: { span: 24 }
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 170,
		fixed: "right",
		render: (_, record: Record) => {
			const actions: any = [
				<MwAction
					key="view"
					record={record}
					action="view"
					onOpen={val => {
						setTableData(val);
					}}
				>
					{t("查看")}
				</MwAction>
			];

			const { qualityTestStatus } = record;
			if (qualityTestStatus === 1) {
				actions.push(
					<MwAction
						record={record}
						action="update"
						onOpen={val => {
							setTableData(val);
						}}
					>
						{t("编辑")}
					</MwAction>,
					<MwAction style={{ color: "#faad14" }} onClick={() => handleAction("auto", record)}>
						{t("分配")}
					</MwAction>
				);
			}
			if (qualityTestStatus === 2) {
				actions.push(
					<MwAction
						confirmtext={t("确定取消？")}
						confirm={() => handleAction("cancel", record)}
						record={record}
						action="confirm-action"
						danger
					>
						{t("取消")}
					</MwAction>,
					<MwAction style={{ color: "#faad14" }} onClick={() => handleAction("execute", record)}>
						{t("执行")}
					</MwAction>
				);
			}
			if (qualityTestStatus === 3) {
				actions.push(
					<MwAction style={{ color: "#faad14" }} onClick={() => handleAction("finish", record)}>
						{t("完成")}
					</MwAction>
				);
			}
			return <MwCtrl>{actions}</MwCtrl>;
		}
	};
	return (
		<MwSearchTable
			ref={tableRef}
			api={service.getQualityTestData}
			searchExtend={{ visibleRow: 1 }}
			fields={fields}
			rowKey="id"
			ctrl={ctrl}
			dialogFormExtend={{
				fields: [...fields, ...otherFields],
				addApi: async res => {
					let requestBody = unifyBodyData(res);
					requestBody.qualityTestCode = "";
					return await service.addQuality({ ...requestBody });
				},
				updateApi: async res => {
					let requestBody = unifyBodyData(res);
					return await service.updateQuality({ ...requestBody });
				},
				width: "70%",
				span: 12,
				dialogOnly: true
			}}
		>
			<MwAction action="add">{t("新增")}</MwAction>
		</MwSearchTable>
	);
}
