// @ts-ignore
/* eslint-disable */
import { get, post } from '../../request';
import type { API } from '../typings';

/** 根据指定画布ID获取对应区域数据 GET /api/Canvas3D/GetAreaList */
export async function getApiCanvas3DGetAreaList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApiCanvas3DGetAreaListParams
) {
  return get<API.AreaCanvasDTOListR>('/api/Canvas3D/GetAreaList', params);
}

/** 获取自定义区域 GET /api/Canvas3D/GetCustomAreaList */
export async function getApiCanvas3DGetCustomAreaList(options?: { [key: string]: any }) {
  return get<API.CustomAreaDTOListR>('/api/Canvas3D/GetCustomAreaList');
}

/** 获取库位明细数据、库存数据 GET /api/Canvas3D/GetLocationDetailById */
export async function getApiCanvas3DGetLocationDetailById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApiCanvas3DGetLocationDetailByIdParams
) {
  return get<API.OutputLocationDetailDTOR>('/api/Canvas3D/GetLocationDetailById', params);
}

/** 获取主图数据 GET /api/Canvas3D/GetMain */
export async function getApiCanvas3DGetMain(options?: { [key: string]: any }) {
  return get<API.MainCanvasDTOR>('/api/Canvas3D/GetMain');
}
