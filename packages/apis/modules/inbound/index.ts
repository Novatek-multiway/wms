import { get, post } from '../../request';
import type { API } from '../typings';

/** 分页查询收货单-已收 POST /pad/Inbound/GetFinishPageData */
export async function postPadInboundGetFinishPageData(
  body: API.QueryReceiptLineInfoPageingParameter
) {
  return post<API.PadReceiptLineInfoDTOPageResult>('/pad/Inbound/GetFinishPageData', body);
}

/** 分页查询收货单-待收 POST /pad/Inbound/GetUnfinishPageData */
export async function postPadInboundGetUnfinishPageData(
  body: API.QueryReceiptLineInfoPageingParameter
) {
  return post<API.PadReceiptLineInfoDTOPageResult>('/pad/Inbound/GetUnfinishPageData', body);
}

export async function postPadInboundCombine(body: API.ReceiptCombineInfoDTO) {
  return post<boolean>('/pad/Inbound/Combine', body);
}

/** 绑盘 POST /pad/Inbound/Binding */
export async function postPadInboundBinding(body: API.PadCombineInfoDTO) {
  return post<boolean>('/pad/Index/Binding', body);
}

/** 解绑 POST /pad/Inbound/Unbinding */
export async function postPadInboundUnbinding(body: API.PadUnbindingDTO) {
  return post<boolean>('/pad/Index/Unbinding', body);
}

/** 更新货位空满状态为空：解盘 POST /pad/Index/SetLocationEmpty */
export async function postPadSetLocationEmpty(body: API.PadSetLocationEmptyDTO) {
  return get<boolean>('/pad/Index/SetLocationEmpty', body);
}

/** 获取指定位置上的容器库存 GET /pad/Inbound/GetInventory */
export async function getPadInboundGetInventory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadInboundGetInventoryParams
) {
  return get<API.OutputInventoryInfoDTOListR>('/pad/Inbound/GetInventory', params);
}
