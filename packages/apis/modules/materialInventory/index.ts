// @ts-ignore
/* eslint-disable */
import { get, post } from '../../request';
import type { API } from '../typings';

/** 分页查询库存信息 POST /pad/MaterialInventory/GetPageData */
export async function postPadMaterialInventoryGetPageData(
  body: API.QueryInventoryPageingParameter
) {
  return post<API.OutputInventoryInfoDTOPageResult>('/pad/MaterialInventory/GetPageData', body);
}
