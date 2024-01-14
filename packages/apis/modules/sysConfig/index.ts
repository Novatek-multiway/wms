import { get, post } from '../../request';
import type { API } from '../typings';

/** 获取系统默认收货类型设置 GET /api/SysConfig/GetSysReceivingTypeSetting */
export async function getApiSysConfigGetSysReceivingTypeSetting() {
  return get<API.OutputSysAreaReceivingSetting>('/api/SysConfig/GetSysReceivingTypeSetting');
}
