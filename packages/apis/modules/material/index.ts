// @ts-ignore
/* eslint-disable */
import { get, post } from '../../request';
import type { API } from '../typings';

/** 获取物料信息分页数据 POST /api/Material/GetPageData */
export async function postApiMaterialGetPageData(body: API.QueryMaterialInfoPageingParameter) {
  return post<API.OutputMaterialInfoDTOPageResult>('/api/Material/GetPageData', body);
}
