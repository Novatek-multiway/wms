import { get, post, del, put } from "@/http/request";
import header from "@/pages/layout/header";

class Inventory {
	// 发货单管理
	public InvoiceHeaderList = (params: any = "") => post("/InvoiceHeader/GetPageData", params); //	查询
	public ActiveInvoiceHeaderOrder = (params: { id: number }) => get("/InvoiceHeader/Active", params); //	激活
	public CancelInvoiceHeader = (params: { id: number }) => get("/InvoiceHeader/Cancel", params); //	取消
	public ManualFinish = (params: { id: number }) => get("/InvoiceHeader/ManualFinish", params); //	手动完成
	public AddInvoiceHeader = (params: any = "") => post("/InvoiceHeader/Add", params);
	public GetAllocatedList = (params: { lineId: string }) => get("/InvoiceHeader/GetAllocatedList", params); //	根据发货单明细ID查询已分配明细
	public GetInventoryList = (params: { lineId: string }) => get("/InvoiceHeader/GetInventoryList", params); //	根据发货单明细ID查询可分配库存
	public SuggestInventoryList = (params: { lineId: string }) => get("/InvoiceHeader/SuggestInventoryList", params); //	推荐库存
	public AllocationInvoiceHeaderOrder = (params: any = "") => post("/InvoiceHeader/AllocationOrder", params);
	public ConfirmAllocated = (body: any) => post("/InvoiceHeader/ConfirmAllocated", body); //	确认分配
	public CancelAllocated = (body: string[]) => post("/InvoiceHeader/CancelAllocated", body); //	确认分配
	public CreateCarryTask = (params: { allocationId: string; targetLocation: string }) =>
		get("/InvoiceHeader/CreateCarryTask", params); //	搬运
	public BatchCreateCarryTask = (body: string[]) => post("/InvoiceHeader/CreateCarryTask", body); //	批量搬运
	public GetContainerInventory = (params: { invoiceCode: string; locationCode: string }) =>
		get("/InvoiceHeader/GetContainerInventory", params); //	批量搬运
	public OutboundPicking = (body: any[]) => post("/InvoiceHeader/OutboundPicking", body); //	拣选出库
	public InStockApply = (params: { fromLocationCode: string; containerCode?: string }) =>
		get("/InvoiceHeader/InStockApply", params); //	回库

	public AuditInvoiceHeaderOrder = (params: any = "") => post("/InvoiceHeader/AuditOrder", params);
	public DeleteInvoiceHeader = (params: any = "") => del("/InvoiceHeader/Delete", params);
	public DeleteReceiptHeadAndLine = (params: any = "") => del("/InvoiceHeader/DeleteReceiptHeadAndLine", {}, {}, params);
	public GetOutboundDetails = (params: any = "") => get("/InvoiceHeader/GetOutboundDetails", params);
	public GetInvoiceHeaderPageDataForWave = (params: any = "") => post("/InvoiceHeader/GetPageDataForWave", params);
	public InvoiceOrderExecute = (params: any = "") => post("/InvoiceHeader/InvoiceOrderExecute", params);
	public UpdateInvoiceHeader = (params: any = "") => post("/InvoiceHeader/Update", params);
	public OrderComplete = (params: any = "") => get("/InvoiceHeader/OrderComplete", params);

	public DeleteOrderAndLine = (params: any = "") => del(`InvoiceHeader/DeleteOrderAndLine?invoiceCode=${params.invoiceCode}`);
	public getInvoiceStatusList = () => get("/Enum/GetSelectItemList?enumName=EnumInvoiceStatus");
	public getEnumQualityStatus = () => get("/Enum/GetSelectItemList?enumName=EnumQualityStatus");

	public ReceiptTypeDel = (params: any = "") => del(`/InvoiceHeader/Delete`, params);
	public ReceiptTypeAdd = (params: any) => post(`/ReceiptType/Add`, params);
	public ReceiptTypeEdit = (params: any) => post(`/ReceiptType/Update`, params);
	// 波次单管理
	public ActiveOrder = (params: any) => post(`/WaveHeader/ActiveOrder`, params); //激活
	public AllocationOrder = (params: any) => post(`/WaveHeader/AllocationOrder`, params); //分配
	public AddWaveHeader = (params: any) => post(`/WaveHeader/Add`, params); //添加波次单据
	public DelWaveHeader = (data: any) => del(`/WaveHeader/Delete`, {}, {}, data); //删除波次单
	public GetPageDataWaveHeader = (params: any) => post(`/WaveHeader/GetPageData`, params); //分页查询波次单
	public InvoiceOrderAllocation = (params: any) => post(`/WaveHeader/InvoiceOrderAllocation`, params); //波次单分配
	public UpdateWaveHeader = (params: any) => post(`/WaveHeader/Update`, params); //更新波次单头信息
	public OperateOrder = (params: any) => post(`/WaveHeader/OperateOrder`, params); //激活/分配
	public WaveOrderExecute = (params: any) => post(`/WaveHeader/WaveOrderExecute`, params); //整单执行
	public GetReceiptLineByOrderNo = (params: any) => get("/WaveLine/GetReceiptLineByOrderNo", { ...params });
	public WaveOrderItemOperate = (params: any) => post("/WaveLine/WaveOrderItemOperate", { ...params });
	public GetPageDataForWave = (params: any) => post("/InvoiceHeader/GetPageDataForWave", { ...params });
	public WaveOrderItemManualAllot = (params: any) => post("/WaveLine/WaveOrderItemManualAllot", params);

	// 发货类型管理
	public AddInvoiceType = (params: any) => post("/InvoiceType/Add", params);
	public DeleteInvoiceType = (params: any) => post("/InvoiceType/Delete", params);
	public GetPageDataInvoiceType = () => get("/InvoiceHeader/GetInvoiceTypeList");
	public UpdateInvoiceType = (params: any) => post("/InvoiceType/Update", params);

	//出库需求
	public GetOutboundRequirementData = (params: any) => post("/OutboundRequirement/GetPageData", params);
	public AddOutboundRequirement = (params: any) => post("/OutboundRequirement/Add", params);
	public DelOutboundRequirement = (params: any) => get(`/OutboundRequirement/OutboundCancel?requirementId=${params}`);
	public AutomaticAllocationInQuene = (params: any) => get("/OutboundRequirement/AutomaticAllocationInQuene", { ...params });
	public GetAllocationItemList = (params: any) => get("/OutboundRequirement/GetAllocationItemList", { ...params });
	public GetWaitAllocationItemList = (params: any) => get("/OutboundRequirement/GetWaitAllocationItemList", { ...params });
	public ManualAllocation = (params: any) => post("/OutboundRequirement/ManualAllocation", params);
	public OutboundConfirm = (params: any) => get("/OutboundRequirement/OutboundConfirm", { ...params });
	public OutboundExecute = (params: any) => get("/OutboundRequirement/OutboundExecute", { ...params });

	public GetLocationByAreaId = (params: { areaId: string }) => get("/Location/GetAreaLocationList", params);

	public getContacts = (params: any = "") => post(`/Contacts/GetPageData`, { ...params });
}

export default new Inventory();
