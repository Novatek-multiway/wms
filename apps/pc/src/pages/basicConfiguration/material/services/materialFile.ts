import { get, post, del, put } from "@/http/request";

export interface IgetMaterialFileParams {
	pageIndex?: number;
	pageSize?: number;
	query?: QueryMaterialItemFile;
}

/**
 * QueryMaterialItemFile，物料档案查询条件
 */
export interface QueryMaterialItemFile {
	/**
	 * 物料名称
	 */
	materialName?: null | string;
	/**
	 * 物料类型
	 */
	materialTypeId?: number | null;
	/**
	 * 物料标识
	 */
	materialUID?: null | string;
}

export const getMaterialFile = async (params: IgetMaterialFileParams) => post("/MaterialItem/GetPageData", { ...params });
export interface IupdateMaterialFileParams {
	/**
	 * 收货区域
	 */
	areaId?: number;
	/**
	 * 批次号
	 */
	batchNumber?: null | string;
	/**
	 * 有效期(天数)
	 */
	expiresDays?: number;
	/**
	 * 主键，雪花ID
	 */
	id?: number;
	/**
	 * 收货位置（工作台编号、货位编号）
	 */
	locationCode?: null | string;
	/**
	 * 物料编码
	 */
	materialCode?: null | string;
	/**
	 * 物料ID
	 */
	materialId?: number;
	/**
	 * 描述信息
	 */
	materialItemDescription?: null | string;
	/**
	 * 规格
	 */
	materialSize?: null | string;
	/**
	 * 物料型号ID
	 */
	materialModelId?: number;
	/**
	 * 物料型号名称
	 */
	materialModelName?: null | string;
	/**
	 * 物料名称
	 */
	materialName?: null | string;
	/**
	 * 物料类型ID
	 */
	materialTypeId?: number;
	/**
	 * 物料类型名称
	 */
	materialTypeName?: null | string;
	/**
	 * 物料标识
	 */
	materialUID?: null | string;
	qualityStatus?: number;
	/**
	 * 收货数量
	 */
	quantity?: number;
	/**
	 * 收货单号
	 */
	receiptCode?: null | string;
	/**
	 * 收货单行ID
	 */
	receiptLineId?: number;
	/**
	 * 收货单行号
	 */
	receiptLineNumber?: null | string;
	/**
	 * 物料档案收货标识
	 */
	receivingCode?: null | string;
	/**
	 * 收货日期
	 */
	receivingDate?: Date;
	/**
	 * 物料最小包装 ID
	 */
	skuPackagingId?: number;
	/**
	 * 供应商ID,ContactsInfo表主键
	 */
	supplierId?: number;
}

export const updateMaterialFile = async (params: IupdateMaterialFileParams) => post("/MaterialItem/Update", { ...params });

interface IdelMaterialFileParams {
	id: string;
}

export const delMaterialFile = async (params: IdelMaterialFileParams) => del("/MaterialItem/Delete", { ...params });

export interface IaddMaterialFileParams {
	/**
	 * 收货区域
	 */
	areaId?: number;
	/**
	 * 批次号
	 */
	batchNumber?: null | string;
	/**
	 * 有效期(天数)
	 */
	expiresDays?: number;
	/**
	 * 主键，雪花ID
	 */
	id?: number;
	/**
	 * 收货位置（工作台编号、货位编号）
	 */
	locationCode?: null | string;
	/**
	 * 物料编码
	 */
	materialCode?: null | string;
	/**
	 * 物料ID
	 */
	materialId?: number;
	/**
	 * 描述信息
	 */
	materialItemDescription?: null | string;
	/**
	 * 规格
	 */
	materialSize?: null | string;
	/**
	 * 物料型号ID
	 */
	materialModelId?: number;
	/**
	 * 物料型号名称
	 */
	materialModelName?: null | string;
	/**
	 * 物料名称
	 */
	materialName?: null | string;
	/**
	 * 物料类型ID
	 */
	materialTypeId?: number;
	/**
	 * 物料类型名称
	 */
	materialTypeName?: null | string;
	/**
	 * 物料标识
	 */
	materialUID?: null | string;
	qualityStatus?: number;
	/**
	 * 收货数量
	 */
	quantity?: number;
	/**
	 * 收货单号
	 */
	receiptCode?: null | string;
	/**
	 * 收货单行ID
	 */
	receiptLineId?: number;
	/**
	 * 收货单行号
	 */
	receiptLineNumber?: null | string;
	/**
	 * 物料档案收货标识
	 */
	receivingCode?: null | string;
	/**
	 * 收货日期
	 */
	receivingDate?: Date;
	/**
	 * 物料最小包装 ID
	 */
	skuPackagingId?: number;
	/**
	 * 供应商ID,ContactsInfo表主键
	 */
	supplierId?: number;
}

export const addMaterialFile = async (params: IaddMaterialFileParams) => post("/MaterialItem/Add", { ...params });

/**
 * QueryAreaInfoPageingParameter，分页参数实体
 */
export interface IgetAreaDataParams {
	/**
	 * 页索引
	 */
	pageIndex?: number;
	/**
	 * 页大小
	 */
	pageSize?: number;
	query?: QueryAreaInfo;
}

/**
 * QueryAreaInfo，区域查询模型
 */
export interface QueryAreaInfo {
	/**
	 * 区域编码
	 */
	areaCode?: null | string;
	/**
	 * 区域名称
	 */
	areaName?: null | string;
	areaState?: number;
	areaType?: number;
	/**
	 * 所属仓库id
	 */
	warehouseId?: number | null;
}

export const getAreaData = async (params: IgetAreaDataParams) => post("/Area/GetPageData", { ...params });
export const GetAreaSelectItemList = async (params: any) => get("/Area/GetAreaSelectItemList", { ...params });
/**
 * QueryWorkbenchInfoPageingParameter，分页参数实体
 */
export interface IgetWorkbenchDataParams {
	/**
	 * 页索引
	 */
	pageIndex?: number;
	/**
	 * 页大小
	 */
	pageSize?: number;
	query?: QueryWorkbenchInfo;
}

/**
 * QueryWorkbenchInfo，工作台查询模型
 */
export interface QueryWorkbenchInfo {
	/**
	 * 所属区域ID
	 */
	areaId?: number | null;
	/**
	 * 所属仓库ID
	 */
	warehouseId?: number | null;
	/**
	 * 工作台名称
	 */
	workbenchName?: null | string;
}
export const getWorkbenchData = async () => get("/Location/GetAreaLocationList");

/**
 * QueryReceiptHearderInfoPageingParameter，分页参数实体
 */
export interface IgetWorkbenchDataParams {
	/**
	 * 页索引
	 */
	pageIndex?: number;
	/**
	 * 页大小
	 */
	pageSize?: number;
	query?: QueryReceiptHearderInfo;
}

/**
 * QueryReceiptHearderInfo，收货单头查询模型
 */
export interface QueryReceiptHearderInfo {
	auditStatus?: number;
	/**
	 * 是否超期
	 */
	isExpires?: boolean | null;
	/**
	 * 是否需要审核
	 */
	isNeedAudit?: boolean | null;
	/**
	 * 收货单号
	 */
	receiptOrderNo?: null | string;
	receiptStatus?: number;
}

export const getReceiptHeaderData = async (params: IgetWorkbenchDataParams) => post("/ReceiptHeader/GetPageData", { ...params });
