import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, useOptions } from "multiway";
import { useRef, useState } from "react";
import services from "../services";
import { setDefaultDataFilter } from "multiway";
import { message } from "antd";
import StocktakeTable from "./components/stocktakeTable";
import areaService from "@/pages/basicConfiguration/composition/services";
import BillTable from "./components/dispatchBillTable";
import ApplyForLocation from "./components/applyForLocation";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import { GetAreaSelectItemList } from "@/pages/basicConfiguration/material/services/materialFile";
import lodash from "lodash";
export default function check() {
	const { t } = useTranslation();
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const tableRef = useRef<any>(null);
	const dispatchBillTableRef = useRef<any>(null);
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const targetAreaOptions = useConvertorRequest(
		() => GetAreaSelectItemList({ areaType: 2 }),
		item => ({
			label: item.itemName,
			value: item.itemId
		}),
		["resultData"]
	);

	const stocktakeStatus = [
		{ value: 1, label: t("新增") },
		{ value: 2, label: t("激活") },
		{ value: 3, label: t("执行") },
		{ value: 4, label: t("调账") },
		{ value: 5, label: t("完成") },
		{ value: 6, label: t("取消") }
	];

	const globalStatues = [
		{ label: t("是"), value: true },
		{ label: t("否"), value: false }
	];

	const fields: Array<MwSearchTableField> = [
		{
			title: t("盘点计划号"),
			ellipsis: true,
			width: 150,
			key: "stocktakeCode",
			search: true,
			dialog: {
				span: 12
			}
		},
		{
			title: t("搬运目标区域"),
			key: "targetAreaId",
			width: 120,
			type: "select",
			options: targetAreaOptions,
			dialog: {
				required: true
			}
		},
		{
			title: t("是否上传ERP"),
			key: "isUploadErp",
			width: 120,
			options: globalStatues,
			type: "radio-group",
			dialog: {
				span: 12,
				required: true,
				defaultValue: false
			}
		},
		{
			title: t("上传ERP成功次数"),
			key: "uploadErpCount",
			width: 150
		},
		{
			title: t("盘点计划状态"),
			key: "stocktakeStatus",
			width: 120,
			type: "select",
			search: true,
			options: stocktakeStatus
		},
		{
			title: t("是否自动搬运"),
			key: "isCarry",
			width: 120,
			options: globalStatues,
			type: "radio-group",
			required: true,
			dialog: {
				required: true,
				defaultValue: true
			}
		},

		{
			title: t("盘点计划描述"),
			key: "stocktakeDescription",
			width: 120,
			type: "textarea",
			dialog: {
				span: 24
			}
		},
		{
			title: t("添加时间"),
			key: "createTime",
			width: 200
		},
		{
			title: t("更新时间"),
			key: "updateTime",
			width: 200
		},
		{
			title: "",
			key: "billTable",
			type: "custom",
			table: false,
			renderContent: (field, record) => {
				return <BillTable ref={dispatchBillTableRef} record={record} action={"add"} />;
			},
			dialog: {
				span: 24
			},
			hiddenMode: ["view", "update"]
		},
		{
			title: "",
			key: "id",
			type: "custom",
			table: false,
			renderContent: (field, record) => {
				return <BillTable ref={dispatchBillTableRef} record={record} action={"update"} callback={echoData} />;
			},
			dialog: {
				span: 24
			},
			hiddenMode: ["add", "view"]
		},
		{
			title: "",
			key: "id",
			type: "custom",
			table: false,
			renderContent: (field, record) => {
				return <BillTable ref={dispatchBillTableRef} record={record} action={"view"} />;
			},
			dialog: {
				span: 24
			},
			hiddenMode: ["add", "update"]
		}
	];

	const refresh = () => {
		tableRef.current.refresh();
	};

	// 统一处理新增/编辑body
	const unifyBodyData = params => {
		const val = dispatchBillTableRef?.current.getSelection();
		const stocktakeLocationList = val.map(v => {
			return {
				locationCode: v.locationCode,
				locationId: v.id
			};
		});
		const stocktakeInfo = params;
		return { stocktakeLocationList, stocktakeInfo };
	};
	const handleAction = async (record: Record, type: number) => {
		try {
			switch (type) {
				case 1:
					// 激活
					await services.ActiveStocktake({ id: record.id });
					break;
				case 2:
					// 执行
					await services.StocktakeExecute({ id: record.id });
					break;
				case 3:
					// 取消
					await services.DelStocktake({ id: record.id });
					break;
				case 4:
					// 调账
					await services.AdjustedStocktake({ id: record.id });
					break;
				case 5:
					//完成
					await services.CompleteStocktake({ id: record.id });
					break;
				default:
					break;
			}
			message.success(t("操作成功！"));
			refresh();
		} catch (error) {
			message.error(t("操作失败！"));
		}
	};

	// 编辑回显库位勾选详情
	const echoData = (val, data) => {
		let selectionData = val?.map(v => v.locationId);
		let currentSelection = data?.resultData.pageData.filter(v => {
			return selectionData.includes(v.id);
		});
		dispatchBillTableRef.current.refresh();
		dispatchBillTableRef.current.setSelection(currentSelection);
	};

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 200,
		render: (_, record: Record) => {
			const { stocktakeStatus } = record;
			const actions: any = [
				<MwAction key="view" record={record} action="view">
					{t("查看")}
				</MwAction>
			];

			if (stocktakeStatus === 1) {
				actions.push(
					<MwAction confirmtext={t("确定激活？")} confirm={() => handleAction(record, 1)} record={record} action="confirm-action">
						{t("激活")}
					</MwAction>,
					<MwAction key="bj" record={record} action="update">
						{t("编辑")}
					</MwAction>
				);
			}
			if (stocktakeStatus === 2) {
				actions.push(
					<MwAction confirmtext={t("确定执行？")} confirm={() => handleAction(record, 2)} record={record} action="confirm-action">
						{t("执行")}
					</MwAction>
				);
			}
			if (stocktakeStatus === 1 || stocktakeStatus === 2) {
				actions.push(
					<MwAction
						confirmtext={t("确定取消？")}
						confirm={() => handleAction(record, 3)}
						record={record}
						action="confirm-action"
						danger
					>
						{t("取消")}
					</MwAction>
				);
			}
			if (stocktakeStatus === 3) {
				actions.push(
					<MwAction confirmtext={t("确定调账？")} confirm={() => handleAction(record, 4)} record={record} action="confirm-action">
						{t("调账")}
					</MwAction>
				);
			}
			if (stocktakeStatus === 4) {
				actions.push(
					<MwAction confirm={() => handleAction(record, 5)} record={record} action="confirm-action">
						{t("完成")}
					</MwAction>
				);
			}
			return <MwCtrl>{actions}</MwCtrl>;
		}
	};
	const renderExpand = (record: Record) => {
		return <StocktakeTable data={record} action={expanded} />;
	};

	const handleApplyForLocation = () => {
		setOpen(true);
	};
	return (
		<>
			<MwSearchTable
				ref={tableRef}
				api={services.GetPageDataStocktake}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				dialogFormExtend={{
					fields: [...fields],
					addApi: async res => {
						const val = unifyBodyData(res);
						return await services.AddStocktake(val);
					},
					updateApi: async res => {
						const val = unifyBodyData(res);
						return await services.UpdateStocktake(val);
					},
					width: "70%",
					span: 12,
					dialogOnly: true
				}}
				tableExtend={{
					expandable: {
						expandedRowRender: renderExpand
						// onExpand: (val, record) => {
						// 	setExpanded(val);
						// }
					}
				}}
			>
				{/* <MwAction onClick={handleApplyForLocation}>回库申请</MwAction> */}
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
			<ApplyForLocation
				close={() => {
					setOpen(false);
				}}
				open={open}
			/>
		</>
	);
}
