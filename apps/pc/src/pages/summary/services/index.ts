import { get, post, del, put } from "@/http/request";
class Inventory {
	public GetPageMaterialInventory = (params: any) => post(`/Summary/GetPageMaterialInventory`, params);
	public GetPageInventoryJournal = (params: any) => post(`/Summary/GetPageInventoryJournal`, params); 
	public getContainerTypeData = (params: any = "") => post(`/ContainerType/GetPageData`, { ...params });
}

export default new Inventory();
