import { lazy } from "react";
export const configuration = [
	{
		path: "/menuList", // 菜单列表
		name: "menuList",
		key: "menuList",
		label: "aside.basic.user.menuList",
		component: lazy(() => import("@/pages/basicConfiguration/user/menuList"))
	},
	{
		path: "/permissionList", // 权限列表
		name: "permissionList",
		key: "permissionList",
		label: "aside.basic.user.permissionList",
		component: lazy(() => import("@/pages/basicConfiguration/user/permissionList"))
	},
	{
		path: "/roleList", // 角色列表
		name: "roleList",
		key: "roleList",
		label: "aside.basic.user.roleList",
		component: lazy(() => import("@/pages/basicConfiguration/user/roleList"))
	},
	{
		path: "/userList", // 用户列表
		name: "userList",
		key: "userList",
		label: "aside.basic.user.userList",
		component: lazy(() => import("@/pages/basicConfiguration/user/userList"))
	},
	{
		path: "/canvasManagement",
		name: "canvasManagement",
		key: "canvasManagement",
		label: "aside.basic.composition.canvasManagement",
		component: lazy(() => import("@/pages/basicConfiguration/composition/canvasManagement"))
	},
	{
		path: "/canvasInformation",
		name: "canvasInformation",
		key: "canvasInformation",
		label: "aside.basic.composition.canvasInformation",
		component: lazy(() => import("@/pages/basicConfiguration/composition/canvasInformation"))
	},
	{
		path: "/storeManagement",
		name: "storeManagement",
		key: "storeManagement",
		label: "aside.basic.composition.storeManagement",
		component: lazy(() => import("@/pages/basicConfiguration/composition/storeManagement"))
	},
	{
		path: "/districtManagement",
		name: "districtManagement",
		key: "districtManagement",
		label: "aside.basic.composition.districtManagement",
		component: lazy(() => import("@/pages/basicConfiguration/composition/districtManagement"))
	},
	{
		path: "/roadwayManagement",
		name: "roadwayManagement",
		key: "roadwayManagement",
		label: "aside.basic.composition.roadwayManagement",
		component: lazy(() => import("@/pages/basicConfiguration/composition/roadwayManagement"))
	},
	{
		path: "/spaceTypeManagement",
		name: "spaceTypeManagement",
		key: "spaceTypeManagement",
		label: "aside.basic.composition.spaceTypeManagement",
		component: lazy(() => import("@/pages/basicConfiguration/composition/spaceTypeManagement"))
	},
	{
		path: "/spaceManagement",
		name: "spaceManagement",
		key: "spaceManagement",
		label: "aside.basic.composition.spaceManagement",
		component: lazy(() => import("@/pages/basicConfiguration/composition/spaceManagement"))
	},
	{
		path: "/workbenchManagement",
		name: "workbenchManagement",
		key: "workbenchManagement",
		label: "aside.basic.composition.workbenchManagement",
		component: lazy(() => import("@/pages/basicConfiguration/composition/workbenchManagement"))
	},
	{
		path: "/pathManagement",
		name: "pathManagement",
		key: "pathManagement",
		label: "aside.basic.composition.pathManagement",
		component: lazy(() => import("@/pages/basicConfiguration/composition/pathManagement"))
	},
	{
		path: "/equipmentArchives",
		name: "/equipmentArchives",
		key: "equipmentArchives",
		label: "aside.basic.equipment.equipmentArchives",
		component: lazy(() => import("@/pages/basicConfiguration/equipment/equipmentArchives"))
	},
	{
		path: "/equipmentType",
		name: "equipmentType",
		key: "equipmentType",
		label: "aside.basic.equipment.equipmentType",
		component: lazy(() => import("@/pages/basicConfiguration/equipment/equipmentType"))
	},
	{
		path: "/containerArchives",
		name: "containerArchives",
		key: "containerArchives",
		label: "aside.basic.equipment.containerArchives",
		component: lazy(() => import("@/pages/basicConfiguration/container/containerArchives"))
	},
	{
		path: "/containerType",
		name: "containerType",
		key: "containerType",
		label: "aside.basic.equipment.containerType",
		component: lazy(() => import("@/pages/basicConfiguration/container/containerType"))
	},
	{
		path: "/materialType",
		name: "materialType",
		key: "materialType",
		label: "aside.basic.composition.materialType",
		component: lazy(() => import("@/pages/basicConfiguration/material/materialType"))
	},
	{
		path: "/materialForm",
		name: "materialForm",
		key: "materialForm",
		label: "aside.basic.composition.materialForm",
		component: lazy(() => import("@/pages/basicConfiguration/material/materialForm"))
	},
	{
		path: "/materialSupply",
		name: "materialSupply",
		key: "materialSupply",
		label: "aside.basic.composition.materialSupply",
		component: lazy(() => import("@/pages/basicConfiguration/material/materialSupply"))
	},
	{
		path: "/materialPack",
		name: "materialPack",
		key: "materialPack",
		label: "aside.basic.composition.materialPack",
		component: lazy(() => import("@/pages/basicConfiguration/material/materialPack"))
	},
	{
		path: "/materialInfo",
		name: "materialInfo",
		key: "materialInfo",
		label: "aside.basic.composition.materialInfo",
		component: lazy(() => import("@/pages/basicConfiguration/material/materialInfo"))
	},
	{
		path: "/materialFile",
		name: "materialFile",
		key: "materialFile",
		label: "aside.basic.composition.materialFile",
		component: lazy(() => import("@/pages/basicConfiguration/material/materialFile"))
	},
	// {
	// 	label: "aside.basic.nav",
	// 	icon: "wms-jichupeizhi",
	// 	name: "baseConfiguration",
	// 	key: "baseConfiguration",
	// 	children: [
	// 		{
	// 			label: "aside.basic.user.permission",
	// 			name: "user",
	// 			key: "user",
	// 			children: [
	// 				{
	// 					path: "/menuList", // 菜单列表
	// 					name: "menuList",
	// 					key: "menuList",
	// 					label: "aside.basic.user.menuList",
	// 					component: lazy(() => import("@/pages/basicConfiguration/user/menuList"))
	// 				},
	// 				{
	// 					path: "/permissionList", // 权限列表
	// 					name: "permissionList",
	// 					key: "permissionList",
	// 					label: "aside.basic.user.permissionList",
	// 					component: lazy(() => import("@/pages/basicConfiguration/user/permissionList"))
	// 				},
	// 				{
	// 					path: "/roleList", // 角色列表
	// 					name: "roleList",
	// 					key: "roleList",
	// 					label: "aside.basic.user.roleList",
	// 					component: lazy(() => import("@/pages/basicConfiguration/user/roleList"))
	// 				},
	// 				{
	// 					path: "/userList", // 用户列表
	// 					name: "userList",
	// 					key: "userList",
	// 					label: "aside.basic.user.userList",
	// 					component: lazy(() => import("@/pages/basicConfiguration/user/userList"))
	// 				}
	// 			]
	// 		},
	// 		{
	// 			label: "aside.basic.composition.compositionManagement",
	// 			name: "composition",
	// 			key: "composition",
	// 			children: [
	// 				{
	// 					path: "/canvasManagement",
	// 					name: "canvasManagement",
	// 					key: "canvasManagement",
	// 					label: "aside.basic.composition.canvasManagement",
	// 					component: lazy(() => import("@/pages/basicConfiguration/composition/canvasManagement"))
	// 				},
	// 				{
	// 					path: "/canvasInformation",
	// 					name: "canvasInformation",
	// 					key: "canvasInformation",
	// 					label: "aside.basic.composition.canvasInformation",
	// 					component: lazy(() => import("@/pages/basicConfiguration/composition/canvasInformation"))
	// 				},
	// 				{
	// 					path: "/storeManagement",
	// 					name: "storeManagement",
	// 					key: "storeManagement",
	// 					label: "aside.basic.composition.storeManagement",
	// 					component: lazy(() => import("@/pages/basicConfiguration/composition/storeManagement"))
	// 				},
	// 				{
	// 					path: "/districtManagement",
	// 					name: "districtManagement",
	// 					key: "districtManagement",
	// 					label: "aside.basic.composition.districtManagement",
	// 					component: lazy(() => import("@/pages/basicConfiguration/composition/districtManagement"))
	// 				},
	// 				{
	// 					path: "/roadwayManagement",
	// 					name: "roadwayManagement",
	// 					key: "roadwayManagement",
	// 					label: "aside.basic.composition.roadwayManagement",
	// 					component: lazy(() => import("@/pages/basicConfiguration/composition/roadwayManagement"))
	// 				},
	// 				{
	// 					path: "/spaceManagement",
	// 					name: "spaceManagement",
	// 					key: "spaceManagement",
	// 					label: "aside.basic.composition.spaceManagement",
	// 					component: lazy(() => import("@/pages/basicConfiguration/composition/spaceManagement"))
	// 				},
	// 				{
	// 					path: "/workbenchManagement",
	// 					name: "workbenchManagement",
	// 					key: "workbenchManagement",
	// 					label: "aside.basic.composition.workbenchManagement",
	// 					component: lazy(() => import("@/pages/basicConfiguration/composition/workbenchManagement"))
	// 				},
	// 				{
	// 					path: "/pathManagement",
	// 					name: "pathManagement",
	// 					key: "pathManagement",
	// 					label: "aside.basic.composition.pathManagement",
	// 					component: lazy(() => import("@/pages/basicConfiguration/composition/pathManagement"))
	// 				}
	// 			]
	// 		}
	// 	]
	// },
	{
		path: "/warehouseMap",
		name: "warehouseMap",
		icon: "wms-jichupeizhi",
		key: "warehouseMap",
		label: "aside.warehouseMap",
		component: lazy(() => import("@/pages/warehouseMap/map"))
	},
	{
		path: "/warehouseMap2D",
		name: "warehouseMap2D",
		icon: "wms-jichupeizhi",
		key: "warehouseMap2D",
		label: "aside.warehouseMap2D",
		component: lazy(() => import("@/pages/warehouseMap2D"))
	}
];
