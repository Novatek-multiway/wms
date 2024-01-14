// @ts-ignore
/* eslint-disable */
import { get, post } from '../../request';
import type { API } from '../typings';

/** 分页查询任务信息-已完成 POST /pad/CarryTask/GetFinishPageData */
export async function postPadCarryTaskGetFinishPageData(body: API.QueryTaskInfoPageingParameter) {
  return post<API.OutputTaskInfoDTOPageResult>('/pad/CarryTask/GetFinishPageData', body);
}

/** 分页查询任务信息-未完成 POST /pad/CarryTask/GetUnfinishPageData */
export async function postPadCarryTaskGetUnfinishPageData(body: API.QueryTaskInfoPageingParameter) {
  return post<API.OutputTaskInfoDTOPageResult>('/pad/CarryTask/GetUnfinishPageData', body);
}

/** 点对点搬运 GET /pad/CarryTask/Move */
export async function getPadCarryTaskMove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadCarryTaskMoveParams
) {
  return get<Boolean>('/pad/CarryTask/Move', params);
}

/** 取消任务 GET /pad/CarryTask/Cancel */
export async function getPadCarryTaskCancel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadCarryTaskCancelParams
) {
  return get<boolean>('/pad/CarryTask/Cancel', params);
}

/** 手动完成任务 POST /pad/CarryTask/ManualFinish */
export async function postPadCarryTaskManualFinish(body: API.ManualFinishTaskDTO) {
  return post<boolean>('/pad/CarryTask/ManualFinish', body);
}

/** 回库申请（工位满盘申请入库、工位空盘申请入库） GET /pad/Stocktake/InStockApply */
export async function getPadStocktakeInStockApply(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadStocktakeInStockApplyParams
) {
  return get<boolean>('/pad/Stocktake/InStockApply', params);
}
