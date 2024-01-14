import { lazy } from "react";

export const summary = [
	{
		path: "/realtimeInventory",
		// icon: "wms-shebeijiankong",
		name: "realtimeInventory",
		key: "realtimeInventory",
		label: "realtimeInventory",
		component: lazy(() => import("@/pages/summary/realtimeInventory"))    // 系统设置
	},
	{
		path: "/inventoryJournal",
		// icon: "wms-shebeijiankong",
		name: "inventoryJournal",
		key: "inventoryJournal",
		label: "inventoryJournal",
		component: lazy(() => import("@/pages/summary/inventoryJournal"))    // 系统设置
	},
];
