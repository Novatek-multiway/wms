import { get, post } from "@/http/request";

export const Get2DTileData = (data: {
	/** 层 */
	layer?: number;
	/** 区 */
	areaId?: number;
}) => post<any[]>("/Home/Get2DTileData", data);

export const GetLayerNavigation = () => get("/Home/GetLayerNavigation");
