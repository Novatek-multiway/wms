import { post, del } from "@/http/request";

export interface IgetMaterialSupplyParams {
	pageIndex?: number;
	pageSize?: number;
	query?: QueryContactsInfo;
}

export interface QueryContactsInfo {
	contactCode?: null | string;
	contactName?: null | string;
	isCustomer?: boolean | null;
	isSupplier?: boolean | null;
	organizationName?: null | string;
	phoneNumber?: null | string;
}

export const getMaterialSupply = async (params: IgetMaterialSupplyParams) => post("/Contacts/GetPageData", { ...params });

export interface IupdateMaterialSupplyParams {
	address?: null | string;
	contactCode?: null | string;
	contactDescription?: null | string;
	contactName?: null | string;
	email?: null | string;
	id?: number;
	isCustomer?: boolean;
	isSupplier?: boolean;
	organizationName?: null | string;
	phoneNumber?: null | string;
}

export const updateMaterialSupply = async (params: IupdateMaterialSupplyParams) => post("/Contacts/Update", { ...params });

interface IdelMaterialSupplyParams {
	id: string;
}

export const delMaterialSupply = async (params: IdelMaterialSupplyParams) => del("/Contacts/Delete", { ...params });

export interface IaddMaterialSupplyParams {
	address?: null | string;
	contactCode?: null | string;
	contactDescription?: null | string;
	contactName?: null | string;
	email?: null | string;
	id?: number;
	isCustomer?: boolean;
	isSupplier?: boolean;
	organizationName?: null | string;
	phoneNumber?: null | string;
}

export const addMaterialSupply = async (params: IaddMaterialSupplyParams) => post("/Contacts/Add", { ...params });
