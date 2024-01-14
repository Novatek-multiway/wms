import kr from "./kr/translation.json";

const ko_KR = {
	header: {
		page_style: "전체 풍격 설정",
		theme_color: "주제색"
	},
	aside: {
		panel: {
			nav: "면판 관리",
			analysis_panel: "분석 면판"
		},
		list: {
			nav: "목록 관리",
			diary_list: "일지 목록",
			diary_records: "일지 기록",
			user_list: "사용자 목록"
		},
		personal: {
			nav: "개인 센터",
			personal_status: "나의 상태"
		},
		equipmentMonitoring: {
			nav: "홈 "
		},
		task: {
			nav: "임무 관리"
		},
		basic: {
			user: {
				permission: "사용자 권한",
				menuList: "메뉴 목록",
				permissionList: "권한 목록",
				roleList: "역할 목록",
				userList: "사용자 목록"
			},
			composition: {
				compositionManagement: "배치 관리",
				canvasManagement: "캔버스 관리",
				canvasInformation: "캔버스 영역 정보",
				storeManagement: "창고 관리",
				districtManagement: "구역 관리",
				roadwayManagement: "채널 관리",
				spaceTypeManagement: "화물 위치 유형 관리",
				spaceManagement: "화물 위치 관리",
				workbenchManagement: "작업대 관리",
				pathManagement: "채널 관리"
			},
			equipmentPage: {
				equipmentManagement: "설비 관리",
				equipmentArchives: "설비 파일 관리",
				equipmentType: "설비 유형 관리"
			},
			containerPage: {
				containerManagement: "용기 관리",
				containerArchives: "용기 파일 관리",
				containerType: "용기 유형 관리"
			},
			nav: "기초 구성",
			system: "시스템 구성",
			drive: "구동 구성",
			equipment: "설비 구성",
			location: {
				nav: "창고 위치 구성",
				list: "창고 위치 목록",
				group: "창고 위치 그룹 구성",
				connection: "접속 위치 구성",
				yoke: "포크 암 구성",
				pipe: "정보 채널 구성"
			},
			material: {
				materialManagement: "물료 관리",
				materialType: "물료 유형",
				materialForm: "물료 모델",
				materialSupply: "고객/공급자",
				materialPack: "물료 포장",
				materialInfo: "물료 정보",
				materialFile: "물료 파일 정보"
			}
		},
		signal: {
			nav: "신호 구성"
		},
		system: {
			nav: "시스템 일지",
			err_log: "설비 오류 신호 일지",
			task_log: "임무 실행 일지"
		},
		warehouseMap: "창고 지도",
		warehouseMap2D: "창고 지도 2d"
	},
	login: {
		remember: "비밀번호 기억",
		login: "로그인",
		username: "아이디 입력하기",
		password: "비밀번호입력하기",
		username_check: "아이디 입력하기",
		password_check: "비밀번호입력하기",
		success: "로그인 성공!",
		error: "아이디, 비밀번호 오류!",
		auth_error: "사용자 권한 취득 실패"
	},
	inventory: {
		nav: "창고내 업무",
		items: {
			repertory: {
				name: "재고 관리"
			},
			repertoryManagent: {
				name: "재고 관리"
			},
			materialRepertory: {
				name: "물료 재고"
			},
			containerRepertory: {
				name: "용기 재고"
			},
			quality: {
				name: "품질 검사 관리"
			},
			check: {
				name: "재고조사 관리"
			}
		}
	},
	goods: {
		nav: "수취 업무",
		items: {
			receipt: {
				name: "수취서 관리"
			},
			receiptType: {
				name: "수취 유형 관리"
			},
			receiptGroup: {
				name: "수취 조합"
			},
			workbenchCombine: {
				name: "작업대 조합"
			},
			storageCombine: {
				name: "조합 입고"
			}
		}
	},
	shopping: {
		nav: "출하 업무",
		items: {
			outbound: {
				name: "출고 수요"
			},
			picking: {
				name: "선별 출고"
			},
			invoice: {
				name: "출하서 관리"
			},
			deliveryType: {
				name: "출하 유형 관리"
			},
			waveTime: {
				name: "웨이브 오더 관리"
			}
		}
	},
	testMobx: "테스트 Mobx",
	taskInfo: "임무 정보 관리",
	setting: "시스템 설정",
	dataManager: "데이터 관리",
	dictinoaryManager: "사전 관리",
	warehousingStrategy: "창고 전략",
	customForm: "사용자 정의 양식",
	home: {
		Home: "홈",
		Nav: "홈 ",
		Title: "WMS 창고 관리 시스템",
		Current_number_tasks: "현재 임무 수",
		Full_pallet_quantity: "충만 팔레트 수",
		Number_empty_pallets: "공백 팔레트 수",
		Number_alarms_today: "오늘 경보 수",
		Today_task_data: "오늘 임무 데이터",
		Storage_task: "입고 임무",
		Outbound_task: "출고 임무",
		Cross_docking_tasks: "무 창고 임무",
		Transfer_task: "창고 이동 임무",
		Cancel_task: "임무 취소",
		Monthly_chart: "월간 상하선 추세도",
		Monthly_storage_chart: "월간 재고량 추이도",
		Total_number_storage: "입고 총 물료수",
		Total_number_warehouse: "출고 총원료수",
		Current_Quality_Data: "현재 품질 데이터",
		Total_Goods: "양품 총수",
		Total_defective_products: "불량품 총수",
		Total_pending_inspection: "검사 대기 총수",
		Today_Workstation_Tasks: "오늘 작업센터 임무 수",
		Total_storage_capacity: "총 저장 용량",
		Number_empty_slots: "공백 화물 위치 수",
		Number_full_pallets: "충만 화물 위치 수",
		Number_empty_cargo_space: "공백 화물 위치 수",
		Area: "구역"
	},
	summary: {
		nav: "제표 관리",
		items: {
			realtimeInventory: {
				name: "실시간 재고"
			},
			inventoryJournal: {
				name: "입출고 흐름"
			}
		}
	},
	...kr
};

export default ko_KR;
