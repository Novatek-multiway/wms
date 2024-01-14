import NRequest, { get } from "@/http/request";
const request = new NRequest(
	{
		baseURL: import.meta.env.VITE_APP_API
	},
	"",
	false
);
export const fetchDictApi = (params: string) => get<ResultMessageOfString>("/StaticParams", { params });
export const GetAllNotic = (params: string) => request.get<ResultMessageOfString>("/Notice/GetAllNotic", { params });

export const getLoginUserPermissionApi = () => get("/Auth/GetLoginUserPermission");
