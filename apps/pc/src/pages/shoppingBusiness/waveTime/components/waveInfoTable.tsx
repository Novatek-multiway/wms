import { message } from 'antd';
import { t } from 'i18next';
import { MwAction, MwButton, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from 'multiway';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import services from '../../services';
import AllocationTable from './allocationTable';

const invoiceStatusOptions = [
	{ label: t("新增"), value: 1 },
	{ label: t("激活"), value: 2 },
	{ label: t("执行"), value: 3 },
	{ label: t("完成"), value: 4 },
	{ label: t("取消"), value: 5 },
	{ label: t("波次"), value: 6 }
];

const fields: Array<MwSearchTableField> = [
	{
		title: t("波次单号"),
		key: "wavenumberCode",
		width: 180
	},
	{
		title: t("波次单行号"),
		key: "wavenumberLineNumber",
		width: 120
	},
	{
		title: t("物料编号"),
		key: "materialCode",
		width: 100
	},
	{
		title: t("物料型号"),
		key: "materialModelName",
		width: 100
	},
	{
		title: t("批次号"),
		key: "batchNumber",
		width: 120
	},
	{
		title: t("数量"),
		key: "quantity",
		width: 100
	},
	{
		title: t("波次单状态"),
		key: "wavenumberLineStatus",
		type: "select",
		options: invoiceStatusOptions,
		width: 120
	},
	{
		title: t("是否自动完成"),
		key: "isAutocomplete",
		render(text) {
			return text ? t("是") : t("否");
		},
		width: 120
	},
	{
		title: t("描述信息"),
		ellipsis: "true",
		key: "wavenumberLineDescription",
		width: 100
	}
];

const WaveInfoTable = (props: any) => {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(false);
	const [type, setType] = useState<"view" | "edit" | undefined>(undefined);
	const [choosedRecord, setChoosedRecord] = useState<Record | undefined>(undefined);
	const tableRef = useRef<any>(null);

	const { record } = props;
	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 180,
		fixed: "right",
		render: (_, subRecord: Record) => {
			const options: any[] = [
				<MwAction
					key="editable-update"
					action="editable-update"
					record={subRecord}
					onClick={() => handleAction("view", subRecord)}
				>
					{t("查看分配")}
				</MwAction>
			];
			if (record.wavenumberStatus == 2 && !record.isWaveTime) {
				options.push(
					<MwAction
						key="editable-update"
						action="editable-update"
						record={subRecord}
						onClick={() => handleAction("edit", subRecord)}
					>
						{t("手动分配")}
					</MwAction>
				);
			}
			return <MwCtrl>{options}</MwCtrl>;
		}
	};
	const handleAction = (type: "view" | "edit", record: Record) => {
		setVisible(true);
		setType(type);
		setChoosedRecord(record);
	};
	// const handleAutoAllocation = async () => {
	// 	const list = tableRef.current.getSelection();
	// 	if (!list.length) return message.error("请选择！");
	// 	try {
	// 		await services.WaveOrderItemOperate({ waveItemIds: [record?.id], allocationItemList: list, userName: "", isAuto: true });
	// 		tableRef.current.clearSelection();
	// 		message.success("自动分配成功！");
	// 	} catch (e) {
	// 		console.log(e);
	// 		message.error("自动分配失败！");
	// 	}
	// };
	return (
		<>
			<span>{t("波次单行信息:")}</span>
			<MwSearchTable
				ref={tableRef}
				ctrl={ctrl}
				pagination={false}
				extraVisible={false}
				searchVisible={false}
				rowKey="id"
				data={record.wavenumberLineList}
				fields={fields}
			/>

			<AllocationTable
				idType="outboundRequirementId"
				visible={visible}
				setVisible={setVisible}
				type={type}
				record={choosedRecord}
			/>
		</>
	);
};

export default WaveInfoTable;
