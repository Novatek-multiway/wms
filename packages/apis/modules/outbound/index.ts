import { get, post } from '../../request';
import type { API } from '../typings';

/** 分页查询发货单-已发 POST /pad/Outbound/GetFinishPageData */
export async function postPadOutboundGetFinishPageData(
  body: API.QueryInvoiceLineInfoPageingParameter
) {
  return post<API.PadInvoiceLineDTOPageResult>('/pad/Outbound/GetFinishPageData', body);
}

/** 分页查询发货单-待发 POST /pad/Outbound/GetUnfinishPageData */
export async function postPadOutboundGetUnfinishPageData(
  body: API.QueryInvoiceLineInfoPageingParameter
) {
  return post<API.PadInvoiceLineDTOPageResult>('/pad/Outbound/GetUnfinishPageData', body);
}

/** 根据发货单明细ID查询已分配明细 GET /pad/Outbound/GetAllocatedList */
export async function getPadOutboundGetAllocatedList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadOutboundGetAllocatedListParams
) {
  return get<API.OutputAllocationItemInfoDTO[]>('/pad/Outbound/GetAllocatedList', params);
}

/** 获取库位库存数据 GET /pad/Outbound/GetContainerInventory */
export async function getPadOutboundGetContainerInventory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadOutboundGetContainerInventoryParams
) {
  return get<API.PickingContanierInventoryDTO[]>('/pad/Outbound/GetContainerInventory', params);
}

/** 根据发货单明细ID查询可分配库存 GET /pad/Outbound/GetInventoryList */
export async function getPadOutboundGetInventoryList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadOutboundGetInventoryListParams
) {
  return get<API.OutputInventoryInfoDTO[]>('/pad/Outbound/GetInventoryList', params);
}

/** 取消分配 POST /pad/Outbound/CancelAllocated */
export async function postPadOutboundCancelAllocated(body: number[]) {
  return post<boolean>('/pad/Outbound/CancelAllocated', body);
}

/** 确认分配 POST /pad/Outbound/ConfirmAllocated */
export async function postPadOutboundConfirmAllocated(body: API.InvoiceAllocatedDTO[]) {
  return post<boolean>('/pad/Outbound/ConfirmAllocated', body);
}

/** 推荐库存 GET /pad/Outbound/SuggestInventoryList */
export async function getPadOutboundSuggestInventoryList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadOutboundSuggestInventoryListParams
) {
  return get<API.AllocateInventoryDTO[]>('/pad/Outbound/SuggestInventoryList', params);
}

/** 搬运 GET /pad/Outbound/CreateCarryTask */
export async function getPadOutboundCreateCarryTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadOutboundCreateCarryTaskParams
) {
  return get<boolean>('/pad/Outbound/CreateCarryTask', params);
}

/** 批量搬运 POST /pad/Outbound/CreateCarryTask */
export async function postPadOutboundCreateCarryTask(body: number[]) {
  return post<string>('/pad/Outbound/CreateCarryTask', body);
}

/** 回库申请（工位满盘申请入库、工位空盘申请入库） GET /pad/Outbound/InStockApply */
export async function getPadOutboundInStockApply(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadOutboundInStockApplyParams
) {
  return get<boolean>('/pad/Outbound/InStockApply', params);
}

/** 拣选出库 POST /pad/Outbound/OutboundPicking */
export async function postPadOutboundOutboundPicking(body: API.PickingContanierInventoryDTO[]) {
  return post<boolean>('/pad/Outbound/OutboundPicking', body);
}
