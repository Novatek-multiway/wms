// @ts-ignore
/* eslint-disable */
import { get, post } from '../../request';
import type { API } from '../typings';

/** 根据区域类型获取工位/货位选项数据 GET /api/Location/GetAreaLocationList */
export async function getApiLocationGetAreaLocationList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApiLocationGetAreaLocationListParams
) {
  return get<API.AreaLocationDTO>('/api/Location/GetAreaLocationList', params);
}
