import { t } from "i18next";
export const CARRY_STATUS_OPTIONS = [
	{ label: t("满"), value: 1 },
	{ label: t("半满"), value: 2 }
];

// 2: 收货中、3: 待收货状态
export const FILTER_RECEIPT_STATUS = [2, 3];

export function findParentIds(arr: any[], id: string): undefined | string[] {
	for (const item of arr) {
		if (item?.children?.length) {
			const node = findParentIds(item.children, id);
			if (node) {
				return [item.id, ...node];
			}
		}
		if (item.id === id) {
			return [item.value];
		}
	}
}
