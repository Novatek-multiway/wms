import { get, post, del, put } from "@/http/request";
class Inventory {
	private apiDict = {
		receiptHeader: "/ReceiptHeader",
		stocktake: "/Stocktake",
		receiptLine: "/ReceiptLine",
		contacts: "/Contacts"
	};
	public postReceiptHeaderList = (params: any = "") =>
		post(this.apiDict.receiptHeader + "/GetPageData", params, {
			headers: { "Content-Type": "application/json" }
		}); // 获取收货单管理
	public ReceiptHeaderAdd = (params: any) => post(this.apiDict.receiptHeader + "/Add", params);
	public ReceiptHeaderUpdate = (params: any) => post(this.apiDict.receiptHeader + "/Update", params);
	public ReceiptHeaderActive = (params: { id: number }) => get(this.apiDict.receiptHeader + "/Active", params);
	public ReceiptHeaderCancel = (params: { id: number }) => get(this.apiDict.receiptHeader + "/Cancel", params);
	public ReceiptHeaderManualFinish = (params: { id: number }) => get(this.apiDict.receiptHeader + "/ManualFinish", params);

	public postStocktakeList = (params: any = "") => post(this.apiDict.stocktake + "/GetPageData", params);
	public postreceiptLineList = (params: any = "") => {
		return post(this.apiDict.receiptLine + "/GetReceiptLineByOrderNo", params);
	};
	public update = (params: any = "") => {
		return post(this.apiDict.receiptLine + "/Update", params);
	};

	// 收货类型管理
	public ReceiptTypeList = () => get("/ReceiptHeader/GetRecciptTypeList");
	public ReceiptTypeDel = (data: any = "") => del("/ReceiptHeader/Delete", {}, {}, [data]);
	public ReceiptTypeAdd = (params: any) => post(`/ReceiptType/Add`, params);
	public ReceiptTypeEdit = (params: any) => post(`/ReceiptType/Update`, params);

	public InStockApply = (params: any) => get(`/Combine/InStockApply?fromLocationCode=${params}`);

	public storageCombine = (body: any) => post(`/Storage/Combine`, body);

	// 收货单管理
	// ReceiptHeaderUpdate

	//客户/供应商 管理
	public getContacts = (params: any = "") => post(`${this.apiDict.contacts}/GetPageData`, { ...params });

	public GetSysReceivingTypeSetting = (params: any = "") => get("/SysConfig/GetSysReceivingTypeSetting", { ...params });
	public getCombineOption = () => get("/Enum/GetSelectItemList?enumName=EnumCombineOption");
	public getEnumReceiptStatus = () => get("/Enum/GetSelectItemList?enumName=EnumReceiptStatus");
}

export default new Inventory();
