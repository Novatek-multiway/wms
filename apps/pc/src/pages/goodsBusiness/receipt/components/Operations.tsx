import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwButton, Record } from "multiway";
import { t } from "i18next";
import { message } from "antd";
import service from "../../services";
import { useNavigate } from "react-router-dom";

/**
 * 收货单状态
 * 1:新增           编辑、激活、取消
 * 2:待收货         组盘入库、取消
 * 3:收货中         组盘入库、手动完成
 * 4:完成
 * 5:取消
 * 6:手动完成
 */

interface IProps {
	record: Record;
	refresh: () => void;
}

type IOperation = (params: { id: number }) => Promise<any>;

const ACTION_TO_INFOS = {
	active: {
		success: t("收货单激活成功。"),
		error: t("收货单激活失败!")
	},
	cancel: {
		success: t("收货单取消成功。"),
		error: t("收货单取消失败!")
	},
	manualFinish: {
		success: t("手动完成收货单成功。"),
		error: t("手动完成收货单失败!")
	}
};

export default function Operations({ record, refresh }: IProps) {
	const { t } = useTranslation();
	const { ReceiptHeaderActive, ReceiptHeaderCancel, ReceiptHeaderManualFinish } = service;

	const navigate = useNavigate();

	const handleStorageCombine = () => {
		navigate(`/storageCombine?receiptId=${record.id}`);
	};

	const handleOperation = async (operation: IOperation, infos: typeof ACTION_TO_INFOS["active"]) => {
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
	const operationsMap = {
		// 新增
		1: (
			<MwCtrl>
				<MwAction record={record} action="update">
					{t("编辑")}
				</MwAction>
				<MwButton onClick={() => handleOperation(ReceiptHeaderActive, ACTION_TO_INFOS["active"])}>{t("激活")}</MwButton>
				<MwButton onClick={() => handleOperation(ReceiptHeaderCancel, ACTION_TO_INFOS["cancel"])}>{t("取消")}</MwButton>
			</MwCtrl>
		),

		// 待收货
		2: (
			<MwCtrl>
				<MwButton onClick={handleStorageCombine}>{t("组盘入库")}</MwButton>
				<MwButton onClick={() => handleOperation(ReceiptHeaderCancel, ACTION_TO_INFOS["cancel"])}>{t("取消")}</MwButton>
			</MwCtrl>
		),

		// 收货中
		3: (
			<MwCtrl>
				<MwButton onClick={handleStorageCombine}>{t("组盘入库")}</MwButton>
				<MwButton onClick={() => handleOperation(ReceiptHeaderManualFinish, ACTION_TO_INFOS["manualFinish"])}>
					{t("手动完成")}
				</MwButton>
			</MwCtrl>
		),

		// 完成
		4: null,
		// 手动完成
		5: null,
		// 取消
		6: null
	};
	return operationsMap?.[(record?.receiptStatus ?? 6) as keyof typeof operationsMap] ?? null;
}
