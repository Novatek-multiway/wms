import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import React, { useRef, useState } from "react";
import { SHOW_DETAIL_STATUS } from "../common/constants";
import AllocationDialog from "./allocationDialog";
import { materialTypeIdOptions } from "./editTable";

interface IProps {
	record: Record;
	statusEnum: Record;
}

const DetailTable = ({ record, statusEnum }: IProps) => {
	const { t } = useTranslation();
	const tableRef = useRef<any>(null);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("单行号"),
			key: "invoiceLineNumber",
			width: 120
		},
		{
			title: t("单行状态"),
			key: "invoiceLineStatus",
			width: 120,
			renderType: "status",
			valueEnum: statusEnum
		},
		{
			title: t("物料编号"),
			key: "materialCode",
			width: 150,
			render: (text, record) => `${text}(${record.materialName})`
		},
		{
			title: t("物料类型"),
			key: "materialTypeId",
			width: 120,
			options: materialTypeIdOptions
		},
		{
			title: t("批次号"),
			key: "batchNumber",
			width: 150
		},
		{
			title: t("应发数量"),
			key: "quantity",
			width: 120
		},
		{
			title: t("已发数量"),
			key: "outboundQuantity",
			width: 120
		},
		{
			title: t("等级"),
			key: "grade",
			width: 100
		},
		{
			title: t("颜色"),
			key: "colour",
			width: 100
		}
	];

	const ctrl: MwTableCtrlField = {
		title: t("operation"),
		width: 90,
		fixed: "right",
		render: (_, subRecord) => {
			const options: any[] = [];
			if (SHOW_DETAIL_STATUS.includes(record.invoiceStatus)) {
				options.push(<AllocationDialog record={subRecord} parentRecord={record} />);
			}
			return <MwCtrl>{options}</MwCtrl>;
		}
	};
	return (
		<>
			<span>{t("明细")}:</span>
			<MwSearchTable
				ref={tableRef}
				ctrl={ctrl}
				pagination={false}
				extraVisible={false}
				searchVisible={false}
				rowKey="id"
				selectShowKey="id"
				data={record.invoiceLineList}
				fields={fields}
			/>
		</>
	);
};

export default DetailTable;
