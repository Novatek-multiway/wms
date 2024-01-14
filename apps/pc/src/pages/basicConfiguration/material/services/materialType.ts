import { post, del, get } from "@/http/request";

export interface IgetMaterialTypeParams {
	pageIndex?: number;
	pageSize?: number;
	query?: QueryMaterialTypeInfo;
}

export interface QueryMaterialTypeInfo {
	materialTypeName?: null | string;
}

export const getMaterialType = () => get("/Material/GetMaterialTypeList");

export interface IupdateMaterialTypeParams {
	id?: number;
	materialTypeDescription?: null | string;
	materialTypeName?: null | string;
}
export const updateMaterialType = (params: IupdateMaterialTypeParams) => post("/MaterialType/Update", { ...params });

interface IdelMaterialTypeParams {
	id: string;
}
export const delMaterialType = (params: IdelMaterialTypeParams) => del("/MaterialType/Delete", { ...params });

export interface IaddMaterialTypeParams {
	id?: number;
	materialTypeDescription?: null | string;
	materialTypeName?: null | string;
}
export const addMaterialType = (params: IaddMaterialTypeParams) => post("/MaterialType/Add", { ...params });
