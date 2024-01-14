export enum StateCode {
	NUMBER_200 = 200,
	NUMBER_401 = 401,
	NUMBER_404 = 404,
	NUMBER_500 = 500
}
export interface ResultMessage {
	/**
	 *
	 * @type {StateCode}
	 * @memberof ResultMessage
	 */
	code: StateCode;
	/**
	 *
	 * @type {string}
	 * @memberof ResultMessage
	 */
	msg?: string;
}
/**
 * 库位分组配置
 * @export
 * @interface StorageGroupInfo
 */
export interface StorageGroupInfo {
	/**
	 * ID
	 * @type {number}
	 * @memberof StorageGroupInfo
	 */
	id: number;
	/**
	 * 组名称
	 * @type {string}
	 * @memberof StorageGroupInfo
	 */
	groupName?: string;
	/**
	 * 小车类型
	 * @type {number}
	 * @memberof StorageGroupInfo
	 */
	carrierType: number;
	/**
	 * 取货库位列表
	 * @type {Array<string>}
	 * @memberof StorageGroupInfo
	 */
	pickStorages?: Array<string>;
	/**
	 * 放货库位列表
	 * @type {Array<string>}
	 * @memberof StorageGroupInfo
	 */
	putStorages?: Array<string>;
}

export interface ResultMessageOfStorageGroupInfoAllOf {
	/**
	 *
	 * @type {StorageGroupInfo}
	 * @memberof ResultMessageOfStorageGroupInfoAllOf
	 */
	data?: StorageGroupInfo;
}

export type ResultMessageOfStorageGroupInfo = ResultMessage & ResultMessageOfStorageGroupInfoAllOf;
