export type DictionaryInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 父级ID,为0时是根节点 */
    parentId?: number;
    /** 字典名称 */
    dictionaryName?: string;
    businessType?: EnumBusinessType;
    /** 字典值类型 */
    dictionaryValueType?: string;
    /** 备注 */
    dictionaryRemark?: string;
    /** 排序 */
    sortBy?: number;
    /** 字典值列表 */
    dictionaryValueList?: DictionaryValueInfoDTO[];
};

export type OutputDictionaryInfoDTOPageResultServiceResult = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputDictionaryInfoDTOPageResult;
    statusCode?: EnumStatusCode;
};

export type OutputDictionaryInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputDictionaryInfoDTO[];
};

export type OutputDictionaryInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 字典名称 */
    dictionaryName?: string;
    businessType?: EnumBusinessType;
    /** 字典值类型 */
    dictionaryValueType?: string;
    /** 备注 */
    dictionaryRemark?: string;
    /** 排序 */
    sortBy?: number;
    /** 字典值 */
    dictionaryValueList?: OutputDictionaryValueInfoDTO[];
};

export type OutputDictionaryValueInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 字典Id */
    dictionaryId?: number;
    /** 字典值 */
    dictionaryValue?: string;
    /** 字典值标签 */
    valueLabel?: string;
    /** 是否默认 */
    isDefault?: boolean;
    /** 是否系统保留值 */
    isSystem?: boolean;
    /** 备注 */
    dictionaryValueRemark?: string;
    /** 排序 */
    sortBy?: number;
};

export type DictionaryValueInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 字典Id */
    dictionaryId?: number;
    /** 字典值 */
    dictionaryValue?: string;
    /** 字典值标签 */
    valueLabel?: string;
    /** 是否默认 */
    isDefault?: boolean;
    /** 是否系统保留值 */
    isSystem?: boolean;
    /** 备注 */
    dictionaryValueRemark?: string;
    /** 排序 */
    sortBy?: number;
};

export type BooleanServiceResult = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: boolean;
    statusCode?: EnumStatusCode;
};

export type EnumBusinessType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type EnumStatusCode = 0 | 200 | 400 | 401 | 404 | 408 | 500 | 600 | 700 | 800;
