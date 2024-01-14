// @ts-ignore
/* eslint-disable */
import { get, post } from '../../request';
import type { API } from '../typings';

/** 分页查询容器库存 POST /pad/EmptyTray/GetPageContainerInventory */
export async function postPadEmptyTrayGetPageContainerInventory(
  body: API.QueryContianerInventoryPageingParameter
) {
  return post<API.ContainerInventoryDTOPageResult>(
    '/pad/EmptyTray/GetPageContainerInventory',
    body
  );
}
