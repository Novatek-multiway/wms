import { get, post, del, put } from "@/http/request";
class Inventory {
	private apiDict = {
		storage: "/Storage",
		stocktake: "/Stocktake",
		qualityTest: "/QualityTest"
	};
	public postStorageList = (params: any = "") => post(this.apiDict.storage + "/GetPageData", params);
	public GetPageContainerInventory = (params: any = "") => post(this.apiDict.storage + "/GetPageContainerInventory", params);
	public postStocktakeList = (params: any = "") => post(this.apiDict.stocktake + "/GetPageData", params);

	// qualityManagement
	public getQualityTestData = (params: any = "") => post(`${this.apiDict.qualityTest}/GetPageData`, { ...params });
	public delQuality = (params: any = "") => get(`${this.apiDict.qualityTest}/CancelQualityTest?qualityTestCode=${params}`);

	public AllotQualityTest = (params: any = "") => get(`${this.apiDict.qualityTest}/AllotQualityTest?qualityTestCode=${params}`);

	public CompleteQualityTest = (params: any = "") =>
		get(`${this.apiDict.qualityTest}/CompleteQualityTest?qualityTestCode=${params}&qualityTestRemark=''`);
	public ExecuteQualityTest = (params: any = "") =>
		get(`${this.apiDict.qualityTest}/ExecuteQualityTest?qualityTestCode=${params}`);
	public addQuality = (params: any = "") => post(`${this.apiDict.qualityTest}/AddQualityTest`, { ...params });
	public updateQuality = (params: any = "") => post(`${this.apiDict.qualityTest}/UpdateQualityTest`, { ...params });

	//checkManagement
	public CompleteStocktake = (params: { id: number }) => get(`/Stocktake/CompleteStocktake`, params); //完成盘点计划
	public ActiveStocktake = (params: { id: number }) => get(`/Stocktake/ActivateStocktake`, params); //激活盘点计划
	public CancelStocktake = (params: { id: number }) => get(`/Stocktake/CancelStocktake`, params); //取消盘点计划
	public AdjustedStocktake = (params: { id: number }) => get(`/Stocktake/AdjustedStocktake`, params); //调账
	public GetAdjustedStocktake = (params: { id: number }) => get(`/Stocktake/GetAdjustedStocktake`, params); // 盈亏数据

	public GetPageDataStocktake = (params: any) => post(`/Stocktake/GetPageData`, params); //分页查询
	public GetStocktakeDetail = (params: { id: string }) => get(`/Stocktake/GetStocktakeDetail`, params); // 根据盘点计划ID获取盘点计划详情
	public AddStocktake = (params: any) => post(`/Stocktake/AddStocktake`, params); //添加
	
	public AddStocktakeByAll = (params: any) => post(`/Stocktake/AddStocktakeByAll`, params); //添加
	public AddStocktakeByLocation = (params: any) => post(`/Stocktake/AddStocktakeByLocation`, params); //添加
	public AddStocktakeByMaterial = (params: any) => post(`/Stocktake/AddStocktakeByMaterial`, params); //添加
	public AddStocktakeBySampling = (params: any) => post(`/Stocktake/AddStocktakeBySampling`, params); //添加

	public UpdateStocktakeByAll = (params: any) => post(`/Stocktake/UpdateStocktakeByAll`, params); //添加
	public UpdateStocktakeByLocation = (params: any) => post(`/Stocktake/UpdateStocktakeByLocation`, params); //添加
	public UpdateStocktakeByMaterial = (params: any) => post(`/Stocktake/UpdateStocktakeByMaterial`, params); //添加

	public CreateCarryTask = (params: { id: string; targetLocation: string; }) => get(`/Stocktake/CreateCarryTask`, params); //搬运
	public BatchCreateCarryTask = (params: string[]) => post(`/Stocktake/CreateCarryTask`, params); //搬运
	public InStockApply = (params: { fromLocationCode: string; containerCode?: string; }) => get(`/Stocktake/InStockApply`, params); //回库
	public GetStocktakeCode = () => get(`/Stocktake/GetStocktakeCode`);
	public UpdateStocktake = (params: any) => post(`/Stocktake/UpdateStocktake`, params);
	public StocktakeExecute = (params: any) => get(`/Stocktake/ExecuteStocktake`, params); //执行
	public MaterialGetPageData = (params: any) => post("/Material/GetPageData", { ...params }); 	//	物料盘点
	public LocationGetPageData = (params: any = "") => post("/Location/GetPageData", { ...params });	// 货物盘点
	public GetLocationByAreaId = (params: { areaId: string }) => get("/Location/GetAreaLocationList", params);
	public getLocationOptions = () => get(`/Area/GetAreaSelectItemList`); // 货位;
	public EnumStocktakeStatus = () => get(`/Enum/GetSelectItemList`, { enumName: 'EnumStocktakeStatus' }); // 货位;

	public AllocationStocktake = (params: any) => post(`/Stocktake/AllocationStocktake`, params); //分配
	public InvoiceStocktakeAllocation = (params: any) => post(`/Stocktake/InvoiceStocktakeAllocation`, params);
	public OperateStocktake = (params: any) => post(`/Stocktake/OperateStocktake`, params); //激活/分配

	public GetReceiptLineByStocktakeNo = (params: any) => get("/Stocktake/GetReceiptLineByStocktakeNo", { ...params });
	public StocktakeItemOperate = (params: any) => post("/Stocktake/StocktakeItemOperate", { ...params });
	public GetRepertoryData = () => get("/QualityTest/GetMaterialInventorySummary");

	// 修改盘点记录
	public postUpdateStocktakeRecord = params => post("/Stocktake/UpdateStocktakeRecord", params);

	//是否盈亏枚举
	public GetSelectItemList = params => post("/Enum/GetSelectItemList", { ...params });
	public GetstocktakeRecordStatus = () => get("Enum/GetSelectItemList?enumName=EnumStocktakeRecordStatus");

	public getContainerTypeData = (params: any = "") => post(`/ContainerType/GetPageData`, { ...params });
	public AddStocktakeRecordInfo = (params: any = "") => post(`/Stocktake/AddStocktakeRecordInfo`, { ...params });

}

export default new Inventory();
