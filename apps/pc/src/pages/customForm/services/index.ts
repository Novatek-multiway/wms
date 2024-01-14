import { get, post } from "@/http/request";

export const GetParamInfo = (params: any) => get("/SysParam/GetParamInfo", params);

export const EditParamInfo = (params: any) => post("/SysParam/EditParamInfo", params);

export const WmsClearData = () => get('/SysConfig/WmsClearData')