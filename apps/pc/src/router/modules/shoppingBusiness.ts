import { lazy } from "react";

export const shoppingBusiness = [
	{
		path: "/outbound", // 菜单列表
		name: "outbound",
		key: "outbound",
		label: "shopping.items.outbound.name",
		component: lazy(() => import("@/pages/shoppingBusiness/outbound"))
	},
	{
		path: "/picking", // 菜单列表
		name: "picking",
		key: "picking",
		label: "shopping.items.picking.name",
		component: lazy(() => import("@/pages/shoppingBusiness/picking"))
	},
	{
		path: "/invoice", // 菜单列表
		name: "invoice",
		key: "invoice",
		label: "shopping.items.invoice.name",
		component: lazy(() => import("@/pages/shoppingBusiness/invoice"))
	},
	{
		path: "/deliveryType", // 菜单列表
		name: "deliveryType",
		key: "deliveryType",
		label: "shopping.items.deliveryType.name",
		component: lazy(() => import("@/pages/shoppingBusiness/deliveryType"))
	},
	{
		path: "/waveTime", // 菜单列表
		name: "waveTime",
		key: "waveTime",
		label: "shopping.items.waveTime.name",
		component: lazy(() => import("@/pages/shoppingBusiness/waveTime"))
	}
];
