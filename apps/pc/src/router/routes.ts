import { lazy } from "react";
import { configuration } from "./modules/configuration";
import { inventory } from "./modules/inventoryManage";
import { goodsBusiness } from "./modules/goodsBusiness";
import { shoppingBusiness } from "./modules/shoppingBusiness";
import { settings } from "./modules/setting";
import { summary } from "./modules/summary"
interface router {
	path?: string;
	name: string;
	component?: any;
	children?: Array<router>;
	icon?: string;
	label?: string;
	key?: string;
}
export const preDefinedRoutes: Array<router> = [
	{
		path: "/",
		icon: "wms-shebeijiankong",
		name: "home",
		key: "home",
		label: "aside.equipmentMonitoring.nav",
		component: lazy(() => import("@/pages/home/index"))
	},
	...configuration,
	...inventory,
	...goodsBusiness,
	...shoppingBusiness,
	...summary,
	{
		path: "/testMobx",
		icon: "wms-shebeijiankong",
		name: "testMobx",
		key: "testMobx",
		label: "testMobx",
		component: lazy(() => import("@/pages/test/testMobx"))
	},
	{
		path: "/taskInfo",
		icon: "wms-shebeijiankong",
		name: "taskInfo",
		key: "taskInfo",
		label: "taskInfo",
		component: lazy(() => import("@/pages/taskInfo"))
	},
	...settings,
	{
		path: "/customForm",
		icon: "wms-shebeijiankong",
		name: "customForm",
		key: "customForm",
		label: "customForm",
		component: lazy(() => import("@/pages/customForm"))
	}
];

const routes: Array<router> = [
	{
		path: "/login",
		name: "login",
		key: "login",
		component: lazy(() => import("@/pages/login/index"))
	},
	{
		name: "layout",
		key: "layout",
		component: lazy(() => import("@/pages/layout/index")),
		children: [...preDefinedRoutes]
	},
	{
		path: "/403",
		name: "403",
		key: "403",
		component: lazy(() => import("@/components/ErrorPages/403"))
	},
	{
		path: "*",
		name: "404",
		key: "404",
		component: lazy(() => import("@/pages/404"))
	}
];

export default routes;
