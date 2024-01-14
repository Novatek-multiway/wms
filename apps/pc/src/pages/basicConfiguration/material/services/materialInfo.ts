import { get, post, del } from "@/http/request";

export interface IgetMaterialInfoParams {
	pageIndex?: number;
	pageSize?: number;
	query?: QueryMaterialInfo;
}

export interface QueryMaterialInfo {
	materialCode?: null | string;
	materialName?: null | string;
	materialTypeIdList?: number[] | null;
}

export const getMaterialInfo = async (params: IgetMaterialInfoParams) => post("/Material/GetPageData", { ...params });

export interface IupdateMaterialInfoParams {
	defaultQualityStatus?: number;
	/**
	 * 有效期(天数)
	 */
	expiresDays?: number;
	/**
	 * 是否有物料标识:1-有,0-没有
	 */
	hasMaterialSign?: boolean;
	/**
	 * 主键，雪花ID
	 */
	id?: number;
	/**
	 * 是否允许混盘:1-允许,0-不允许
	 */
	isMixedPallet?: boolean;
	/**
	 * 物料标识是否唯一:1-是,0-不是
	 */
	isUniqueSign?: boolean;
	/**
	 * 物料编码
	 */
	materialCode?: null | string;
	/**
	 * 描述信息
	 */
	materialDescription?: null | string;
	/**
	 * 物料名称
	 */
	materialName?: null | string;
	/**
	 * 规格
	 */
	materialSize?: null | string;
	/**
	 * 物料类型ID
	 */
	materialTypeId?: number;
	/**
	 * 物料最小包装 ID
	 */
	skuPackagingId?: number;
}

export const updateMaterialInfo = async (params: IupdateMaterialInfoParams) => post("/Material/Update", { ...params });

interface IdelMaterialInfoParams {
	id: string;
}

export const delMaterialInfo = async (params: IdelMaterialInfoParams) => del("/Material/Delete", { ...params });

export interface IaddMaterialInfoParams {
	defaultQualityStatus?: number;
	/**
	 * 有效期(天数)
	 */
	expiresDays?: number;
	/**
	 * 是否有物料标识:1-有,0-没有
	 */
	hasMaterialSign?: boolean;
	/**
	 * 主键，雪花ID
	 */
	id?: number;
	/**
	 * 是否允许混盘:1-允许,0-不允许
	 */
	isMixedPallet?: boolean;
	/**
	 * 物料标识是否唯一:1-是,0-不是
	 */
	isUniqueSign?: boolean;
	/**
	 * 物料编码
	 */
	materialCode?: null | string;
	/**
	 * 描述信息
	 */
	materialDescription?: null | string;
	/**
	 * 物料名称
	 */
	materialName?: null | string;
	/**
	 * 规格
	 */
	materialSize?: null | string;
	/**
	 * 物料类型ID
	 */
	materialTypeId?: number;
	/**
	 * 包装编码
	 */
	packagingCode?: null | string;
	/**
	 * 包装名称（单位名称）
	 */
	packagingName?: null | string;
	/**
	 * 物料最小包装 ID
	 */
	skuPackagingId?: number;
	/**
	 * 单位数量
	 */
	unitQuantity?: number;
}

export const addMaterialInfo = async (params: any) => post("/Material/Add", { ...params, id: "0" });

export const getQualityStatus = async () => get("/Enum/GetSelectItemList?enumName=EnumQualityStatus");
export const getRequirementStatus = async () => get("/Enum/GetSelectItemList?enumName=EnumRequirementStatus");
export const getAutoAllocationStatus = async () => get("/Enum/GetSelectItemList?enumName=EnumAutoAllocationStatus");

export const getMaterialModelList = () => get("/Material/GetMaterialModelList");
