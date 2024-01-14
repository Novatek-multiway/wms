import { get, post } from '../../request';
import type { API } from '../typings';

/** 根据枚举类型获取枚举选项 GET /api/Enum/GetSelectItemList */
export async function getApiEnumGetSelectItemList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApiEnumGetSelectItemListParams
) {
  return get<API.Int32SelectItem[]>('/api/Enum/GetSelectItemList', params);
}
