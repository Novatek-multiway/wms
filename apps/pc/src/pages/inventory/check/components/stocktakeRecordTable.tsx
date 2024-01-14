import { MwButton, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { commonOptions } from "@/pages/shoppingBusiness/invoice/common/constants";
import { useStore } from "@/store";
import { materialTypeIdOptions } from "@/utils/date";
import services from "../../services";
import { message } from "antd";

interface IProps {
	record: Record;
	refresh: (id: any) => void;
	data: any[];
}

export default function StocktakeRecordTable({ record, refresh, data }: IProps) {
	const { t } = useTranslation();
	const { goodsStore } = useStore();
	const { postUpdateStocktakeRecord } = services;

	const tableRef = useRef(null);

	const fields: MwSearchTableField[] = [
		{
			title: t("被盘点库位"),
			key: "customCode",
			width: 100
		},
		{
			title: t("容器位置"),
			key: "containerPosition",
			width: 100
		},
		{
			title: t("容器编号"),
			key: "containerCode",
			width: 100
		},
		{
			title: t("物料编号"),
			key: "materialCode",
			width: 100,
			render: (text, record) => `${text}(${record.materialName})`
		},
		{
			title: t("物料类型"),
			key: "materialTypeId",
			width: 120,
			options: materialTypeIdOptions
		},
		{
			title: t("LPN"),
			key: "lpn",
			width: 100
		},
		{
			title: t("盘前数量"),
			key: "stocktakeQuantity",
			width: 100
		},
		{
			title: t("盘后数量"),
			key: "adjustedQuantity",
			width: 100
		},
		{
			title: t("盈亏状态"),
			key: "stocktakeRecordStatus",
			width: 100,
			options: goodsStore.stocktakeRecordStatusOptions
		},
		{
			title: t("盘点完成"),
			key: "isFinish",
			width: 80,
			options: commonOptions
		}
	];

	const handleUpdateRecord = async (re: Record, hasLPN: boolean) => {
		await postUpdateStocktakeRecord([{ ...re, adjustedQuantity: hasLPN ? 1 : 0 }]);
		message.success(t("提交成功"));
		refresh?.(record);
	};

	const ctrl: MwTableCtrlField = {
		title: t("operation"),
		width: 80,
		fixed: "right",
		render: (_, currentRecord: Record) => {
			return (
				<MwCtrl>
					<MwButton disabled={currentRecord.isFinish} onClick={() => handleUpdateRecord(currentRecord, true)}>
						有
					</MwButton>
					<MwButton disabled={currentRecord.isFinish} onClick={() => handleUpdateRecord(currentRecord, false)}>
						无
					</MwButton>
				</MwCtrl>
			);
		}
	};

	return (
		<MwSearchTable
			ref={tableRef}
			title={t("盘点记录")}
			rowKey="id"
			ctrl={ctrl}
			data={data}
			scrollX={1200}
			searchVisible={false}
			pagination={false}
			extraVisible={false}
			fields={fields}
		></MwSearchTable>
	);
}
