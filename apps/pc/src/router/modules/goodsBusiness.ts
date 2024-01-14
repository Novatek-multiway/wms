import { lazy } from "react";

export const goodsBusiness = [
	{
		path: "/receipt", // 收货单管理
		name: "receipt",
		key: "receipt",
		label: "goods.items.receipt",
		component: lazy(() => import("@/pages/goodsBusiness/receipt"))
	},
	// {
	// 	path: "/receiptType", // 收货类型管理
	// 	name: "receiptType",
	// 	key: "receiptType",
	// 	label: "goods.items.receiptType",
	// 	component: lazy(() => import("@/pages/goodsBusiness/receiptType"))
	// },
	{
		path: "/storageCombine", // 组盘入库
		name: "storageCombine",
		key: "storageCombine",
		label: "goods.items.storageCombine",
		component: lazy(() => import("@/pages/goodsBusiness/receiptGroup/storageCombine"))
	},
];
