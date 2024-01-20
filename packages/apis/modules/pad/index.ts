import { get, post } from '../../request';
import type { API } from '../typings';

export const GetSummary = () => get<API.WarehouseSummaryDTO>('/pad/Index/GetSummary');
export const SetLocationFull = (params) =>
  get<API.WarehouseSummaryDTO>('pad/Index/SetLocationFull', params);

export const GetLayerNavigation = () =>
  get<API.LayerNavigationDTO[]>('/pad/Index/GetLayerNavigation');

export const Get2DTileData = (data: API.Query2DTile) =>
  post<API.OutputLayerTileDTO[]>('/pad/Index/Get2DTileData', data);

export const GetLocationDetailById = (params: { id: string }) =>
  get<API.OutputLocationDetailDTO>('/pad/Index/GetLocationDetailById', params);

export const InStockApply = (params: API.getApiInvoiceHeaderInStockApplyParams) =>
  get<API.TaskInfo>('/pad/Index/InStockApply', params);

export const CombineInStock = (params: API.getCombineInStockParams) =>
  get<API.TaskInfo>('/pad/Index/CombineInStock', params);

export const PadOutStockApply = (body: any) => post('/api/OpenApi/OutStockApply', body);
