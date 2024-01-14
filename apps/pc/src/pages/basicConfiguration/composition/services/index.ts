import { get, post, del, put } from "@/http/request";
class Composition {
	private apiDict = {
		canvas: "/Canvas",
		canvasArea: "/CanvasArea",
		tunnel: "/Tunnel",
		warehouse: "/Warehouse",
		area: "/Area",
		locationType: "/LocationType",
		location: "/Location",
		workbench: "/Workbench",
		containerType: "/ContainerType",
		routing: "/Routing",
		combine: "/Combine"
	};
	// page -- canvasManagement
	public getCanvasData = (params: any = "") => post(`${this.apiDict.canvas}/GetPageData`, { ...params });
	public delCanvas = (params: any = "") => del(`${this.apiDict.canvas}/Delete?id=${params}`);
	public addCanvas = (params: any = "") => post(`${this.apiDict.canvas}/Add`, { ...params });
	public updateCanvas = (params: any = "") => post(`${this.apiDict.canvas}/Update`, { ...params });

	// page -- canvasInformation
	public getCanvasArea = (params: any = "") => post(`${this.apiDict.canvasArea}/GetPageData`, { ...params });
	public delCanvasArea = (params: any = "") => del(`${this.apiDict.canvasArea}/Delete?id=${params}`);
	public addCanvasArea = (params: any = "") => post(`${this.apiDict.canvasArea}/Add`, { ...params });
	public updateCanvasArea = (params: any = "") => post(`${this.apiDict.canvasArea}/Update`, { ...params });

	//page -- storeManagement
	public getWarehouseList = (params: any = "") => post(`${this.apiDict.warehouse}/GetPageData`, { ...params });
	public delWarehouse = (params: any = "") => del(`${this.apiDict.warehouse}/Delete?id=${params}`);
	public addWarehouse = (params: any = "") => post(`${this.apiDict.warehouse}/Add`, { ...params });
	public updateWarehouse = (params: any = "") => put(`${this.apiDict.warehouse}/Update`, { ...params });

	//page -- districtManagement
	public getAreaList = (params: any = "") => post(`${this.apiDict.area}/GetPageData`, { ...params });
	public getAreaSelectItemList = (params: any = "") => get(`${this.apiDict.area}/GetAreaSelectItemList`, { ...params });
	public delArea = (params: any = "") => del(`${this.apiDict.area}/Delete?id=${params}`);
	public addArea = (params: any = "") => post(`${this.apiDict.area}/Add`, { ...params });
	public updateArea = (params: any = "") => put(`${this.apiDict.area}/Update`, { ...params });
	public getAreaOption = () => get(`/Area/GetAreaSelectItemList?areaType=2`); // 工位;

	// page -- roadwayManagement
	public getTunnelData = (params: any = "") => post(`${this.apiDict.tunnel}/GetPageData`, { ...params }); // 获取巷道分页信息
	public delTunnel = (params: any = "") => del(`${this.apiDict.tunnel}/Delete?id=${params}`);
	public addTunnel = (params: any = "") => post(`${this.apiDict.tunnel}/Add`, { ...params });
	public updateTunnel = (params: any = "") => put(`${this.apiDict.tunnel}/Update`, { ...params });

	//page -- spaceTypeManagement -- 货位类型
	public getLocationTypeData = (params: any = "") => post(`${this.apiDict.locationType}/GetPageData`, { ...params });
	public delLocationType = (params: any = "") => post(`${this.apiDict.locationType}/Delete`, [...params]);
	public addLocationType = (params: any = "") => post(`${this.apiDict.locationType}/Add`, { ...params });
	public updateLocationType = (params: any = "") => post(`${this.apiDict.locationType}/Update`, { ...params });

	//page -- location -- 货位
	public getLocationData = (params: any = "") => post(`${this.apiDict.location}/GetPageData`, { ...params });
	public delLocation = (params: any = "") => post(`${this.apiDict.location}/DeleteByIds`, [...params]);
	public addLocation = (params: any = "") => post(`${this.apiDict.location}/Add`, { ...params });
	public updateLocation = (params: any = "") => post(`${this.apiDict.location}/Update`, { ...params });

	public GetStocktakeLocationList = (params: any = "") => post("Stocktake/GetStocktakeLocationList", { ...params });
	//page -- Workbench
	public getWorkbenchData = (params: any = "") => post(`${this.apiDict.workbench}/GetPageData`, { ...params });
	public delWorkbench = (params: any = "") => del(`${this.apiDict.workbench}/Delete?id=${params}`);
	public addWorkbench = (params: any = "") => post(`${this.apiDict.workbench}/Add`, { ...params });
	public updateWorkbench = (params: any = "") => put(`${this.apiDict.workbench}/Update`, { ...params });

	// - ContainerType -- 容器类型管理
	public getContainerTypeData = (params: any = "") => post(`${this.apiDict.containerType}/GetPageData`, { ...params });
	public delContainerType = (params: any = "") => del(`${this.apiDict.containerType}/Delete?id=${params}`);
	public addContainerType = (params: any = "") => post(`${this.apiDict.containerType}/Add`, { ...params });
	public updateContainerType = (params: any = "") => put(`${this.apiDict.containerType}/Update`, { ...params });

	// - pathManagement
	public getRoutingData = (params: any = "") => post(`${this.apiDict.routing}/GetPageData`, { ...params });
	public delRouting = (params: any = "") => del(`${this.apiDict.routing}/Delete?id=${params}`);
	public addRouting = (params: any = "") => post(`${this.apiDict.routing}/Add`, { ...params });
	public updateRouting = (params: any = "") => put(`${this.apiDict.routing}/Update`, { ...params });

	public inStockApply = (params: any) => get(`${this.apiDict.combine}/InStockApply`, params); //入库申请
	public submitApply = (params: any) => post(`${this.apiDict.combine}/CombineOnWorkbenchByReceipt`, params); //入库提交

	public getCanvasTypeList = () => get("/Enum/GetSelectItemList?enumName=EnumCanvasType");
	public getCanvasAreaTypeOptions = () => get("/Enum/GetSelectItemList?enumName=EnumCanvasAreaType");
	public getLocationStatusOptions = () => get("/Enum/GetSelectItemList?enumName=EnumLocationStatus");
	public getLocationOptions = () => get(`/Area/GetAreaSelectItemList`); // 货位;
	public getPositionTypeList = () => get(`/Enum/GetSelectItemList?enumName=EnumPositionType`);
	public getInboundTypeList = () => get(`/Enum/GetSelectItemList?enumName=EnumInboundType`);
}

export default new Composition();
