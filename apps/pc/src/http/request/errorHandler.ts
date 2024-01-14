import { clearToken } from "@/utils/token";
import { message } from "antd";
import { ResponseCode } from "./enum";

const ErrorHandle = {
	[ResponseCode.Fail]() {
		console.log("失败");
	},
	[ResponseCode.BAD_REQUEST]() {
		console.log("坏请求");
	},
	[ResponseCode.No_AUTHENTICATION]() {
		clearToken('AuthenticationToken');
		window.location.hash = "/login";
		console.log("没有token");
	}
};

export default ErrorHandle;
