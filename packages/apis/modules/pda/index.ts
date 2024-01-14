// @ts-ignore
import { get, post } from '../../request';
import type { API } from '../typings';

/** 入库申请（工位满盘申请入库、工位空盘申请入库） GET /Pda/InStockApply */
export async function getPdaInStockApply(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPdaInStockApplyParams
) {
  return get<API.TaskInfo>('/Pda/InStockApply', params);
}

/** 呼叫空托 GET /Pda/EmptyTrayOutApply */
export async function getPdaEmptyTrayOutApply(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPdaEmptyTrayOutApplyParams
) {
  return get<boolean>('/Pda/EmptyTrayOutApply', params);
}

/** 获取容器类型选项数据 GET /Pda/GetContainerTypeList */
export async function getPdaGetContainerTypeList() {
  return get<API.SelectItem[]>('/Pda/GetContainerTypeList');
}

/** 获取库位详情 GET /Pda/GetLocationDetailByCode */
export async function getPdaGetLocationDetailByCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPdaGetLocationDetailByCodeParams
) {
  return get<API.OutputLocationDetailDTO>('/Pda/GetLocationDetailByCode', params);
}

/** 获取库位详情 GET /Pda/GetLocationDetailById */
export async function getPdaGetLocationDetailById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPdaGetLocationDetailByIdParams
) {
  return get<API.OutputLocationDetailDTO>('/Pda/GetLocationDetailById', params);
}

/** 点对点搬运 GET /Pda/Move */
export async function getPdaMove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPdaMoveParams
) {
  return get<boolean>('/Pda/Move', params);
}

/** 解绑 POST /Pda/Unbinding */
export async function postPdaUnbinding(body: API.PadUnbindingDTO) {
  return post<boolean>('/Pda/Unbinding', body);
}

/** 获取待收列表 GET /Pda/GetUnfinishInboundByMaterialCode */
export async function getPdaGetUnfinishInboundByMaterialCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPdaGetUnfinishInboundByMaterialCodeParams
) {
  return get<API.PadReceiptLineInfoDTO[]>('/Pda/GetUnfinishInboundByMaterialCode', params);
}

/** 获取待发列表 GET /Pda/GetUnfinishOutboundByMaterialCode */
export async function getPdaGetUnfinishOutboundByMaterialCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPdaGetUnfinishOutboundByMaterialCodeParams
) {
  return get<API.PdaPickingDTO[]>('/Pda/GetUnfinishOutboundByMaterialCode', params);
}

/** 获取待盘点列表 GET /Pda/GetUnfinishStocktakeByMaterialCode */
export async function getPdaGetUnfinishStocktakeByMaterialCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPdaGetUnfinishStocktakeByMaterialCodeParams
) {
  return get<API.PdaStocktakeDetailDTO[]>('/Pda/GetUnfinishStocktakeByMaterialCode', params);
}

/** 绑盘 POST /Pda/Binding */
export async function postPdaBinding(body: API.PadCombineInfoDTO) {
  return post<API.BooleanR>('/Pda/Binding', body);
}

/** 拣选出库 POST /Pda/OutboundPicking */
export async function postPdaOutboundPicking(body: API.PdaPickingDTO) {
  return post<boolean>('/Pda/OutboundPicking', body);
}

/** 更新盘点记录数据 POST /Pda/UpdateStocktakeRecord */
export async function postPdaUpdateStocktakeRecord(body: API.PdaStocktakeDetailDTO) {
  return post<API.BooleanR>('/Pda/UpdateStocktakeRecord', body);
}

/** 获取新盘点单号 GET /Pda/GetStocktakeCode */
export async function getPdaGetStocktakeCode() {
  return get<API.StringR>('/Pda/GetStocktakeCode');
}

/** 添加盘点计划-随机抽盘 POST /Pda/AddStocktakeBySampling */
export async function postPdaAddStocktakeBySampling(body: API.AddStocktakeBySamplingDTO) {
  return post<API.BooleanR>('/Pda/AddStocktakeBySampling', body);
}

/** 获取当前库存数量 GET /Pda/GetInventoryQuantity */
export async function getPdaGetInventoryQuantity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPdaGetInventoryQuantityParams
) {
  return get<API.PdaStocktakeDetailDTOR>('/Pda/GetInventoryQuantity', params);
}

/** 获取当前库存数量 GET /Pda/GetInventoryQuantity */
export async function OpenApiInStockApply(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  body: API.InStockApplyBody
) {
  return post<API.PdaStocktakeDetailDTOR>('/api/OpenApi/InStockApply', body);
}

/** 获取当前库存数量 GET /Pda/GetInventoryQuantity */
export async function PostUnbindingBatch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  body: any
) {
  return post<API.PdaStocktakeDetailDTOR>('/pad/Index/UnbindingBatch', body);
}
