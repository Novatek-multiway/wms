import { useTranslation } from "react-i18next";

import { message } from "antd";
import { MwAction, MwButton, MwCtrl, Record, MwDialog, MwSearchTable, MwSearchTableField } from "multiway";
import service from "../../services";
import { ACTION_TO_INFOS, EAuth } from "../constants";
import StocktakeLocationDialog from "./stocktakeLocationDialog";
import { useState } from "react";
import { useStore } from "@/store";
import AddRecordDialog from "./AddRecordDialog";

/**
 * 发货单状态
 * 1:新增           编辑、激活、取消
 * 2:盘点中         盘点库位（ 搬运（批量）、搬运、回库）、申请调账
 * 3:待调账         完成
 * 4:完成           盈亏明细
 * 5:取消           无
 */

interface IProps {
	record: Record & { invoiceStatus: number };
	handleEdit: (record: Record) => void;
	refresh: () => void;
}

type IOperation = (params: { id: number }) => Promise<any>;

export default function Operations({ record, refresh, handleEdit }: IProps) {
	const { t } = useTranslation();
	const { ActiveStocktake, CancelStocktake, AdjustedStocktake, CompleteStocktake, GetAdjustedStocktake } = service;

	const handleOperation = async (operation: IOperation, key: keyof typeof ACTION_TO_INFOS) => {
		const infos = ACTION_TO_INFOS[key];
		try {
			const { statusCode } = await operation({ id: record.id });
			if (statusCode === 200) {
				message.success(infos.success);
				refresh();
			} else {
				message.error(infos.error);
			}
		} catch (error) {
			console.log("error: ", error);
			message.error(infos.error);
		}
	};

	const AdjustedStocktakeDialog = () => {
		const { goodsStore } = useStore();
		const [visible, setVisible] = useState(false);
		const api = () =>
			GetAdjustedStocktake({ id: record.id }).then(res => ({
				content: res?.resultData ?? [],
				totalCount: res?.resultData?.length ?? 0,
				...res
			}));
		const fields: MwSearchTableField[] = [
			{
				title: t("被盘点库位"),
				key: "customCode",
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
				title: t("物料规格"),
				key: "materialSize",
				width: 100
			},
			{
				title: t("盘前数量"),
				key: "stocktakeQuantity",
				width: 80
			},
			{
				title: t("盘后数量"),
				key: "adjustedQuantity",
				width: 80
			},
			{
				title: t("盈亏状态"),
				key: "stocktakeRecordStatus",
				width: 100,
				options: goodsStore.stocktakeRecordStatusOptions
			}
		];

		return (
			<>
				<MwCtrl>
					<MwButton onClick={() => setVisible(true)}>{t("盈亏明细")}</MwButton>
				</MwCtrl>
				<MwDialog
					width={1500}
					title={t("盘点库位")}
					visible={visible}
					confirmVisible={false}
					onClose={() => {
						setVisible(false);
						refresh();
					}}
					bodyStyle={{ overflowY: "auto", maxHeight: 650 }}
				>
					<MwSearchTable
						title={t("盈亏明细")}
						rowKey="id"
						api={api}
						scrollX={1200}
						searchVisible={false}
						pagination={false}
						extraVisible={false}
						fields={fields}
					></MwSearchTable>
				</MwDialog>
			</>
		);
	};

	const CancelButton = <MwButton onClick={() => handleOperation(CancelStocktake, "cancel")}>{t("取消")}</MwButton>;
	const operationsMap = {
		// 新增
		1: (
			<MwCtrl>
				<MwAction record={record} action="update" onOpen={handleEdit}>
					{t("编辑")}
				</MwAction>
				<MwButton onClick={() => handleOperation(ActiveStocktake, "active")}>{t("激活")}</MwButton>
				{CancelButton}
			</MwCtrl>
		),

		// 盘点中
		2: (
			<MwCtrl>
        <AddRecordDialog record={record} refresh={refresh} />
				{/* <StocktakeLocationDialog record={record} auth={EAuth.All} /> */}
				<MwButton onClick={() => handleOperation(AdjustedStocktake, "adjusted")}>{t("申请调账")}</MwButton>
			</MwCtrl>
		),

		// 待调账
		3: (
			<MwCtrl>
				<StocktakeLocationDialog record={record} auth={EAuth.Carry} />
				<MwButton onClick={() => handleOperation(CompleteStocktake, "finish")}>{t("完成")}</MwButton>
			</MwCtrl>
		),

		// 完成
		4: (
			<MwCtrl>
				<AdjustedStocktakeDialog />
				<StocktakeLocationDialog record={record} auth={EAuth.Carry} />
			</MwCtrl>
		),
		// 取消
		5: <StocktakeLocationDialog record={record} auth={EAuth.None} />
	};
	return operationsMap?.[(record?.stocktakeStatus ?? 5) as keyof typeof operationsMap] ?? null;
}
