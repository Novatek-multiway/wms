import { post, del } from "@/http/request";

export interface IgetMaterialPackParams {
	pageIndex?: number;
	pageSize?: number;
	query?: QueryMaterialPackagingInfo;
}

export interface QueryMaterialPackagingInfo {
	isSkuPackaging?: boolean | null;
	packagingCode?: null | string;
	packagingName?: null | string;
}

export const getMaterialPack = async (params: IgetMaterialPackParams) => post("/MaterialPackaging/GetPageData", { ...params });

export interface IupdateMaterialPackParams {
	id?: number;
	isSkuPackaging?: boolean;
	materialCode?: null | string;
	materialName?: null | string;
	packagingCode?: null | string;
	packagingDescription?: null | string;
	packagingName?: null | string;
	unitQuantity?: number;
}

export const updateMaterialPack = async (params: IupdateMaterialPackParams) => post("/MaterialPackaging/Update", { ...params });

interface IdelMaterialPackParams {
	id: string;
}

export const delMaterialPack = async (params: IdelMaterialPackParams) => del("/MaterialPackaging/Delete", { ...params });

export interface IaddMaterialPackParams {
	id?: number;
	isSkuPackaging?: boolean;
	materialCode?: null | string;
	materialName?: null | string;
	packagingCode?: null | string;
	packagingDescription?: null | string;
	packagingName?: null | string;
	unitQuantity?: number;
}

export const addMaterialPack = async (params: IaddMaterialPackParams) => post("/MaterialPackaging/Add", { ...params });
