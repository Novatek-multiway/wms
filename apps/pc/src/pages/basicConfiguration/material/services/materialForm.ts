import { post, del, get } from "@/http/request";

export interface IgetMaterialFormParams {
	pageIndex?: number;
	pageSize?: number;
	query?: QueryMaterialModelInfo;
}

export interface QueryMaterialModelInfo {
	materialModelName?: null | string;
}
export const getMaterialForm = async () => get("/Material/GetMaterialModelList");

export interface IupdateMaterialFormParams {
	id?: number;
	materialModelDescription?: null | string;
	materialModelName?: null | string;
}

export const updateMaterialForm = async (params: IupdateMaterialFormParams) => post("/MaterialModel/Update", { ...params });

interface IdelMaterialFormParams {
	id: string;
}

export const delMaterialForm = async (params: IdelMaterialFormParams) => del("/MaterialModel/Delete", { ...params });

export interface IaddMaterialFormParams {
	id?: number;
	materialModelDescription?: null | string;
	materialModelName?: null | string;
}

export const addMaterialForm = async (params: IaddMaterialFormParams) => post("/MaterialModel/Add", { ...params });
