import { get, post } from '../../request';
import type { API } from '../typings';

/** 分页查询盘点单-已完成 POST /pad/Stocktake/GetFinishPageData */
export async function postPadStocktakeGetFinishPageData(
  body: API.QueryPadStocktakeLocationPageingParameter
) {
  return post<API.PadStocktakeLocationDTOPageResult>('/pad/Stocktake/GetFinishPageData', body);
}

/** 分页查询盘点单-未完成 POST /pad/Stocktake/GetUnfinishPageData */
export async function postPadStocktakeGetUnfinishPageData(
  body: API.QueryPadStocktakeLocationPageingParameter
) {
  return post<API.PadStocktakeLocationDTOPageResult>('/pad/Stocktake/GetUnfinishPageData', body);
}

/** 搬运 GET /pad/Stocktake/CreateCarryTask */
export async function getPadStocktakeCreateCarryTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadStocktakeCreateCarryTaskParams
) {
  return get<boolean>('/pad/Stocktake/CreateCarryTask', params);
}

/** 批量搬运 POST /pad/Stocktake/CreateCarryTask */
export async function postPadStocktakeCreateCarryTask(body: number[]) {
  return post<string>('/pad/Stocktake/CreateCarryTask', body);
}

/** 根据盘点库位ID获取盘点记录数据 GET /pad/Stocktake/GetStocktakeRecordByLocation */
export async function getPadStocktakeGetStocktakeRecordByLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadStocktakeGetStocktakeRecordByLocationParams
) {
  return get<API.OutputStocktakeRecordInfoDTO[]>(
    '/pad/Stocktake/GetStocktakeRecordByLocation',
    params
  );
}

/** 更新盘点记录数据 POST /pad/Stocktake/UpdateStocktakeRecord */
export async function postPadStocktakeUpdateStocktakeRecord(
  body: API.OutputStocktakeRecordInfoDTO[]
) {
  return post<boolean>('/pad/Stocktake/UpdateStocktakeRecord', body);
}

/** 获取盘点中，待申请调整的盘点单列表 GET /pad/Stocktake/GetStocktakingList */
export async function getPadStocktakeGetStocktakingList() {
  return get<API.OutputStocktakeInfoDTO[]>('/pad/Stocktake/GetStocktakingList');
}

/** 获取盘点计划盈亏数据 GET /pad/Stocktake/GetAdjustedStocktake */
export async function getPadStocktakeGetAdjustedStocktake(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadStocktakeGetAdjustedStocktakeParams
) {
  return get<API.StocktakeRecordInfoDTO[]>('/pad/Stocktake/GetAdjustedStocktake', params);
}

/** 申请调账 GET /pad/Stocktake/AdjustedStocktake */
export async function getPadStocktakeAdjustedStocktake(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadStocktakeAdjustedStocktakeParams
) {
  return get<API.StocktakeRecordInfoDTO[]>('/pad/Stocktake/AdjustedStocktake', params);
}

/** 添加盘点计划-随机抽盘 POST /pad/Stocktake/AddStocktakeBySampling */
export async function postPadStocktakeAddStocktakeBySampling(body: API.AddStocktakeBySamplingDTO) {
  return post<boolean>('/pad/Stocktake/AddStocktakeBySampling', body);
}

/** 获取新盘点单号 GET /pad/Stocktake/GetStocktakeCode */
export async function getPadStocktakeGetStocktakeCode() {
  return get<string>('/pad/Stocktake/GetStocktakeCode');
}
