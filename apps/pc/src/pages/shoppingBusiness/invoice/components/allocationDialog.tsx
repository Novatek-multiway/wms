import { useTranslation } from "react-i18next";

import { Descriptions, InputNumber, message } from "antd";
import { has, isEmpty, pick } from "lodash";
import {
	MwButton,
	MwCtrl,
	MwDialog,
	MwSearchTable,
	MwSearchTableField,
	MwTableCtrlField,
	Record,
	setDefaultDataFilter
} from "multiway";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import { useStore } from "@/store";
import services from "../../services";
import { commonOptions } from "../common/constants";
import useCommonTableProps from "../common/hooks/useCommonTableProps";
import useMaterialDescriptions from "../common/hooks/useMaterialDescriptions";
import CarryTask from "./carryTask";

interface IProps {
	record: Record;
	parentRecord: Record;
}

export default function AllocationDialog({ record, parentRecord }: IProps) {
	const { t } = useTranslation();
	const { goodsStore } = useStore();
	const navigate = useNavigate();
	const {
		ConfirmAllocated,
		CancelAllocated,
		GetInventoryList,
		GetAllocatedList,
		SuggestInventoryList,
		BatchCreateCarryTask,
		GetLocationByAreaId,
		InStockApply
	} = services;

	const [visible, setVisible] = useState(false);
	const [confirmAllocatedLoading, setConfirmAllocatedLoading] = useState(false);
	const [cancelAllocatedLoading, setCancelAllocatedLoading] = useState(false);
	const [SuggestInventoryLoading, setSuggestInventoryLoading] = useState(false);
	const [batchCarryTaskLoading, setBatchCarryTaskLoading] = useState(false);

	const getLocation = () => GetLocationByAreaId({ areaId: parentRecord.outboundAreaId }).then(res => res.resultData[0]);

	const locationOptions = useConvertorRequest(getLocation, { label: "itemName", value: "itemValue" }, ["locationSelectItemList"]);

	const {
		isDisabled: isConfirmAllocatedDisabled,
		tableProps: inventoryTableProps,
		ref: inventoryTableRef,
		getSelections: getConfirmSelections
	} = useCommonTableProps({ service: GetInventoryList, record });

	const {
		tableProps: allocatedTableProps,
		isDisabled: isCancelAllocatedDisabled,
		ref: allocatedTableRef,
		tableData
	} = useCommonTableProps({ service: GetAllocatedList, record });

	const materialDescriptions = useMaterialDescriptions({
		record,
		otherDatas: tableData,
		parentRecord,
		statusOptions: goodsStore.qualityStatusOptions
	});

	const refresh = () => {
		allocatedTableRef?.current?.refresh?.();
		inventoryTableRef?.current?.refresh?.();
	};

	//  确认分配
	const handleConfirmAllocated = async () => {
		setConfirmAllocatedLoading(true);
		const selections = getConfirmSelections()?.map(selection => ({
			...pick(selection, ["containerId"]),
			quantity: selection._quantity,
			inventoryId: selection.id,
			invoiceLineId: record.id
		}));
		await ConfirmAllocated(selections).finally(() => setConfirmAllocatedLoading(false));
		message.success(t("分配成功！"));
		inventoryTableRef?.current?.clearSelection?.();
		refresh();
	};

	//  取消分配
	const handleCancelAllocated = async () => {
		setCancelAllocatedLoading(true);
		const selections = (allocatedTableRef?.current?.getSelection?.() ?? []).map(selection => selection.id);
		await CancelAllocated(selections).finally(() => setCancelAllocatedLoading(false));
		allocatedTableRef?.current?.clearSelection?.();
		refresh();
	};

	//  批量搬运
	const handleBatchCarryTask = async () => {
		setBatchCarryTaskLoading(true);
		const selections = (allocatedTableRef?.current?.getSelection?.() ?? []).map(selection => selection.id);
		if (!selections.length) {
			setBatchCarryTaskLoading(false);
			return;
		}
		await BatchCreateCarryTask(selections).finally(() => setBatchCarryTaskLoading(false));
		allocatedTableRef?.current?.clearSelection?.();
		message.success(t("搬运成功！"));
		refresh();
	};

	// 系统推荐
	const handleSuggestInventory = async () => {
		setSuggestInventoryLoading(true);
		const { resultData } = await SuggestInventoryList({ lineId: record.id }).finally(() => setSuggestInventoryLoading(false));
		if (!isEmpty(resultData)) {
			const idToQualityMap = resultData?.reduce((acc, cur) => {
				acc[cur.inventoryId] = cur.allotQuantity;
				return acc;
			}, {});
			const inventoryList = inventoryTableRef?.current?.getTableData();
			const selections: Record[] = [];
			const newInventoryList = inventoryList?.map(inventory => {
				if (has(idToQualityMap, inventory.id)) {
					const newInventory = {
						...inventory,
						_quantity: idToQualityMap[inventory.id]
					};
					selections.push(newInventory);
					return newInventory;
				}
				return inventory;
			});
			inventoryTableRef.current?.setTableData(newInventoryList);
			inventoryTableRef.current?.setSelection(selections);
		}
	};

	// 出库
	const handleOutboundPicking = (record: Record) => {
		const query = {
			...pick(record, ["areaId", "locationCode"]),
			...pick(parentRecord, ["invoiceCode"])
		};
		const queryStr = Object.entries(query)
			.map(i => i.join("="))
			.join("&");
		navigate(`/picking?${queryStr}`);
	};

	// 回库
	const handleInStockApply = async (record: Record) => {
		const params = {
			fromLocationCode: record.locationCode,
			containerCode: record.containerCode
		};
		await InStockApply(params);
		message.success(t("生成回库任务成功"));
		refresh();
	};

	const handleTableChange = (value: string | number, index: number, field: string) => {
		const currentData = inventoryTableRef?.current?.getTableData();
		const newTableData = currentData?.map((item: Record, idx: number) => {
			if (idx === index) {
				return {
					...item,
					[field]: value
				};
			}
			return item;
		});
		inventoryTableRef?.current?.setTableData?.(newTableData);
	};

	const inventoryTableFields: Array<MwSearchTableField> = [
		{
			title: t("容器编号"),
			key: "containerCode",
			width: 150
		},
		{
			title: t("位置编号"),
			key: "customCode",
			width: 150
		},
		{
			title: t("创建时间"),
			key: "createTime",
			width: 150
		},
		{
			title: t("分配锁定"),
			key: "lockedQuantity",
			width: 120
		},
		{
			title: t("可用数量"),
			key: "availableQuantity",
			width: 120
		},
		{
			title: t("分配数量"),
			key: "_quantity",
			width: 120,
			render: (text: number, record, index) => (
				<InputNumber
					min={0}
					value={text}
					placeholder={t("请输入组盘数量")}
					onChange={val => handleTableChange(val as number, index, "_quantity")}
					precision={0}
				></InputNumber>
			)
		}
	];

	const allocatedTableFields: Array<MwSearchTableField> = [
		{
			title: t("容器编号"),
			key: "containerCode",
			width: 150
		},
		{
			title: t("所属区域"),
			key: "areaName",
			width: 150,
			render: (text: string, record) => (text && record.areaCode ? `${record.areaCode}(${text})` : "")
		},
		{
			title: t("容器位置"),
			key: "customCode",
			width: 180
		},
		{
			title: t("已分配数量"),
			key: "quantity",
			width: 100
		},
		{
			title: t("拣选数量"),
			key: "pickingQuantity",
			width: 100
		},
		{
			title: t("拣选完成"),
			key: "isPickingFinish",
			width: 100,
			options: commonOptions
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 90,
		fixed: "right",
		render: (_, subRecord) => {
			if (subRecord.isPickingFinish) {
				return (
					<MwCtrl>
						<MwButton disabled={!subRecord.locationCode} onClick={() => handleInStockApply(subRecord)}>
							{t("回库")}
						</MwButton>
					</MwCtrl>
				);
			}
			return (
				<MwCtrl>
					<CarryTask record={subRecord} locationOptions={locationOptions} />
					<MwButton onClick={() => handleOutboundPicking(subRecord)}>{t("出库")}</MwButton>
				</MwCtrl>
			);
		}
	};

	return (
		<>
			<MwCtrl>
				<MwButton onClick={() => setVisible(true)}>{t("分配明细")}</MwButton>
			</MwCtrl>
			<MwDialog
				width={1200}
				title={t("分配明细")}
				visible={visible}
				confirmVisible={false}
				onClose={() => setVisible(false)}
				bodyStyle={{ overflowY: "auto", maxHeight: 500 }}
			>
				<Descriptions title={null} column={6}>
					{materialDescriptions.map(({ value, label }) => (
						<Descriptions.Item label={label} key={label}>
							{value}
						</Descriptions.Item>
					))}
				</Descriptions>
				<MwSearchTable
					title={t("已分配库存")}
					fields={allocatedTableFields}
					ctrl={ctrl}
					selectShowKey="containerCode"
					rowSelection={{
						getCheckboxProps: (record: any) => ({ disabled: record.isPickingFinish })
					}}
					{...allocatedTableProps}
				>
					<MwButton type="primary" onClick={handleBatchCarryTask} loading={batchCarryTaskLoading}>
						{t("批量搬运")}
					</MwButton>
					<MwButton
						type="primary"
						onClick={handleCancelAllocated}
						disabled={isCancelAllocatedDisabled}
						loading={cancelAllocatedLoading}
					>
						{t("取消分配")}
					</MwButton>
				</MwSearchTable>
				<MwSearchTable
					title={t("可分配库存")}
					fields={inventoryTableFields}
					selectShowKey="containerCode"
					{...inventoryTableProps}
				>
					<MwButton type="primary" onClick={handleSuggestInventory} loading={SuggestInventoryLoading}>
						{t("系统推荐")}
					</MwButton>
					<MwButton
						type="primary"
						onClick={handleConfirmAllocated}
						disabled={isConfirmAllocatedDisabled}
						loading={confirmAllocatedLoading}
					>
						{t("确认分配")}
					</MwButton>
				</MwSearchTable>
			</MwDialog>
		</>
	);
}
