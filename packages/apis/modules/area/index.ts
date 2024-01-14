// @ts-ignore
/* eslint-disable */
import { get, post } from '../../request';
import type { API } from '../typings';

/** 获取区域选项数据 GET /api/Area/GetAreaSelectItemList */
export async function getApiAreaGetAreaSelectItemList(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getApiAreaGetAreaSelectItemListParams,
  ) {
    return get<API.SelectItem>('/api/Area/GetAreaSelectItemList', params);
}

