import { t } from "i18next";
export type EStockTakeType = "Material" | "Location" | "Sampling" | "All";

export interface IdList {
	locationIdList: string[];
	materialIdList: string[];
}

export interface ITableRef {
	refresh?: () => void;
	reset?: () => void;
	getSelection?: () => any[];
	getTableData?: () => any[];
	setSelection: (selections: any[]) => void;
}

export type FHandleSetIdList = (field: keyof IdList, value: string[]) => void;

export const STOCK_TAKE_TYPE_MAP: Record<number, EStockTakeType> = {
	1: "Material",
	2: "Location",
	3: "Sampling",
	4: "All"
};

export type EStocktakeTypeMap = keyof typeof STOCK_TAKE_TYPE_MAP;

export const IS_FULL_OPTIONS = [
	{
		value: true,
		label: t("满")
	},
	{
		value: false,
		label: t("空")
	}
];

export const ACTION_TO_INFOS = {
	active: {
		success: t("盘点单激活成功。"),
		error: t("盘点单激活失败!")
	},
	cancel: {
		success: t("盘点单取消成功。"),
		error: t("盘点单取消失败!")
	},
	finish: {
		success: t("盘点单已完成。"),
		error: t("执行完成操作失败!")
	},
	adjusted: {
		success: t("申请调账成功。"),
		error: t("申请调账失败!")
	}
};

export enum EAuth {
	All = "all", //  盘点中
	Carry = "carry", //  只允许搬运，状态为待调账和完成
	None = "none"
} //  取消
