import jp from "./jp/translation.json";

const ja_JP = {
	header: {
		page_style: "全体的なスタイル設定",
		theme_color: "テーマーカラー"
	},
	aside: {
		panel: {
			nav: "パネル管理",
			analysis_panel: "分析パネル"
		},
		list: {
			nav: "リスト管理",
			diary_list: "ログリスト",
			diary_records: "ログ記録",
			user_list: "ユーザーリスト"
		},
		personal: {
			nav: "個人センター",
			personal_status: "マイステータス"
		},
		equipmentMonitoring: {
			nav: "ホームページ"
		},
		task: {
			nav: "タスク管理"
		},
		basic: {
			user: {
				permission: "ユーザー権限",
				menuList: "メニューリスト",
				permissionList: "権限リスト",
				roleList: "ロールリスト",
				userList: "ユーザーリスト"
			},
			composition: {
				compositionManagement: "レイアウト管理",
				canvasManagement: "カンバス管理",
				canvasInformation: "カンバス領域情報",
				storeManagement: "倉庫管理",
				districtManagement: "区域管理",
				roadwayManagement: "通路管理",
				spaceTypeManagement: "ラックタイプ管理",
				spaceManagement: "ラック管理",
				workbenchManagement: "作業台管理",
				pathManagement: "ルート管理"
			},
			equipmentPage: {
				equipmentManagement: "デバイス管理",
				equipmentArchives: "デバイス履歴管理",
				equipmentType: "デバイスタイプ管理"
			},
			containerPage: {
				containerManagement: "コンテナ管理",
				containerArchives: "コンテナ履歴管理",
				containerType: "コンテナタイプ管理"
			},
			nav: "一般設定",
			system: "システム設定",
			drive: "駆動設定",
			equipment: "デバイス設定",
			location: {
				nav: "ロケーション設定",
				list: "ロケーションリスト",
				group: "ロケーショングループ別設定",
				connection: "接続位置設定",
				yoke: "フォクアーム設定",
				pipe: "情報チャンネル設定"
			},
			material: {
				materialManagement: "製品管理",
				materialType: "製品タイプ",
				materialForm: "製品型番",
				materialSupply: "顧客/サプライヤー",
				materialPack: "製品梱包",
				materialInfo: "製品情報",
				materialFile: "製品履歴情報"
			}
		},
		signal: {
			nav: "信号設定"
		},
		system: {
			nav: "システムログ",
			err_log: "デバイスエラー情報ログ",
			task_log: "タスク実行ログ"
		},
		warehouseMap: "倉庫マップ",
		warehouseMap2D: "倉庫マップ2d"
	},
	login: {
		remember: "パスワードを覚える",
		login: "ログイン",
		username: "ユーザ名を入力してください",
		password: "パスワードを入力してください",
		username_check: "ユーザ名を入力してください",
		password_check: "パスワードを入力してください",
		success: "ログインしました！",
		error: "ユーザー名又はパスワードエラー！",
		auth_error: "ユーザー権限取得失敗"
	},
	inventory: {
		nav: "倉庫作業",
		items: {
			repertory: {
				name: "倉庫管理"
			},
			repertoryManagent: {
				name: "倉庫管理"
			},
			materialRepertory: {
				name: "製品在庫"
			},
			containerRepertory: {
				name: "コンテナ在庫"
			},
			quality: {
				name: "品質管理"
			},
			check: {
				name: "在庫管理"
			}
		}
	},
	goods: {
		nav: "入荷作業",
		items: {
			receipt: {
				name: "入荷単管理"
			},
			receiptType: {
				name: "入荷タイプ管理"
			},
			receiptGroup: {
				name: "入荷・パレット混載"
			},
			workbenchCombine: {
				name: "作業台パレット混載"
			},
			storageCombine: {
				name: "パレット混載入庫"
			}
		}
	},
	shopping: {
		nav: "出荷業務",
		items: {
			outbound: {
				name: "出庫需要"
			},
			picking: {
				name: "仕分け・出庫"
			},
			invoice: {
				name: "出荷単管理"
			},
			deliveryType: {
				name: "出荷タイプ管理"
			},
			waveTime: {
				name: "ウェーブ単管理"
			}
		}
	},
	testMobx: "試験Mobx",
	taskInfo: "タスク情報管理",
	setting: "システム設定",
	dataManager: "データ管理",
	dictinoaryManager: "字典管理",
	warehousingStrategy: "入庫戦略",
	customForm: "カスタマイズフォーム",
	home: {
		Title: "WMS倉庫管理システム",
		Home: "ホームページ",
		Nav: "ホームページ",
		Current_number_tasks: "現在のタスク数",
		Full_pallet_quantity: "満杯パレット数",
		Number_empty_pallets: "空いたパレット数",
		Number_alarms_today: "今日アラーム数",
		Today_task_data: "今日タスクデータ",
		Storage_task: "入庫タスク",
		Outbound_task: "出庫タスク",
		Cross_docking_tasks: "クロスドッキングタスク",
		Transfer_task: "移転タスク",
		Cancel_task: "タスクキャンセル",
		Monthly_chart: "月次オン・オフライン傾向図",
		Monthly_storage_chart: "月次倉庫容量傾向図",
		Total_number_storage: "総入庫数",
		Total_number_warehouse: "総出庫数",
		Current_Quality_Data: "現在の品質データ",
		Total_Goods: "合格品総数",
		Total_defective_products: "不合格品総数",
		Total_pending_inspection: "未検査品総数",
		Today_Workstation_Tasks: "今日ステーションタスク数",
		Total_storage_capacity: "倉庫総容量",
		Number_empty_slots: "空いラック数",
		Number_full_pallets: "パレット満杯ラック数",
		Number_empty_cargo_space: "空きパレットラック数",
		Area: "区域"
	},
	summary: {
		nav: "レポート管理",
		items: {
			realtimeInventory: {
				name: "リアルタイム在庫"
			},
			inventoryJournal: {
				name: "入出庫記録"
			}
		}
	},
	...jp
};

export default ja_JP;
