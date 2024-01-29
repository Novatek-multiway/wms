// @ts-ignore
/* eslint-disable */
import { get, post } from '../../request';
import type { API } from '../typings';

/** 分页查询容器库存 POST /pad/ContainerInventory/GetPageContainerInventory */
export async function postPadContainerInventoryGetPageContainerInventory(
  body: API.QueryContianerInventoryPageingParameter
) {
  return post<API.ContainerInventoryDTOPageResult>(
    '/pad/ContainerInventory/GetPageContainerInventory',
    body
  );
}

/** 呼叫空托 GET /pad/ContainerInventory/EmptyTrayOutApply */
export async function getPadContainerInventoryEmptyTrayOutApply(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPadContainerInventoryEmptyTrayOutApplyParams
) {
  return get<boolean>('/pad/ContainerInventory/EmptyTrayOutApply', params);
}

/** 获取容器类型选项数据 GET /pad/ContainerInventory/GetContainerTypeList */
export async function getPadContainerInventoryGetContainerTypeList(params) {
  return get<API.SelectItem[]>('/pad/ContainerInventory/GetContainerTypeList', params);
}

export async function GetContainerTypeList(params) {
  return get<API.SelectItem[]>('/pad/Index/GetContainerTypeList', params);
}
/** 获取所有容器选项数据 GET /pad/ContainerInventory/GetAllContainerSelectItem */
export async function getPadContainerInventoryGetAllContainerSelectItem() {
  return get<API.SelectItem[]>('/pad/ContainerInventory/GetAllContainerSelectItem');
}

export async function CombineEmptyTrayStacker(params: any) {
  return get('/pad/Inbound/CombineEmptyTrayStacker', params);
}
