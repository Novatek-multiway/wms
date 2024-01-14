import { lazy } from "react";
export const settings = [
	{
		path: "/dataManager",
		icon: "wms-shebeijiankong",
		name: "dataManager",
		key: "dataManager",
		label: "dataManager",
		component: lazy(() => import("@/pages/setting/dataManager")) // 系统设置
	},
	{
		path: "/dictinoaryManager",
		icon: "wms-shebeijiankong",
		name: "dictinoaryManager",
		key: "dictinoaryManager",
		label: "dictinoaryManager",
		component: lazy(() => import("@/pages/setting/dictionaryManager")) // 系统设置
	},
	{
		path: "/warehousingStrategy",
		icon: "wms-shebeijiankong",
		name: "warehousingStrategy",
		key: "warehousingStrategy",
		label: "warehousingStrategy",
		component: lazy(() => import("@/pages/setting/warehousingStrategy")) // 入库策略
	}
];
