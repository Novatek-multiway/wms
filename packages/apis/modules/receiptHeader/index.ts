import { get, post } from '../../request';
import type { API } from '../typings';

/** 分页查询收货单 POST /api/ReceiptHeader/GetPageData */
export async function postApiReceiptHeaderGetPageData(
  body: API.QueryReceiptHearderInfoPageingParameter
) {
  return post<API.OutputReceiptHeaderInfoDTOPageResult>('/api/ReceiptHeader/GetPageData', body);
}
