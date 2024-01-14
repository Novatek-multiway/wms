import { message } from "antd";
import { clearToken } from "@/utils/token";
import { t } from "i18next";
/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
	switch (status) {
		case 400:
			message.error(t("请求失败！请您稍后重试"));
			break;
		case 401:
			clearToken("AuthenticationToken");
			message.error(t("登录失效！请您重新登录"));
			window.location.hash = "/login";
			break;
		case 403:
			message.error(t("当前账号无权限访问！"));
			break;
		case 404:
			message.error(t("你所访问的资源不存在！"));
			break;
		case 405:
			message.error(t("请求方式错误！请您稍后重试"));
			break;
		case 408:
			message.error(t("请求超时！请您稍后重试"));
			break;
		case 500:
			message.error(t("服务异常！"));
			break;
		case 502:
			message.error(t("网关错误！"));
			break;
		case 503:
			message.error(t("服务不可用！"));
			break;
		case 504:
			message.error(t("网关超时！"));
			break;
		default:
			message.error(t("请求失败！"));
	}
};
