import { useTranslation } from "react-i18next";

import { message } from "antd";
import { MwAction, MwButton, MwCtrl, Record } from "multiway";
import service from "../../services";
import { ACTION_TO_INFOS } from "../common/constants";

/**
 * 发货单状态
 * 1:新增           编辑、激活、取消
 * 2:待分配         发货单明细-手动分配、取消
 * 3:分配中         取消
 * 4:分配异常       取消
 * 5:出库中         手动完成、分配明细（搬运（批量）、搬运、拣选出库、回库）
 * 6:完成           无
 * 7:取消           无
 * 8:手动完成       无
 */

interface IProps {
	record: Record & { invoiceStatus: number };
	refresh: () => void;
}

type IOperation = (params: { id: number }) => Promise<any>;

export default function Operations({ record, refresh }: IProps) {
	const { t } = useTranslation();
	const { ActiveInvoiceHeaderOrder, CancelInvoiceHeader, ManualFinish } = service;

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

	const CancelButton = <MwButton onClick={() => handleOperation(CancelInvoiceHeader, "cancel")}>{t("取消")}</MwButton>;

	const operationsMap = {
		// 新增
		1: (
			<MwCtrl>
				<MwAction record={record} action="update">
					{t("编辑")}
				</MwAction>
				<MwButton onClick={() => handleOperation(ActiveInvoiceHeaderOrder, "active")}>{t("激活")}</MwButton>
				{CancelButton}
			</MwCtrl>
		),

		// 待分配
		2: (
			<MwCtrl>
				{/* <MwButton>手动分配</MwButton> */}
				{CancelButton}
			</MwCtrl>
		),

		// 分配中
		3: <MwCtrl>{CancelButton}</MwCtrl>,

		// 分配异常
		4: <MwCtrl>{CancelButton}</MwCtrl>,

		// 出库中
		5: (
			<MwCtrl>
				<MwButton onClick={() => handleOperation(ManualFinish, "manualFinish")}>{t("手动完成")}</MwButton>
			</MwCtrl>
		),

		// 取消
		6: null,
		7: null,
		8: null
	};
	return operationsMap?.[(record?.invoiceStatus ?? 8) as keyof typeof operationsMap] ?? null;
}
