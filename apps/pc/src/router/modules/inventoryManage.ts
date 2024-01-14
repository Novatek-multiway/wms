import { lazy } from "react";
export const inventory = [
	{
		path: "/materialRepertory", // 菜单列表
		name: "materialRepertory",
		key: "materialRepertory",
		label: "inventory.items.materialRepertory.name",
		component: lazy(() => import("@/pages/inventory/materialRepertory"))
	},
	{
		path: "/containerRepertory", // 菜单列表
		name: "containerRepertory",
		key: "containerRepertory",
		label: "inventory.items.containerRepertory.name",
		component: lazy(() => import("@/pages/inventory/containerRepertory"))
	},
	{
		path: "/quality", // 菜单列表
		name: "quality",
		key: "quality",
		label: "inventory.items.quality.name",
		component: lazy(() => import("@/pages/inventory/quality"))
	},
	{
		path: "/check", // 菜单列表
		name: "check",
		key: "check",
		label: "inventory.items.check.name",
		component: lazy(() => import("@/pages/inventory/check"))
	}
	// {
	// 	label: "inventory.nav",
	// 	icon: "wms-jichupeizhi",
	// 	name: "inventory",
	// 	key: "inventory",
	// 	children: [
	// 		{
	// 			path: "/repertory", // 菜单列表
	// 			name: "repertory",
	// 			key: "repertory",
	// 			label: "inventory.items.repertory.name",
	// 			component: lazy(() => import("@/pages/inventory/repertory"))
	// 		},
	// 		{
	// 			path: "/quality", // 菜单列表
	// 			name: "quality",
	// 			key: "quality",
	// 			label: "inventory.items.quality.name",
	// 			component: lazy(() => import("@/pages/inventory/quality"))
	// 		},
	// 		{
	// 			path: "/check", // 菜单列表
	// 			name: "check",
	// 			key: "check",
	// 			label: "inventory.items.check.name",
	// 			component: lazy(() => import("@/pages/inventory/check"))
	// 		}
	// 	]
	// }
];
