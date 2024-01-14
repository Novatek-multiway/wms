import { MenuItem } from "./index.d";
// 菜单管理
export const menus: Array<MenuItem> = [
	{
		key: "home",
		label: "aside.equipmentMonitoring.nav",
		icon: "wms-shebeijiankong",
		path: "/" // 我的状态
	},
	{
		key: "warehouseMap",
		label: "aside.warehouseMap",
		icon: "wms-shebeijiankong",
		path: "/warehouseMap"
	},
	{
		key: "warehouseMap2D",
		label: "aside.warehouseMap2D",
		icon: "wms-shebeijiankong",
		path: "/warehouseMap2D"
	},
	{
		key: "basicConfiguration",
		label: "aside.basic.nav",
		icon: "wms-jichupeizhi",
		children: [
			{
				// path: "/locationConfiguration", // 我的状态
				key: "user",
				label: "aside.basic.user.permission",
				children: [
					{
						path: "/menuList",
						key: "menuList",
						label: "aside.basic.user.menuList"
					},
					{
						path: "/permissionList",
						key: "permissionList",
						label: "aside.basic.user.permissionList"
					},
					{
						path: "/roleList",
						key: "roleList",
						label: "aside.basic.user.roleList"
					},
					{
						path: "/userList",
						key: "userList",
						label: "aside.basic.user.userList"
					}
				]
			},
			{
				key: "material",
				label: "aside.basic.material.materialManagement",
				children: [
					{
						path: "/materialType",
						key: "materialType",
						label: "aside.basic.material.materialType"
					},
					{
						path: "/materialForm",
						key: "materialForm",
						label: "aside.basic.material.materialForm"
					},
					{
						path: "/materialSupply",
						key: "materialSupply",
						label: "aside.basic.material.materialSupply"
					},
					{
						path: "/materialPack",
						key: "materialPack",
						label: "aside.basic.material.materialPack"
					},
					{
						path: "/materialInfo",
						key: "materialInfo",
						label: "aside.basic.material.materialInfo"
					},
					{
						path: "/materialFile",
						key: "materialFile",
						label: "aside.basic.material.materialFile"
					}
				]
			},
			{
				key: "composition",
				label: "aside.basic.composition.compositionManagement",
				children: [
					{
						path: "/canvasManagement",
						key: "canvasManagement",
						label: "aside.basic.composition.canvasManagement"
					},
					{
						path: "/canvasInformation",
						key: "canvasInformation",
						label: "aside.basic.composition.canvasInformation"
					},
					{
						path: "/storeManagement",
						key: "storeManagement",
						label: "aside.basic.composition.storeManagement"
					},
					{
						path: "/districtManagement",
						key: "districtManagement",
						label: "aside.basic.composition.districtManagement"
					},
					{
						path: "/roadwayManagement",
						key: "roadwayManagement",
						label: "aside.basic.composition.roadwayManagement"
					},
					{
						path: "/spaceTypeManagement",
						key: "spaceTypeManagement",
						label: "aside.basic.composition.spaceTypeManagement"
					},
					{
						path: "/spaceManagement",
						key: "spaceManagement",
						label: "aside.basic.composition.spaceManagement"
					},
					{
						path: "/workbenchManagement",
						key: "workbenchManagement",
						label: "aside.basic.composition.workbenchManagement"
					},
					{
						path: "/pathManagement",
						key: "pathManagement",
						label: "aside.basic.composition.pathManagement"
					}
				]
			},
			{
				key: "equipment",
				label: "aside.basic.equipmentPage.equipmentManagement",
				children: [
					{
						path: "/equipmentArchives",
						key: "equipmentArchives",
						label: "aside.basic.equipmentPage.equipmentArchives"
					},
					{
						path: "/equipmentType",
						key: "equipmentType",
						label: "aside.basic.equipmentPage.equipmentType"
					}
				]
			},
			{
				key: "container",
				label: "aside.basic.containerPage.containerManagement",
				children: [
					{
						path: "/containerArchives",
						key: "containerArchives",
						label: "aside.basic.containerPage.containerArchives"
					},
					{
						path: "/containerType",
						key: "containerType",
						label: "aside.basic.containerPage.containerType"
					}
				]
			}
		]
	},
	{
		label: "goods.nav",
		key: "goods",
		icon: "wms-shebeijiankong",
		children: [
			{
				path: "/receipt",
				key: "receipt",
				label: "goods.items.receipt.name"
			},
			{
				path: "/receiptType",
				key: "receiptType",
				label: "goods.items.receiptType.name"
			},
			{
				path: "/storageCombine",
				key: "storageCombine",
				label: "goods.items.storageCombine.name"
			}
		]
	},
	{
		label: "inventory.nav",
		key: "inventory",
		icon: "wms-shebeijiankong",
		children: [
			{
				label: "inventory.items.repertoryManagent.name",
				key: "repertoryManagent",
				// icon: "wms-shebeijiankong",
				children: [
					{
						path: "/materialRepertory", // 菜单列表
						key: "materialRepertory",
						label: "inventory.items.materialRepertory.name"
					},
					{
						path: "/containerRepertory", // 菜单列表
						key: "containerRepertory",
						label: "inventory.items.containerRepertory.name"
					}
				]
			},
			{
				path: "/quality", // 菜单列表
				key: "quality",
				label: "inventory.items.quality.name"
			},
			{
				path: "/check", // 菜单列表
				key: "check",
				label: "inventory.items.check.name"
			}
		]
	},
	{
		label: "shopping.nav",
		key: "shopping",
		icon: "wms-shebeijiankong",
		children: [
			{
				path: "/outbound", // 菜单列表
				key: "outbound",
				label: "shopping.items.outbound.name"
			},
			{
				path: "/picking", // 菜单列表
				key: "picking",
				label: "shopping.items.picking.name"
			},
			{
				path: "/invoice", // 菜单列表
				key: "invoice",
				label: "shopping.items.invoice.name"
			},
			{
				path: "/deliveryType", // 菜单列表
				key: "deliveryType",
				label: "shopping.items.deliveryType.name"
			},
			{
				path: "/waveTime", // 菜单列表
				key: "waveTime",
				label: "shopping.items.waveTime.name"
			}
		]
	},
	{
		key: "testMobx",
		label: "testMobx",
		icon: "wms-shebeijiankong",
		path: "/testMobx"
	},
	{
		key: "summary",
		label: "summary.nav",
		icon: "wms-shebeijiankong",
		children: [
			{
				path: "/realtimeInventory", // 菜单列表
				key: "realtimeInventory",
				label: "summary.items.realtimeInventory.name"
			},
			{
				path: "/inventoryJournal", // 菜单列表
				key: "inventoryJournal",
				label: "summary.items.inventoryJournal.name"
			}
		]
	},
	{
		key: "taskInfo",
		label: "taskInfo",
		icon: "wms-shebeijiankong",
		path: "/taskInfo"
	},
	{
		key: "setting",
		label: "setting",
		icon: "wms-shebeijiankong",
		children: [
			{
				key: "dataManager",
				label: "dataManager",
				path: "/dataManager"
			},
			{
				key: "dictinoaryManager",
				label: "dictinoaryManager",
				path: "/dictinoaryManager"
			},
			{
				key: "warehousingStrategy",
				label: "warehousingStrategy",
				path: "/warehousingStrategy"
			}
		]
	},
	{
		key: "customForm",
		label: "customForm",
		icon: "wms-shebeijiankong",
		path: "/customForm"
	}
];
