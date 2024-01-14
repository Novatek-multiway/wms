// @ts-ignore
/* eslint-disable */
import { get, post } from '../../request';
import type { API } from '../typings';

/** 获取容器选项数据 GET /api/Container/GetContainerSelectItem */
export async function getApiContainerGetContainerSelectItem() {
  return get<API.SelectItem[]>('/api/Container/GetContainerSelectItem');
}
