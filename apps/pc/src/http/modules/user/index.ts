import { post, get } from "@/http/request";
import ApifoxModel from "./interface";
export const fetchUser = (params: any) => post<ApifoxModel>("/Auth/Login", { ...params });

/** 获取刷新Token GET /api/Auth/GetRefreshToken */
export async function getApiAuthGetRefreshToken() {
    return get<string>('/Auth/GetRefreshToken');
}

/** 刷新Token GET /api/Auth/RefreshToken */
export async function getApiAuthRefreshToken(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: { refreshToken?: string; },
) {
    return get<string>('/Auth/RefreshToken', params);
}