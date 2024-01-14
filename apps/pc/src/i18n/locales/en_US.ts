import en from "./en/translation.json";

const en_US = {
	summary: {
		nav: "Summary",
		items: {
			realtimeInventory: {
				name: "Realtime Inventory"
			},
			inventoryJournal: {
				name: "Inventory Journal"
			}
		}
	},
	header: {
		page_style: "Page style setting",
		theme_color: "Theme Color"
	},
	aside: {
		panel: {
			nav: "Panel Manage",
			analysis_panel: "Analysis Panel"
		},
		list: {
			nav: "List Manage",
			diary_list: "Diary List",
			diary_records: "Diary Records",
			user_list: "User List"
		},
		personal: {
			nav: "Personal Center",
			personal_status: "My Moment"
		},
		equipmentMonitoring: {
			nav: "Home Page"
		},
		task: {
			nav: "TaskManagement"
		},
		basic: {
			user: {
				permission: "User Authority",
				menuList: "Menu",
				permissionList: "Permission List",
				roleList: "Role List",
				userList: "User List"
			},
			composition: {
				compositionManagement: "Layout Management",
				canvasManagement: "Canvas Management",
				canvasInformation: "Canvas Information",
				storeManagement: "Warehouse Management",
				districtManagement: "Area Management",
				roadwayManagement: "Aisle Management",
				spaceTypeManagement: "Location Type Management",
				spaceManagement: "Location Management",
				workbenchManagement: "Workstation Management",
				pathManagement: "Path Management"
			},
			equipmentPage: {
				equipmentManagement: "Equipment Management",
				equipmentArchives: "Equipment Archives",
				equipmentType: "Equipment Type"
			},
			containerPage: {
				containerManagement: "Container Management",
				containerArchives: "Container Archives",
				containerType: "Container Type"
			},
			nav: "Basic Configuration",
			system: "System Configuration",
			drive: "Drive Configuration",
			equipment: "Device Layout",
			location: {
				nav: "Location Configuration",
				list: "Location List",
				group: "Location Group Configuration",
				connection: "Connection to a configuration",
				yoke: "The fork arm configuration",
				pipe: "Information channel configuration"
			},
			material: {
				materialManagement: "Material Management",
				materialType: "Material Type",
				materialForm: "Material Model",
				materialSupply: "Client/Supplier",
				materialPack: "Material packaging",
				materialInfo: "Materials Information",
				materialFile: "Material File Information"
			}
		},
		signal: {
			nav: "Signal Configuration"
		},
		system: {
			nav: "System Journal",
			err_log: "Equipment log error signal",
			task_log: "Task Log"
		},
		warehouseMap: "Warehouse Map",
		warehouseMap2D: "warehouse map2D"
	},
	login: {
		remember: "Remember me",
		login: "Sign In",
		username: "Please input your username",
		password: "Please input your Password",
		username_check: "Please input your Username!",
		password_check: "Please input your Password!",
		success: "Login Success!",
		error: "The username or password is incorrect！",
		auth_error: "Failed to obtain user rights. Procedure！",
		system: "WMS intelligent warehouse management system"
	},
	inventory: {
		nav: "Warehouse Management",
		items: {
			repertory: {
				name: "Inventory Management"
			},
			quality: {
				name: "Quality Control"
			},
			check: {
				name: "Stock-taking"
			},
			repertoryManagent: {
				name: "Repertory Managent"
			},
			materialRepertory: {
				name: "Material Repertory"
			},
			containerRepertory: {
				name: "Container Repertory"
			}
		}
	},
	goods: {
		nav: "Receiving Management",
		items: {
			receipt: {
				name: "Receipt Management"
			},
			receiptType: {
				name: "Receiving Type Management"
			},
			receiptGroup: {
				name: "Receiving Pallet Assembly"
			},
			workbenchCombine: {
				name: "Workstation Palletization"
			},
			storageCombine: {
				name: "Workstation Palletization"
			}
		}
	},
	shopping: {
		nav: "Shipping Management",
		items: {
			outbound: {
				name: "Outbound Demand"
			},
			picking: {
				name: "Sorting Shipment"
			},
			invoice: {
				name: "Shipment Order Management"
			},
			deliveryType: {
				name: "Shipment Type Management"
			},
			waveTime: {
				name: "Wave Order Management"
			}
		}
	},
	taskInfo: "Task Information",
	setting: "Settings",
	dataManager: "Data Management",
	dictinoaryManager: "Dictinoary Management",
	warehousingStrategy: "Warehousing Strategy",
	home: {
		Home: "Home",
		Title: "WMS intelligent warehouse management system",
		Nav: "Home Page",
		Current_number_tasks: "Current number tasks",
		Full_pallet_quantity: "Full pallet quantity",
		Number_empty_pallets: "Number empty pallets",
		Number_alarms_today: "Number alarms today",
		Today_task_data: "Today task data",
		Storage_task: "Stock-in task",
		Outbound_task: "Stock-out task",
		Cross_docking_tasks: "Cross docking tasks",
		Transfer_task: "Transfer task",
		Cancel_task: "Cancel task",
		Monthly_chart: "Monthly operation chart",
		Monthly_storage_chart: "Monthly storage chart",
		Total_number_storage: "Total stock-in quantity",
		Total_number_warehouse: "Total stock-out quantity",
		Current_Quality_Data: "Current Quality Data",
		Total_Goods: "Good products quantity",
		Total_defective_products: "Defective products quantity",
		Total_pending_inspection: "Quantity of items for inspection",
		Today_Workstation_Tasks: "Today Workstation Tasks",
		Total_storage_capacity: "Total storage capacity",
		Number_empty_slots: "Empty slots",
		Number_full_pallets: "Full pallets",
		Number_empty_cargo_space: "Empty pallets",
		Area: "Area"
	},
	...en
};

export default en_US;
