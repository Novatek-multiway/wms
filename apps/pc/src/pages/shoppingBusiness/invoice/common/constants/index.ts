import { t } from "i18next";
export const commonOptions = [
	{ label: t("是"), value: true },
	{ label: t("否"), value: false }
];

export const ACTION_TO_INFOS = {
	active: {
		success: t("发货单激活成功。"),
		error: t("发货单激活失败!")
	},
	cancel: {
		success: t("发货单取消成功。"),
		error: t("发货单取消失败!")
	},
	manualFinish: {
		success: t("手动完成收货单成功。"),
		error: t("手动完成收货单失败!")
	}
};

export const DEFAULT_MATIERAL_DES = [
	{
		key: "materialCode",
		label: t("物料编号")
	},
	{
		key: "materialName",
		label: t("物料名称")
	},
	{
		key: "materialSize",
		label: t("物料规格")
	},
	{
		key: "materialTypeName",
		label: t("物料类型")
	},
	{
		key: "quantity",
		label: t("应发数量")
	}
];

/** 发货状态为以下状态时展示分配明细操作按钮
 * 2 待分配
 * 5 出库中
 */
export const SHOW_DETAIL_STATUS = [2, 5];
