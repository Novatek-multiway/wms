import zh from "./zh/translation.json";

const zh_CN = {
	header: {
		page_style: "整体风格设置",
		theme_color: "主题色"
	},
	aside: {
		panel: {
			nav: "面板管理",
			analysis_panel: "分析面板"
		},
		list: {
			nav: "列表管理",
			diary_list: "日记列表",
			diary_records: "日记记录",
			user_list: "用户列表"
		},
		personal: {
			nav: "个人中心",
			personal_status: "我的状态"
		},
		equipmentMonitoring: {
			nav: "主页"
		},
		task: {
			nav: "任务管理"
		},
		basic: {
			user: {
				permission: "用户权限",
				menuList: "菜单列表",
				permissionList: "权限列表",
				roleList: "角色列表",
				userList: "用户列表"
			},
			composition: {
				compositionManagement: "布局管理",
				canvasManagement: "画布管理",
				canvasInformation: "画布区域信息",
				storeManagement: "仓库管理",
				districtManagement: "区域管理",
				roadwayManagement: "巷道管理",
				spaceTypeManagement: "货位类型管理",
				spaceManagement: "货位管理",
				workbenchManagement: "工作台管理",
				pathManagement: "路径管理"
			},
			equipmentPage: {
				equipmentManagement: "设备管理",
				equipmentArchives: "设备档案管理",
				equipmentType: "设备类型管理"
			},
			containerPage: {
				containerManagement: "容器管理",
				containerArchives: "容器档案管理",
				containerType: "容器类型管理"
			},
			nav: "基础配置",
			system: "系统配置",
			drive: "驱动配置",
			equipment: "设备配置",
			location: {
				nav: "库位配置",
				list: "库位列表",
				group: "库位分组配置",
				connection: "接驳位配置",
				yoke: "叉臂配置",
				pipe: "信息管道配置"
			},
			material: {
				materialManagement: "物料管理",
				materialType: "物料类型",
				materialForm: "物料型号",
				materialSupply: "客户/供应商",
				materialPack: "物料包装",
				materialInfo: "物料信息",
				materialFile: "物料档案信息"
			}
		},
		signal: {
			nav: "信号配置"
		},
		system: {
			nav: "系统日志",
			err_log: "设备错误信号日志",
			task_log: "任务执行日志"
		},
		warehouseMap: "仓库地图",
		warehouseMap2D: "仓库地图2d"
	},
	login: {
		remember: "记住密码",
		login: "登录",
		username: "请输入用户名",
		password: "请输入密码",
		username_check: "请输入用户名",
		password_check: "请输入密码",
		success: "登录成功！",
		error: "用户名或密码错误！",
		auth_error: "获取用户权限失败"
	},
	inventory: {
		nav: "库内业务",
		items: {
			repertory: {
				name: "库存管理"
			},
			repertoryManagent: {
				name: "库存管理"
			},
			materialRepertory: {
				name: "物料库存"
			},
			containerRepertory: {
				name: "容器库存"
			},
			quality: {
				name: "质检管理"
			},
			check: {
				name: "盘点管理"
			}
		}
	},
	goods: {
		nav: "收货业务",
		items: {
			receipt: {
				name: "收货单管理"
			},
			receiptType: {
				name: "收货类型管理"
			},
			receiptGroup: {
				name: "收货组盘"
			},
			workbenchCombine: {
				name: "工作台组盘"
			},
			storageCombine: {
				name: "组盘入库"
			}
		}
	},
	shopping: {
		nav: "发货业务",
		items: {
			outbound: {
				name: "出库需求"
			},
			picking: {
				name: "拣选出库"
			},
			invoice: {
				name: "发货单管理"
			},
			deliveryType: {
				name: "发货类型管理"
			},
			waveTime: {
				name: "波次单管理"
			}
		}
	},
	testMobx: "测试Mobx",
	taskInfo: "任务信息管理",
	setting: "系统设置",
	dataManager: "数据管理",
	dictinoaryManager: "字典管理",
	warehousingStrategy: "入库策略",
	customForm: "自定义表单",

	home: {
		Home: "首页",
		Title: "WMS仓库管理系统",
		Nav: "主页",
		Current_number_tasks: "当前任务数量",
		Full_pallet_quantity: "满托盘数量",
		Number_empty_pallets: "空托盘数量",
		Number_alarms_today: "今日告警数",
		Today_task_data: "今日任务数据",
		Storage_task: "入库任务",
		Outbound_task: "出库任务",
		Cross_docking_tasks: "越库任务",
		Transfer_task: "移库任务",
		Cancel_task: "取消任务",
		Monthly_chart: "月上下线趋势图",
		Monthly_storage_chart: "月库容趋势图",
		Total_number_storage: "入库总料数",
		Total_number_warehouse: "出库总料数",
		Current_Quality_Data: "当前质量数据",
		Total_Goods: "良品总数",
		Total_defective_products: "不良品总数",
		Total_pending_inspection: "待检总数",
		Today_Workstation_Tasks: "今日工作站任务数",
		Total_storage_capacity: "总库容",
		Number_empty_slots: "空货位数量",
		Number_full_pallets: "满托货位数量",
		Number_empty_cargo_space: "空托货位数量",
		Area: "区域"
	},
	summary: {
		nav: "报表管理",
		items: {
			realtimeInventory: {
				name: "实时库存"
			},
			inventoryJournal: {
				name: "出入库流水"
			}
		}
	},
	...zh
};

export default zh_CN;
