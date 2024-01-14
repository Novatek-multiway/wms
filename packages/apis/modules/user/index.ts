import { get, post } from '../../request';
import type { API } from '../typings';

// 不知道为啥必须得显示得声明返回类型，通过泛型传递会导致类型丢失
export const AuthLogin = (data: API.LoginModel) => post<string>('/api/Auth/Login', data);

export const AuthLogout = () => get<boolean>('/api/Auth/Logout');

export const GetLoginUserPermission = () =>
  get<API.UserPermissionDTO>('/api/Auth/GetLoginUserPermission');


  /** 获取刷新Token GET /api/Auth/GetRefreshToken */
export async function getApiAuthGetRefreshToken() {
  return get<API.StringR>('/api/Auth/GetRefreshToken');
}

/** 刷新Token GET /api/Auth/RefreshToken */
export async function getApiAuthRefreshToken(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApiAuthRefreshTokenParams,
) {
  return get<API.StringR>('/api/Auth/RefreshToken', params);
}