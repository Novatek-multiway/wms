export declare namespace API {
  type AddInvoiceDTO = {
    /** Id */
    id?: number;
    /** 发货单头编号 */
    invoiceCode?: string;
    /** 发货类型 */
    invoiceTypeId?: number;
    /** 搬运目标区域id */
    outboundAreaId?: number;
    qualityStatus?: EnumQualityStatus;
    /** 描述信息 */
    invoiceHeaderDescription?: string;
    /** 是否自动分配库存 */
    isAutoAllocation?: boolean;
    /** 发货单明细信息 */
    invoiceLineList?: AddInvoiceLineDTO[];
  };

  type getApiAuthRefreshTokenParams = {
    refreshToken?: string;
  };

  type AddInvoiceLineDTO = {
    /** Id */
    id?: number;
    /** 单行号 */
    invoiceLineNumber?: string;
    /** 物料ID */
    materialId?: number;
    /** 物料批次号 */
    batchNumber?: string;
    /** 数量 */
    quantity?: number;
    /** 描述信息 */
    invoiceLineDescription?: string;
  };

  type AddQualityTestInfoDTO = {
    /** 主键Id */
    id?: number;
    /** 质检单号 */
    qualityTestCode?: string;
    /** 是否搬运 */
    isCarry?: boolean;
    /** 搬运目标区域 */
    targetAreaId?: number;
    /** 质检单描述 */
    qualityTestDescription?: string;
    /** 物料ID */
    materialId?: number;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 规格 */
    materialSize?: string;
    qualityStatus?: EnumQualityStatus;
    /** 抽检容器数量 */
    containerQuantity?: number;
  };

  type AddReceiptOrderDTO = {
    /** 收货单头Id */
    id?: number;
    /** 收货单头编号 */
    receiptCode?: string;
    /** 收货类型 */
    receiptTypeId?: number;
    /** 供应商 */
    supplierId?: number;
    /** 描述信息 */
    receiptHeaderDescription?: string;
    /** 收货单明细信息 */
    receiptLines?: ReceiptLineInfoDTO[];
  };

  type AddStocktakeByLocationDTO = {
    stocktakeInfo?: StocktakeInfoDTO;
    /** 货位ID集 */
    locationIdList?: number[];
  };

  type AddStocktakeByMaterialDTO = {
    stocktakeInfo?: StocktakeInfoDTO;
    /** 物料ID集 */
    materialIdList?: number[];
  };

  type AddStocktakeBySamplingDTO = {
    /** 盘点单号 */
    stocktakeCode?: string;
    /** 货位ID */
    locationId?: number;
    /** 物料档案ID */
    materialId?: number;
    /** 盘后库存 */
    adjustedQuantity?: number;
  };

  type AddWavenumberDTO = {
    /** 波次id */
    id?: number;
    /** 波次单头编号 */
    wavenumberCode?: string;
    /** 波次单名称 */
    wavenumberName?: string;
    /** 描述信息 */
    waveHeaderDescription?: string;
    /** 搬运目标区域 */
    toAreaId?: number;
    /** 发货单id */
    invoiceID?: number[];
  };

  type AllocateInventoryDTO = {
    /** 库存ID */
    inventoryId?: number;
    /** 分配数量 */
    allotQuantity?: number;
  };

  type AllocateInventoryDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: AllocateInventoryDTO[];
    statusCode?: EnumStatusCode;
  };

  type AllocationItemInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 出库需求ID */
    outboundRequirementId?: number;
    /** 库存ID */
    inventoryId?: number;
    /** 容器ID */
    containerId?: number;
    /** 容器编码 */
    containerCode?: string;
    /** 库位ID */
    locationId?: number;
    /** 库位编码 */
    locationCode?: string;
    /** 分配数量 */
    quantity?: number;
  };

  type AreaCanvasDTO = {
    /** ID */
    id?: string;
    /** 主图ID */
    canvasId?: string;
    /** x轴起始点 */
    fromXaxis?: number;
    /** y轴起始点 */
    fromYaxis?: number;
    /** x轴目标点 */
    toXaxis?: number;
    /** y轴目标点 */
    toYaxis?: number;
    canvasAreaType?: EnumCanvasAreaType;
    /** 当前区域库位集合 */
    locationList?: LocationDTO[];
    /** 类型为2时，巷道编号 */
    tunnelCode?: string;
    /** 类型为2时，巷道名称 */
    tunnelName?: string;
  };

  type AreaCanvasDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: AreaCanvasDTO[];
    statusCode?: EnumStatusCode;
  };

  type AreaInfoDTO = {
    /** 区域id */
    id?: number;
    /** 区域编号（一位字母一位数字） */
    areaCode?: string;
    /** 区域名称 */
    areaName?: string;
    /** 所属仓库id */
    warehouseId?: number;
    areaType?: EnumAreaType;
    allotLocationProcessType?: EnumAllotLocationProcessType;
    areaState?: EnumAreaState;
    /** 区域描述 */
    areaDescribe?: string;
  };

  type AreaLocation = {
    /** 俯视图货位信息 */
    displayCode?: string;
    /** 货位编号(区号两位，排、列、层三位数字，深位两位数字，中间用-隔开) */
    locationCode?: string;
    /** 所属仓库ID */
    warehouseId?: string;
    /** 所属区域ID */
    areaId?: string;
    /** 所属巷道ID */
    tunnelId?: string;
    /** 货位排 */
    locationRow?: number;
    /** 货位列 */
    locationColumn?: number;
    /** 画布排 */
    canvasRow?: number;
    /** 画布列 */
    canvasColumn?: number;
    /** 画布货位类型 */
    canvasType?: number;
    /** 货位层 */
    locationLayer?: number;
    /** 货位当前深位 */
    currentLocationDepth?: number;
    /** 俯视图货位状态。 0：空闲 1：有货未满 2：满货 3：火警 4：异常 5：禁用 */
    state?: number;
    xaxis?: number;
    yaxis?: number;
    locationCount?: number;
    fullLocationCount?: number;
    /** 货位集合 */
    locationList?: LocationDTO[];
  };

  type AreaLocationDTO = {
    /** 主键 */
    id?: number;
    /** 区域名称 */
    areaCode?: string;
    /** 区域别名 */
    areaName?: string;
    areaType?: EnumAreaType;
    /** 位置选项 */
    locationSelectItemList?: SelectItem[];
  };

  type AreaLocationDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: AreaLocationDTO[];
    statusCode?: EnumStatusCode;
  };

  type AreaLocationSummaryDTO = {
    /** 区域ID */
    areaId?: string;
    /** 区域编号 */
    areaCode?: string;
    /** 区域库位总数 */
    locationTotal?: number;
    /** 区域空货位数量 */
    emptyLocationTotal?: number;
    /** 区域空货位数量/库位总数 比例 */
    emptyLocationRatio?: number;
    /** 区域满托货位数量 */
    fullContainerLocationTotal?: number;
    /** 区域满托货位数量/库位总数 比例 */
    fullContainerLocationRatio?: number;
    /** 区域空托货位数量 */
    emptyContainerLocationTotal?: number;
    /** 区域空托货位数量/库位总数 比例 */
    emptyContainerLocationRatio?: number;
  };

  type AreaLocationSummaryDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: AreaLocationSummaryDTO[];
    statusCode?: EnumStatusCode;
  };

  type BooleanR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: boolean;
    statusCode?: EnumStatusCode;
  };

  type BooleanWCSResponseResult = {
    /** 接口执行结果是否成功（200代表执行成功） */
    status?: number;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: boolean;
    /** 是否还有后续任务，WCS以此判断是否释放当前小车空闲 */
    isNextTask?: boolean;
  };

  type ByteArrayR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: string;
    statusCode?: EnumStatusCode;
  };

  type CanvasAreaInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 画布配置ID */
    canvasId?: number;
    /** 起始X轴 */
    fromXaxis?: number;
    /** 目标X轴 */
    toXaxis?: number;
    /** 起始Y轴 */
    fromYaxis?: number;
    /** 目标Y轴 */
    toYaxis?: number;
    /** 颜色（无色为不可见、货位初始颜色、巷道初始颜色） */
    canvasAreaBgColor?: string;
    canvasAreaType?: EnumCanvasAreaType;
    /** 类型为巷道时记录对应巷道的ID */
    tunnelId?: number;
    /** 画布货位布局方向，1-X轴坐标为排，0-Y轴坐标为排 */
    isColumn?: boolean;
  };

  type CanvasInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 画布代码 */
    canvasCode?: string;
    canvasType?: EnumCanvasType;
    /** X轴货格数 */
    xaxisLength?: number;
    /** Y轴货格数 */
    yaxisLength?: number;
    /** 是否默认画布 */
    isDefault?: boolean;
    displayType?: EnumDisplayType;
  };

  type CompletedTaskSummaryDTO = {
    /** 当天完成任务数 */
    dailyTotal?: number;
    /** 累计完成任务数 */
    grandTotal?: number;
  };

  type CompletedTaskSummaryDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: CompletedTaskSummaryDTO;
    statusCode?: EnumStatusCode;
  };

  type ContactsInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 客户/供应商编码 */
    contactCode?: string;
    /** 客户/供应商名称 */
    contactName?: string;
    /** 是否供应商:1-是,0-否 */
    isSupplier?: boolean;
    /** 是否客户:1-是,0-否 */
    isCustomer?: boolean;
    /** 机构名称 */
    organizationName?: string;
    /** 电话号码 */
    phoneNumber?: string;
    /** 电子邮件 */
    email?: string;
    /** 通讯地址 */
    address?: string;
    /** 描述信息 */
    contactDescription?: string;
  };

  type ContainerInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 容器类型ID */
    containerTypeId?: number;
    carryStatus?: EnumCarryStatus;
    /** 容器数量,码垛后数量 */
    containerQuantity?: number;
    /** 容器位置ID */
    locationId?: number;
    /** 是否启用 */
    isEnable?: boolean;
  };

  type ContainerInventoryDTO = {
    /** 容器ID */
    id?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 容器类型ID */
    containerTypeId?: number;
    /** 容器类型 */
    containerTypeName?: string;
    carryStatus?: EnumCarryStatus;
    /** 数量 */
    containerQuantity?: number;
    /** 容器位置ID */
    locationId?: number;
    /** 容器位置编号 */
    locationCode?: string;
    /** 容器位置自定义编号 */
    customCode?: string;
    /** 所属区域ID */
    areaId?: number;
    /** 区域编号 */
    areaCode?: string;
    /** 区域名称 */
    areaName?: string;
  };

  type ContainerInventoryDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: ContainerInventoryDTO[];
  };

  type ContainerInventoryDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: ContainerInventoryDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type ContainerSummaryDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 容器编号 */
    containerCode?: string;
    carryStatus?: EnumCarryStatus;
    /** 容器数量,码垛后数量 */
    containerQuantity?: number;
    /** 库存总数 */
    inventoryTotal?: number;
    /** 已分配总数 */
    allotTotal?: number;
  };

  type ContainerTypeInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 容器类型名称 */
    name?: string;
    /** 是否虚拟容器 */
    isVirtual?: boolean;
    /** 是否有容器条码（标识） */
    isHaveBarcode?: boolean;
    /** 容器条码规则（正则表达式） */
    barcodeRule?: string;
    /** 容器条码规则-最小长度 */
    barcodeMinLength?: number;
    /** 容器条码规则-最大长度 */
    barcodeMaxLength?: number;
    /** 容器尺寸-长度 */
    sizeLength?: number;
    /** 容器尺寸-宽度 */
    sizeWidth?: number;
    /** 容器尺寸-高度 */
    sizeHeight?: number;
    /** 组盘-是否允许物料在容器中混放 */
    allowMixed?: boolean;
    /** 容器分格-总数 */
    cellNumber?: number;
    /** 容器分格-行数 */
    cellRow?: number;
    /** 容器分格-列数 */
    cellColumn?: number;
    /** 组盘-容器分格-单格是否允许物料混放 */
    cellAllowMixed?: boolean;
    /** 图标-空托图标 */
    emptyIco?: string;
    /** 图标-满托图标 */
    fullIco?: string;
    /** 图标-半满图标 */
    halfFullIco?: string;
    /** 图标-空垛图标 */
    emptyStackIco?: string;
    /** 是否启用 */
    isEnable?: boolean;
  };

  type CurrentInventorySummaryDTO = {
    /** 当前任务数量 */
    taskTotal?: number;
    /** 满托盘数量 */
    fullContainerTotal?: number;
    /** 空托盘数量 */
    emptyContainerTotal?: number;
  };

  type CurrentInventorySummaryDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: CurrentInventorySummaryDTO;
    statusCode?: EnumStatusCode;
  };

  type CurrentLocationSummaryDTO = {
    /** 库位总数 */
    locationTotal?: number;
    /** 空货位数量 */
    emptyLocationTotal?: number;
    /** 空货位数量/库位总数 比例 */
    emptyLocationRatio?: number;
    /** 满托货位数量 */
    fullContainerLocationTotal?: number;
    /** 满托货位数量/库位总数 比例 */
    fullContainerLocationRatio?: number;
    /** 空托货位数量 */
    emptyContainerLocationTotal?: number;
    /** 空托货位数量/库位总数 比例 */
    emptyContainerLocationRatio?: number;
  };

  type CurrentLocationSummaryDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: CurrentLocationSummaryDTO;
    statusCode?: EnumStatusCode;
  };

  type CurrentTaskSummaryDTO = {
    /** 当前执行总任务 */
    total?: number;
    /** 当前入库任务数 */
    inTotal?: number;
    /** 当前出库任务数 */
    outTotal?: number;
    /** 当前越库任务数 */
    crossTotal?: number;
    /** 当前移库任务数 */
    moveTotal?: number;
  };

  type CurrentTaskSummaryDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: CurrentTaskSummaryDTO;
    statusCode?: EnumStatusCode;
  };

  type CustomAreaDTO = {
    /** ID */
    id?: string;
    /** 区域名称 */
    name?: string;
    /** x轴起始点 */
    fromXaxis?: number;
    /** x轴目标点 */
    toXaxis?: number;
    /** y轴起始点 */
    fromYaxis?: number;
    /** y轴目标点 */
    toYaxis?: number;
  };

  type CustomAreaDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: CustomAreaDTO[];
    statusCode?: EnumStatusCode;
  };

  type DailyTaskSummaryDTO = {
    /** 入库任务数量 */
    inTotal?: number;
    /** 出库任务数量 */
    outTotal?: number;
    /** 越库任务数量 */
    crossTotal?: number;
    /** 移库任务数量 */
    moveTotal?: number;
    /** 取消任务数量 */
    cancelTotal?: number;
  };

  type DailyTaskSummaryDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: DailyTaskSummaryDTO;
    statusCode?: EnumStatusCode;
  };

  type DailyWorkbenchTaskSummaryDTO = {
    /** 工作站ID */
    id?: string;
    /** 工作站货位号 */
    locationCode?: string;
    /** 工作站名称 */
    workbenchName?: string;
    /** 起点的任务数量 */
    fromTaskTotal?: number;
    /** 终点的任务数量 */
    toTaskTotal?: number;
  };

  type DailyWorkbenchTaskSummaryDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: DailyWorkbenchTaskSummaryDTO[];
    statusCode?: EnumStatusCode;
  };

  type deleteApiAreaDeleteParams = {
    /** 区域ID */
    id?: number;
  };

  type deleteApiCanvasAreaDeleteParams = {
    /** 画布区域ID */
    id?: number;
  };

  type deleteApiCanvasDeleteParams = {
    /** 画布ID */
    id?: number;
  };

  type deleteApiContactsDeleteParams = {
    /** 客户/供应商 ID */
    id?: number;
  };

  type deleteApiContainerDeleteParams = {
    /** 容器档案ID */
    id?: number;
  };

  type deleteApiContainerTypeDeleteParams = {
    /** 容器类型ID */
    id?: number;
  };

  type deleteApiDictionaryDeleteDictionaryParams = {
    /** 字典ID */
    id?: number;
  };

  type deleteApiDictionaryDeleteDictionaryValueParams = {
    id?: number;
  };

  type deleteApiMaterialDeleteParams = {
    /** 物料信息ID */
    id?: number;
  };

  type deleteApiMaterialItemDeleteParams = {
    /** 物料档案ID */
    id?: number;
  };

  type deleteApiMaterialPackagingDeleteParams = {
    /** 物料包装ID */
    id?: number;
  };

  type deleteApiMenuDeleteFunctionParams = {
    id?: number;
  };

  type deleteApiMenuDeleteMenuParams = {
    id?: number;
  };

  type deleteApiPermissionDeletePermissionInfoParams = {
    id?: number;
  };

  type deleteApiRoleDeleteParams = {
    id?: number;
  };

  type deleteApiRoutingDeleteParams = {
    /** 路径ID */
    id?: number;
  };

  type deleteApiTunnelDeleteParams = {
    /** 巷道ID */
    id?: number;
  };

  type deleteApiUserDeleteParams = {
    id?: number;
  };

  type deleteApiWarehouseDeleteParams = {
    /** 仓库ID */
    id?: number;
  };

  type DictionaryInfo = {
    id?: number;
    parentId?: number;
    dictionaryName?: string;
    businessType?: EnumBusinessType;
    dictionaryValueType?: string;
    dictionaryRemark?: string;
    sortBy?: number;
    isDeleted?: boolean;
  };

  type DictionaryInfoDTO = {
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

  type DictionaryInfoR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: DictionaryInfo;
    statusCode?: EnumStatusCode;
  };

  type DictionaryValueInfo = {
    id?: number;
    dictionaryId?: number;
    dictionaryValue?: string;
    valueLabel?: string;
    isDefault?: boolean;
    isSystem?: boolean;
    dictionaryValueRemark?: string;
    sortBy?: number;
    isDeleted?: boolean;
  };

  type DictionaryValueInfoDTO = {
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

  type DictionaryValueInfoR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: DictionaryValueInfo;
    statusCode?: EnumStatusCode;
  };

  type Enum3DLocationStatus = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  type EnumAllotLocationProcessType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

  type EnumAllotLocationSortMode = 1 | 2 | 3 | 4 | 5 | 6;

  type EnumAreaState = 0 | 1;

  type EnumAreaType = 1 | 2;

  type EnumAuditStatus = 0 | 1 | 2 | 3;

  type EnumAutoAllocationStatus = 1 | 2 | 3 | 4 | 5;

  type EnumBusinessType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

  type EnumCanvasAreaType = 1 | 2 | 3 | 4;

  type EnumCanvasType = 1 | 2 | 3;

  type EnumCarryStatus = 0 | 1 | 2 | 3 | 4;

  type EnumCombineOption = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  type EnumDisplayType = 1 | 2;

  type EnumInboundType = 1 | 2 | 3;

  type EnumInventoryJournalType = 1 | 2 | 3 | 4;

  type EnumInvoiceStatus = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  type EnumLocationStatus = 1 | 2 | 3 | 4 | 5 | 6;

  type EnumOutboundRequirementType = 1 | 2 | 3;

  type EnumParamType = 1 | 2 | 3 | 4;

  type EnumPositionType = 1 | 2 | 3;

  type EnumPostStatus = 1 | 2 | 3;

  type EnumQualityStatus = 1 | 2 | 3;

  type EnumQualityTestStatus = 1 | 2 | 3 | 4 | 5;

  type EnumReceiptStatus = 1 | 2 | 3 | 4 | 5 | 6;

  type EnumRequirementStatus = 1 | 2 | 3 | 4 | 5;

  type EnumSex = 1 | 2;

  type EnumShelvesType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

  type EnumSortType = 1 | 2;

  type EnumStatusCode = 0 | 200 | 400 | 401 | 404 | 408 | 500 | 600 | 610 | 700 | 800;

  type EnumStocktakeRecordStatus = 0 | 1 | 2;

  type EnumStocktakeStatus = 1 | 2 | 3 | 4 | 5;

  type EnumStocktakeType = 1 | 2 | 3 | 4;

  type EnumSysReceivingBusinessType = 1 | 2 | 3 | 4 | 5 | 6;

  type EnumTaskAlarmType = 0 | 1 | 2 | 3;

  type EnumTaskExecuteType = 1 | 2 | 3;

  type EnumTaskStatus = 1 | 2 | 3 | 4 | 5 | 6;

  type EnumTaskType = 1 | 2 | 3 | 4;

  type EnumUnbindingType = 1 | 2;

  type EnumWavenumberStatus = 1 | 2 | 3 | 4 | 5 | 6;

  type FunctionInfoDTO = {
    /** 主键，雪花ID，新增为0，修改为确定的功能ID */
    id?: number;
    /** 所属菜单ID，从菜单数据选好，必选 */
    menuId?: number;
    /** 功能名称 */
    functionName?: string;
    /** 功能标题 */
    functionTitle?: string;
    /** 功能图标 */
    functionIcon?: string;
    /** 功能执行动作 */
    functionAction?: string;
    /** 功能排序 */
    functionSort?: number;
  };

  type getApiAreaGetAreaByIdParams = {
    /** 区域ID */
    id?: number;
  };

  type getApiAreaGetAreaSelectItemListParams = {
    /** 区域类型：不传值返回所有，1-货位，2-工位 */
    areaType?: EnumAreaType;
  };

  type getApiAuthForceUserLogoffParams = {
    userId?: number;
  };

  type getApiCanvas3DGetAreaListParams = {
    /** 画布ID */
    canvasId?: number;
  };

  type getApiCanvas3DGetLocationDetailByIdParams = {
    /** 库位ID */
    id?: number;
  };

  type getApiCanvasAreaGetByCanvasCodeParams = {
    /** 画布编号 */
    canvasCode?: string;
  };

  type getApiCanvasAreaGetByIdParams = {
    /** 画布区域ID */
    id?: number;
  };

  type getApiCanvasGetByIdParams = {
    /** 画布Id */
    id?: number;
  };

  type getApiContainerGetByCodeParams = {
    /** 容器编码 */
    code?: string;
  };

  type getApiContainerGetByIdParams = {
    /** 容器档案ID */
    id?: number;
  };

  type getApiContainerTypeGetByIdParams = {
    /** 容器类型ID */
    id?: number;
  };

  type getApiDailyGetReportInventoryDailyListParams = {
    /** 报表日期 */
    reportDate?: string;
  };

  type getApiDailyGetReportLocationDailyListParams = {
    /** 报表日期 */
    reportDate?: string;
  };

  type getApiDailyGetReportTaskDailyListParams = {
    /** 报表日期 */
    reportDate?: string;
  };

  type getApiDictionaryGetDictionaryByIdParams = {
    /** 字典id */
    id?: number;
  };

  type getApiDictionaryGetDictionaryValueByIdParams = {
    /** 字典值ID */
    id?: number;
  };

  type getApiDictionaryGetDictionaryValueListByBzTypeParams = {
    /** 字典业务类型 */
    bzType?: EnumBusinessType;
  };

  type getApiDictionaryGetDictionaryValueListByIdParams = {
    /** 字典Id */
    dictionaryId?: number;
  };

  type getApiDictionaryGetDictionaryValueListByNameParams = {
    /** 字典名称 */
    dictionaryName?: string;
  };

  type getApiEnumGetSelectItemListParams = {
    /** 枚举名称 */
    enumName?: string;
  };

  type getApiHomeGetLocationDetailByIdParams = {
    id?: number;
  };

  type getApiHomeInStockApplyParams = {
    /** 申请入库起始位置 */
    fromLocationCode?: string;
    /** 托盘条码,可空,如果不传值则不校验起始位置上的托盘条码 */
    containerCode?: string;
  };

  type getApiInvoiceHeaderActiveParams = {
    id?: number;
  };

  type getApiInvoiceHeaderCancelParams = {
    /** 发货单ID */
    id?: number;
  };

  type getApiInvoiceHeaderCreateCarryTaskParams = {
    /** 分配明细Id */
    allocationId?: number;
    /** 目标库位 */
    targetLocation?: string;
  };

  type getApiInvoiceHeaderGetAllocatedListParams = {
    /** 发货单明细ID */
    lineId?: number;
  };

  type getApiInvoiceHeaderGetContainerInventoryParams = {
    /** 拣选出库位置 */
    locationCode?: string;
    /** 发货单号 */
    invoiceCode?: string;
  };

  type getApiInvoiceHeaderGetInventoryListParams = {
    /** 发货单明细ID */
    lineId?: number;
  };

  type getApiInvoiceHeaderInStockApplyParams = {
    /** 申请入库起始位置 */
    fromLocationCode?: string;
    /** 托盘条码,可空,如果不传值则不校验起始位置上的托盘条码 */
    containerCode?: string;
    locationId?: string;
    containerTypeId?: string;
  };

  type getCombineInStockParams = {
    /** 申请入库起始位置 */
    fromLocationCode: string;
    /** 物料编码 */
    matreialCode: string;
  };

  type getApiInvoiceHeaderManualFinishParams = {
    id?: number;
  };

  type getApiInvoiceHeaderSuggestInventoryListParams = {
    /** 发货单明细ID */
    lineId?: number;
  };

  type getApiLocationGetAreaLocationListParams = {
    /** 区域类型1:货位，2:工位 */
    areaType?: EnumAreaType;
    /** 区域ID */
    areaId?: number;
  };

  type getApiLocationGetByIdParams = {
    id?: number;
  };

  type getApiLocationGetLocationByAreaIdParams = {
    /** 区域ID */
    areaId?: number;
  };

  type getApiLocationGetRowInfoByAreaParams = {
    /** 用户排编号 */
    canvasRow?: number;
  };

  type getApiLocationTypeGetByIdParams = {
    /** 货位类型ID */
    id?: number;
  };

  type getApiMaterialGetByCodeParams = {
    /** 物料编码 */
    code?: string;
  };

  type getApiOutboundRequirementAutomaticAllocationInQueneParams = {
    /** 出库需求ID */
    requirementId?: number;
  };

  type getApiOutboundRequirementGetAllocationItemListParams = {
    /** 出库需求ID */
    requirementId?: number;
  };

  type getApiOutboundRequirementGetWaitAllocationItemListParams = {
    /** 出库需求ID */
    requirementId?: number;
  };

  type getApiOutboundRequirementOutboundCancelParams = {
    /** 出库需求ID */
    requirementId?: number;
  };

  type getApiOutboundRequirementOutboundConfirmParams = {
    /** 出库需求ID */
    requirementId?: number;
  };

  type getApiOutboundRequirementOutboundExecuteParams = {
    /** 出库需求ID */
    requirementId?: number;
  };

  type getApiPermissionGetPermissionByIdParams = {
    id?: number;
  };

  type getApiPrintLabelPrintLocationLabelParams = {
    /** 库位ID */
    id?: number;
    /** 打印的标签数量 */
    count?: number;
  };

  type getApiPrintLabelPrintMaterialLabelParams = {
    /** 物料档案 */
    id?: number;
    /** 打印的标签数量 */
    count?: number;
  };

  type getApiPrintLabelPrintReceiptLineLabelParams = {
    /** 收货单行ID */
    id?: number;
    /** 打印的标签数量 */
    count?: number;
  };

  type getApiPrintLabelSendPrintMessageParams = {
    message?: string;
  };

  type getApiQualityTestAllotQualityTestParams = {
    /** 质检单号 */
    qualityTestCode?: string;
  };

  type getApiQualityTestCancelQualityTestParams = {
    /** 质检单号 */
    qualityTestCode?: string;
  };

  type getApiQualityTestChangeQualityStatusParams = {
    /** 质检单号 */
    qualityTestCode?: string;
    /** 质检结果 */
    qualityStatus?: EnumQualityStatus;
  };

  type getApiQualityTestCompleteQualityTestParams = {
    /** 质检单号 */
    qualityTestCode?: string;
    /** 完成备注 */
    qualityTestRemark?: string;
  };

  type getApiQualityTestExecuteQualityTestParams = {
    /** 质检单号 */
    qualityTestCode?: string;
  };

  type getApiQualityTestGetQualityTestInfoParams = {
    /** 质检单号 */
    qualityTestCode?: string;
  };

  type getApiQualityTestGetQualityTestRecordListParams = {
    /** 质检单号 */
    qualityTestCode?: string;
  };

  type getApiQualityTestGettSamplingContainerDetailParams = {
    /** 质检单 */
    qualityTestCode?: string;
    /** 工作台位置编号 */
    locationCode?: string;
    /** 容器编号 */
    containerCode?: string;
  };

  type getApiQualityTestOutboundQualityTestParams = {
    /** 质检单号 */
    qualityTestCode?: string;
    /** 质检工位位置编号 */
    locationCode?: string;
    /** 容器编号（没有传空字符串） */
    containerCode?: string;
  };

  type getApiQualityTestOutboundQualityTestWithQuantityParams = {
    /** 质检单号 */
    qualityTestCode?: string;
    /** 质检工位位置编号 */
    locationCode?: string;
    /** 容器编号（没有传空字符串） */
    containerCode?: string;
    /** 抽检出库数量 */
    quantity?: number;
  };

  type getApiReceiptHeaderActiveParams = {
    /** 收货单Id */
    id?: number;
  };

  type getApiReceiptHeaderCancelParams = {
    id?: number;
  };

  type getApiReceiptHeaderManualFinishParams = {
    /** 收货单Id */
    id?: number;
  };

  type getApiRoutingGetRoutingByIdParams = {
    /** 路径ID */
    id?: number;
  };

  type getApiStocktakeActivateStocktakeParams = {
    /** 盘点计划ID */
    id?: number;
  };

  type getApiStocktakeAdjustedStocktakeParams = {
    /** 盘点计划ID */
    id?: number;
  };

  type getApiStocktakeCancelStocktakeParams = {
    /** 盘点计划ID */
    id?: number;
  };

  type getApiStocktakeCompleteStocktakeParams = {
    /** 盘点计划ID */
    id?: number;
  };

  type getApiStocktakeCreateCarryTaskParams = {
    /** 盘点库位ID */
    id?: number;
    /** 目标位置 */
    targetLocation?: string;
  };

  type getApiStocktakeGetAdjustedStocktakeParams = {
    /** 盘点计划ID */
    id?: number;
  };

  type getApiStocktakeGetStocktakeDetailParams = {
    /** 盘点计划ID */
    id?: number;
  };

  type getApiStocktakeInStockApplyParams = {
    /** 申请入库起始位置 */
    fromLocationCode?: string;
    /** 托盘条码,可空,如果不传值则不校验起始位置上的托盘条码 */
    containerCode?: string;
  };

  type getApiStocktakeSetStocktakeExceptionParams = {
    /** 盘点计划号 */
    stocktakeCode?: string;
    /** 盘点位置号 */
    locationCode?: string;
    /** 容器编号,如果容器类型没有容器编号，传空字符串 */
    containerCode?: string;
  };

  type getApiStorageInStockApplyParams = {
    /** 申请入库起始位置 */
    fromLocationCode?: string;
    /** 托盘条码,可空,如果不传值则不校验起始位置上的托盘条码 */
    containerCode?: string;
  };

  type getApiStorageMoveParams = {
    /** 起始位置编号 */
    fromLocation?: string;
    /** 目标位置编号 */
    toLocation?: string;
    /** 容器编号 */
    containerCode?: string;
    /** 是否自动搬运 */
    isAutoCarry?: boolean;
  };

  type getApiStorageOutStockConfirmParams = {
    /** 出库位置 */
    locationCode?: string;
    /** 容器编号，可空 */
    containerCode?: string;
  };

  type getApiSysConfigGetBarcodeParams = {
    /** 编码字符串 */
    codeStr?: string;
    /** 宽 */
    width?: number;
    /** 高 */
    height?: number;
  };

  type getApiSysConfigGetQrCodeParams = {
    /** 编码字符串 */
    codeStr?: string;
    /** 宽 */
    width?: number;
    /** 高 */
    height?: number;
  };

  type getApiSysConfigWmsDbAppendTableParams = {
    /** 授权密钥 */
    initKey?: string;
  };

  type getApiSysConfigWmsDbInitParams = {
    /** 授权密钥 */
    initKey?: string;
  };

  type getApiTaskUpdatePostStatusParams = {
    /** 任务id */
    taskId?: number;
  };

  type getApiUserGetUserInfoByIdParams = {
    id?: number;
  };

  type getApiWarehouseGetWarehouseByIdParams = {
    /** 仓库ID */
    id?: number;
  };

  type getApiWaveHeaderGetWavenumberDetailParams = {
    /** 波次单Id */
    id?: number;
  };

  type getApiWaveLineGetReceiptLineByOrderNoParams = {
    waveCdoe?: string;
  };

  type getOpenapiLayoutGetAreaListParams = {
    maxId?: number;
  };

  type getOpenapiLayoutGetLocationListParams = {
    maxId?: number;
  };

  type getOpenapiLayoutGetTunnelListParams = {
    maxId?: number;
  };

  type getOpenapiLayoutGetWarehouseListParams = {
    maxId?: number;
  };

  type getOpenapiTaskGetTaskListParams = {
    /** 最大Id,小于等于0时获取全部 */
    maxId?: number;
    /** 返回任务数量，小于等于0时返回全部 */
    takeCount?: number;
  };

  type getPadCarryTaskCancelParams = {
    /** 任务ID */
    taskId?: number;
  };

  type getPadCarryTaskMoveParams = {
    /** 起始位置编号 */
    fromLocation?: string;
    /** 目标位置编号 */
    toLocation?: string;
    /** 是否自动搬运 */
    isAutoCarry?: boolean;
  };

  type getPadContainerInventoryEmptyTrayInApplyParams = {
    /** 申请入库位置编号 */
    locationCode?: string;
    /** 载具编号 */
    trayCode?: string;
  };

  type getPadContainerInventoryEmptyTrayOutApplyParams = {
    /** 呼叫位置编号 */
    locationCode?: string;
    /** 托盘类型ID */
    trayTypeId?: number;
  };

  type getPadInboundInStockApplyParams = {
    /** 申请入库起始位置 */
    fromLocationCode?: string;
    /** 托盘条码,可空,如果不传值则不校验起始位置上的托盘条码 */
    containerCode?: string;
  };

  type getPadIndexGetLocationDetailByIdParams = {
    id?: number;
  };

  type getPadIndexInStockApplyParams = {
    /** 申请入库起始位置 */
    fromLocationCode?: string;
    /** 托盘条码,可空,如果不传值则不校验起始位置上的托盘条码 */
    containerCode?: string;
  };

  type getPadOutboundCreateCarryTaskParams = {
    /** 分配明细Id */
    allocationId?: number;
    /** 目标库位 */
    targetLocation?: string;
  };

  type getPadOutboundGetAllocatedListParams = {
    /** 发货单明细ID */
    lineId?: number;
  };

  type getPadOutboundGetContainerInventoryParams = {
    /** 拣选出库位置 */
    locationCode?: string;
    /** 发货单号 */
    invoiceCode?: string;
  };

  type getPadOutboundGetInventoryListParams = {
    /** 发货单明细ID */
    lineId?: number;
  };

  type getPadOutboundInStockApplyParams = {
    /** 申请入库起始位置 */
    fromLocationCode?: string;
    /** 托盘条码,可空,如果不传值则不校验起始位置上的托盘条码 */
    containerCode?: string;
  };

  type getPadOutboundRequirementGetOutboundDetailsParams = {
    /** 出库需求号 */
    requirementCode?: string;
  };

  type getPadOutboundRequirementGetOutboundRequirementInfoParams = {
    /** 出库需求号 */
    requirementCode?: string;
    /** 物料号 */
    materialCode?: string;
  };

  type getPadOutboundSuggestInventoryListParams = {
    /** 发货单明细ID */
    lineId?: number;
  };

  type getPadStocktakeAdjustedStocktakeParams = {
    /** 盘点计划ID */
    id?: number;
  };

  type getPadStocktakeCreateCarryTaskParams = {
    /** 盘点库位ID */
    id?: number;
    /** 目标位置 */
    targetLocation?: string;
  };

  type getPadStocktakeGetAdjustedStocktakeParams = {
    /** 盘点计划ID */
    id?: number;
  };

  type getPadStocktakeGetStocktakeRecordByLocationParams = {
    /** 盘点库位ID */
    stocktakeLocationId?: number;
  };

  type getPadStocktakeInStockApplyParams = {
    /** 申请入库起始位置 */
    fromLocationCode?: string;
    /** 托盘条码,可空,如果不传值则不校验起始位置上的托盘条码 */
    containerCode?: string;
  };

  type getPadWaveHeaderGetOutboundDetailsParams = {
    /** 波次单号 */
    wavenumberCode?: string;
  };

  type getPadWaveHeaderGetWavenumberLineInfoParams = {
    /** 波次单号 */
    wavenumberCode?: string;
    /** 物料号 */
    materialCode?: string;
  };

  type getPdaEmptyTrayOutApplyParams = {
    /** 呼叫位置编号 */
    locationCode?: string;
    /** 托盘类型ID */
    trayTypeId?: number;
  };

  type getPdaGetInventoryQuantityParams = {
    /** 盘点位置 */
    locationCode?: string;
    /** 物料编号 */
    materialCode?: string;
    /** 容器编号 */
    containerCode?: string;
  };

  type getPdaGetLocationDetailByCodeParams = {
    locationCode?: string;
  };

  type getPdaGetLocationDetailByIdParams = {
    id?: number;
  };

  type getPdaGetUnfinishInboundByMaterialCodeParams = {
    /** 物料编号 */
    materialCode?: string;
  };

  type getPdaGetUnfinishOutboundByMaterialCodeParams = {
    /** 拣选位置 */
    locationCode?: string;
    /** 物料编号 */
    materialCode?: string;
    /** 容器编号 */
    containerCode?: string;
  };

  type getPdaGetUnfinishStocktakeByMaterialCodeParams = {
    /** 盘点位置 */
    locationCode?: string;
    /** 物料编号 */
    materialCode?: string;
    /** 容器编号 */
    containerCode?: string;
  };

  type getPdaInStockApplyParams = {
    /** 申请入库起始位置 */
    fromLocationCode?: string;
    /** 托盘条码,可空,如果不传值则不校验起始位置上的托盘条码 */
    containerCode?: string;
  };

  type getPdaMoveParams = {
    /** 起始位置编号 */
    fromLocation?: string;
    /** 目标位置编号 */
    toLocation?: string;
    /** 是否自动搬运 */
    isAutoCarry?: boolean;
  };

  type Int32SelectItem = {
    /** 选项ID */
    itemId?: number;
    /** 选项值 */
    itemValue?: string;
    /** 选项名称 */
    itemName?: string;
  };

  type Int32SelectItemListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: Int32SelectItem[];
    statusCode?: EnumStatusCode;
  };

  type InventoryDailyInOutDTO = {
    /** 库存日结报表数据ID */
    id?: string;
    /** 报表日期 */
    reportDate?: string;
    /** 入库物料总数 */
    inTotal?: number;
    /** 出库物料总数 */
    outTotal?: number;
  };

  type InventoryDailyInOutDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: InventoryDailyInOutDTO[];
    statusCode?: EnumStatusCode;
  };

  type InventoryJournalDTO = {
    /** 库存id */
    inventoryId?: number;
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 容器类型ID */
    containerTypeId?: number;
    /** 容器类型 */
    containerTypeName?: string;
    /** 物料ID */
    materialId?: number;
    /** 物料档案ID */
    materialItemId?: number;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料规格 */
    materialSize?: string;
    /** 单位 */
    packagingName?: string;
    qualityStatus?: EnumQualityStatus;
    /** 批次 */
    batchNumber?: string;
    /** 有效期天数 */
    expiresDays?: number;
    journalType?: EnumInventoryJournalType;
    /** 流水ID */
    journalId?: number;
    /** 流水数量，正数入库、盘盈、负数出库、盘亏 */
    changeQuantity?: number;
    /** 创建时间 */
    createTime?: string;
    /** 操作位置编号 */
    locationCode?: string;
    /** 位置编号(自定义) */
    customCode?: string;
  };

  type InventoryJournalDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: InventoryJournalDTO[];
  };

  type InventoryJournalDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: InventoryJournalDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type InventoryQualityStatusDTO = {
    /** 库存ID */
    inventoryId?: number[];
    /** 质量状态 */
    qualityStatus?: number;
  };

  type InventoryQualitySummaryDTO = {
    /** 当前库存总数 */
    inventoryTotal?: number;
    /** 待检库存总数 */
    unCheckedTotal?: number;
    /** 待检百分比 */
    unCheckedRatio?: number;
    /** 良品总数 */
    qualifiedTotal?: number;
    /** 良品百分比 */
    qualifiedRatio?: number;
    /** 不良品总数 */
    unqualifiedTotal?: number;
    /** 不良品百分比 */
    unqualifiedRatio?: number;
  };

  type InventoryQualitySummaryDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: InventoryQualitySummaryDTO;
    statusCode?: EnumStatusCode;
  };

  type InvoiceAllocatedDTO = {
    /** 发货单明细ID */
    invoiceLineId?: number;
    /** 库存ID */
    inventoryId?: number;
    /** 容器ID */
    containerId?: number;
    /** 分配数量 */
    quantity?: number;
  };

  type JournalSummaryDTO = {
    /** 报告起始日期 */
    reportDateFrom?: string;
    /** 报告截止日期 */
    reportDateTo?: string;
    /** 入库数量 */
    inboundQuantity?: number;
    /** 出库数量 */
    outboundQuantity?: number;
    /** 盘盈数量 */
    profitQuantity?: number;
    /** 盘亏数量 */
    lossQuantity?: number;
  };

  type JournalSummaryDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: JournalSummaryDTO;
    statusCode?: EnumStatusCode;
  };

  type LayerNavigationDTO = {
    /** id，等于0表示总览 */
    id?: string;
    /** 层 */
    layer?: number;
    /** 区 */
    areaId?: number;
    /** 显示名称 */
    displayName?: string;
    /** 导航子级 */
    subItemList?: LayerNavigationDTO[];
  };

  type LayerNavigationDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: LayerNavigationDTO[];
    statusCode?: EnumStatusCode;
  };

  type LocationDTO = {
    /** ID */
    id?: string;
    /** 自定义的排 */
    canvasRow?: number;
    /** 自定义的列 */
    canvasColumn?: number;
    /** x轴坐标 */
    xaxis?: number;
    /** y轴坐标 */
    yaxis?: number;
    /** z轴坐标 货位层 */
    zaxis?: number;
    locationStatus?: Enum3DLocationStatus;
    /** 是否工作台 */
    isWorkbench?: boolean;
  };

  type LocationInfoDTO = {
    /** 主键 */
    id?: number;
    /** 货位编号 */
    locationCode?: string;
    /** 货位编号（自定义） */
    customCode?: string;
    /** 所属仓库ID */
    warehouseId?: number;
    /** 所属区域ID */
    areaId?: number;
    /** 区域名称（一位字母一位数字） */
    locationAreaName?: string;
    /** 所属巷道ID */
    tunnelId?: number;
    shelvesType?: EnumShelvesType;
    positionType?: EnumPositionType;
    inboundType?: EnumInboundType;
    /** 货位类型ID */
    locationTypeId?: number;
    /** 报警状态（是否报警）:1-报警、0-正常 */
    isAlarm?: boolean;
    /** 允许入库：1-允许、0-不允许 */
    allowStockIn?: boolean;
    /** 允许出库：1-允许、0-不允许 */
    allowStockOut?: boolean;
    locationStatus?: EnumLocationStatus;
    /** 库位空满状态：1-满、0-空 */
    isFull?: boolean;
    /** 货位排 */
    locationRow?: number;
    /** 货位列 */
    locationColumn?: number;
    /** 货位层 */
    locationLayer?: number;
    /** 货位深 */
    locationDepth?: number;
    /** 是否盘点中：1-盘点中、0-未盘点 */
    isStocktaking?: boolean;
    /** 主界面X轴坐标 */
    mainXaxis?: number;
    /** 主界面Y轴坐标 */
    mainYaxis?: number;
    /** 画布排 */
    canvasRow?: number;
    /** 画布列 */
    canvasColumn?: number;
    /** 出库优先级 */
    outboundPriority?: number;
  };

  type LocationTypeInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 货位类型名称 */
    locationTypeName?: string;
    /** 货位类型描述 */
    locationTypeDescription?: string;
    /** 货位高度(mm) */
    locationHeight?: number;
    /** 货位宽度(mm) */
    locationWidth?: number;
  };

  type LoginModel = {
    /** 登录账号 */
    userName?: string;
    /** 登录密码 */
    password?: string;
  };

  type LoginUserInfo = {
    /** 用户ID */
    id?: string;
    /** 是否管理员 */
    isAdmin?: boolean;
    /** 用户名 */
    userName?: string;
    /** 真实姓名 */
    realName?: string;
    /** 用户头像 */
    avator?: string;
    /** 登录时间 */
    loginTime?: string;
  };

  type LoginUserInfoListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: LoginUserInfo[];
    statusCode?: EnumStatusCode;
  };

  type LookDownViewDTO = {
    /** 显示编号 */
    displayCode?: string;
    /** 仓库ID */
    warehouseId?: string;
    /** 区域ID */
    areaId?: string;
    /** 巷道ID */
    tunnelId?: string;
    /** 排 */
    locationRow?: number;
    /** 列 */
    locationColumn?: number;
    /** 深 */
    currentLocationDepth?: number;
    /** x轴 */
    xaxis?: number;
    /** y轴 */
    yaxis?: number;
    /** 库位总数 */
    locationCount?: number;
    /** 满库位总数 */
    fullLocationCount?: number;
  };

  type LookDownViewDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: LookDownViewDTO[];
    statusCode?: EnumStatusCode;
  };

  type MainCanvasDTO = {
    /** ID */
    id?: number;
    /** 编号 */
    canvasCode?: string;
    /** x轴长 */
    xaxisLength?: number;
    /** y轴长 */
    yaxisLength?: number;
  };

  type MainCanvasDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: MainCanvasDTO;
    statusCode?: EnumStatusCode;
  };

  type ManualFinishTaskDTO = {
    /** 任务ID */
    id?: number;
    /** 放货的目标位置，为空时，取任务的目标位置 */
    targetLocation?: string;
  };

  type MaterialContianerInventoryDTO = {
    /** 物料ID */
    materialId?: number;
    /** 物料档案ID */
    materialItemId?: number;
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 容器类型ID */
    containerTypeId?: number;
    /** 容器类型 */
    containerTypeName?: string;
    positionType?: EnumPositionType;
    /** 位置编号 */
    locationCode?: string;
    /** 位置编号（自动定义） */
    customCode?: string;
    /** 排-列-层 */
    positionAlias?: string;
    /** 区域编号 */
    areaCode?: string;
    /** 区域名称 */
    areaName?: string;
    /** 库存数量 */
    quantity?: number;
  };

  type MaterialInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料类型ID */
    materialTypeId?: number;
    /** 物料型号ID */
    materialModelId?: number;
    /** 物料最小包装 ID */
    skuPackagingId?: number;
    defaultQualityStatus?: EnumQualityStatus;
    /** 规格 */
    materialSize?: string;
    /** 有效期(天数) */
    expiresDays?: number;
    /** 有效期(天数)预警，新加字段 */
    expiresDaysNotice?: number;
    /** 最低库存预警，新加字段 */
    stockMinNotice?: number;
    /** 最高库存预警，新加字段 */
    stockMaxNotice?: number;
    /** 是否有物料标识:1-有,0-没有 */
    hasMaterialSign?: boolean;
    /** 物料标识是否唯一:1-是,0-不是 */
    isUniqueSign?: boolean;
    /** 是否允许混盘:1-允许,0-不允许 */
    isMixedPallet?: boolean;
    /** 描述信息 */
    materialDescription?: string;
  };

  type MaterialInventoryDTO = {
    /** 物料ID */
    materialId?: number;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料规格 */
    materialSize?: string;
    /** 单位 */
    packagingName?: string;
    /** 库存数量 */
    quantity?: number;
    /** 库存明细 */
    inventoryList?: MaterialContianerInventoryDTO[];
  };

  type MaterialInventoryDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: MaterialInventoryDTO[];
    statusCode?: EnumStatusCode;
  };

  type MaterialInventoryDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: MaterialInventoryDTO[];
  };

  type MaterialInventoryDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: MaterialInventoryDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type MaterialInventorySummaryDTO = {
    /** 唯一标识 */
    uid?: string;
    /** 物料ID */
    materialId?: number;
    /** 物料编号 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料规格 */
    materialSize?: string;
    /** 批次号 */
    batchNumber?: string;
    qualityStatus?: EnumQualityStatus;
    /** 库存数 */
    quantity?: number;
  };

  type MaterialInventorySummaryDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: MaterialInventorySummaryDTO[];
    statusCode?: EnumStatusCode;
  };

  type MaterialItemInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 物料档案收货标识 */
    receivingCode?: string;
    /** 物料标识 */
    materialUID?: string;
    /** 物料ID */
    materialId?: number;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料类型ID */
    materialTypeId?: number;
    /** 物料类型名称 */
    materialTypeName?: string;
    /** 物料型号ID */
    materialModelId?: number;
    /** 物料型号名称 */
    materialModelName?: string;
    /** 物料最小包装 ID */
    skuPackagingId?: number;
    /** 规格 */
    materialSize?: string;
    qualityStatus?: EnumQualityStatus;
    /** 有效期(天数) */
    expiresDays?: number;
    /** 收货日期 */
    receivingDate?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 收货区域 */
    areaId?: number;
    /** 收货位置（工作台编号、货位编号） */
    locationCode?: string;
    /** 收货数量 */
    quantity?: number;
    /** 供应商ID,ContactsInfo表主键 */
    supplierId?: number;
    /** 收货单号 */
    receiptCode?: string;
    /** 收货单行号 */
    receiptLineNumber?: string;
    /** 收货单行ID */
    receiptLineId?: number;
    /** 描述信息 */
    materialItemDescription?: string;
  };

  type MaterialPackagingInfo = {
    id?: number;
    packagingCode?: string;
    packagingName?: string;
    isSkuPackaging?: boolean;
    unitQuantity?: number;
    packagingDescription?: string;
    isDeleted?: boolean;
  };

  type MaterialPackagingInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 包装编码 */
    packagingCode?: string;
    /** 包装名称（单位名称） */
    packagingName?: string;
    /** 是否最小包装 */
    isSkuPackaging?: boolean;
    /** 单位数量 */
    unitQuantity?: number;
    /** 描述信息 */
    packagingDescription?: string;
  };

  type MaterialPackagingInfoPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: MaterialPackagingInfo[];
  };

  type MaterialPackagingInfoPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: MaterialPackagingInfoPageResult;
    statusCode?: EnumStatusCode;
  };

  type MenuInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 父级菜单ID,为0时是菜单根节点 */
    parentId?: number;
    /** 所属系统编号 */
    systemCode?: string;
    /** 菜单名称 */
    menuName?: string;
    /** 菜单标题 */
    menuTitle?: string;
    /** vue组件名称 */
    vueComponent?: string;
    /** 菜单（页面）地址 */
    menuUrl?: string;
    /** 菜单图标 */
    menuIcon?: string;
    /** 菜单排序 */
    menuSort?: number;
    /** 多语言标识 */
    menuLanguageSign?: string;
    /** 功能权限 */
    functionList?: FunctionInfoDTO[];
  };

  type NoticeDTO = {
    /** 消息内容 */
    message?: string;
    /** 通知类型（1、通知  2、警告） */
    type?: number;
  };

  type NoticeDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: NoticeDTO[];
    statusCode?: EnumStatusCode;
  };

  type OperateTask = {
    /** 任务Id */
    id?: number;
    taskStatus?: EnumTaskStatus;
  };

  type OperateWaveOrderDTO = {
    /** 单据Id */
    id?: number;
  };

  type OutboundRequirementInfoDTO = {
    /** 物料Id */
    materialId?: number;
    /** 物料型号Id */
    materialModelId?: number;
    /** 规格 */
    materialSize?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 物料数量 */
    quantity?: number;
    /** 出库区域 */
    outboundAreaId?: number;
    qualityStatus?: EnumQualityStatus;
  };

  type OutputAllocationItemInfoDTO = {
    /** 主键ID */
    id?: number;
    /** 出库需求ID */
    outboundRequirementId?: number;
    /** 库存ID */
    inventoryId?: number;
    /** 已分配数量 */
    quantity?: number;
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 库位ID/工作台ID */
    locationId?: number;
    /** 容器库位编码 */
    locationCode?: string;
    /** 库位编码（自动义） */
    customCode?: string;
    /** 容器所处区域 */
    areaId?: number;
    /** 容器所处区域编号 */
    areaCode?: string;
    /** 容器所处区域 */
    areaName?: string;
    qualityStatus?: EnumQualityStatus;
    /** 物料编码 */
    materialCode?: string;
    /** 收货日期 */
    receivingDate?: string;
    /** 是否拣选完成 */
    isPickingFinish?: boolean;
    /** 拣选数量 */
    pickingQuantity?: number;
    /** 是否取消 */
    isCancel?: boolean;
  };

  type OutputAllocationItemInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputAllocationItemInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputAreaInfoDTO = {
    /** 主键 */
    id?: string;
    /** 区域名称 */
    areaCode?: string;
    /** 区域别名 */
    areaName?: string;
    /** 所属仓库id */
    warehouseId?: string;
    /** 所属仓库名字 */
    warehouseName?: string;
    areaType?: EnumAreaType;
    allotLocationProcessType?: EnumAllotLocationProcessType;
    areaState?: EnumAreaState;
    /** 区域描述 */
    areaDescribe?: string;
  };

  type OutputAreaInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputAreaInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputAreaInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputAreaInfoDTO[];
  };

  type OutputAreaInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputAreaInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputAreaInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputAreaInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputAreaTileDTO = {
    /** 区域id */
    id?: number;
    /** 画布Id */
    canvasId?: number;
    /** 画布代码 */
    canvasCode?: string;
    /** 显示名称（巷道名、自定义区域名） */
    displayName?: string;
    /** 起始X轴 */
    fromXaxis?: number;
    /** 目标X轴 */
    toXaxis?: number;
    /** 起始Y轴 */
    fromYaxis?: number;
    /** 目标Y轴 */
    toYaxis?: number;
    /** 画布货位布局方向，1-X轴坐标为排，0-Y轴坐标为排 */
    isColumn?: boolean;
    canvasAreaType?: EnumCanvasAreaType;
  };

  type OutputCanvasAreaDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 画布配置ID */
    canvasId?: string;
    /** 画布配置编码 */
    canvasCode?: string;
    /** 起始X轴 */
    fromXaxis?: number;
    /** 目标X轴 */
    toXaxis?: number;
    /** 起始Y轴 */
    fromYaxis?: number;
    /** 目标Y轴 */
    toYaxis?: number;
    canvasAreaType?: EnumCanvasAreaType;
    /** 类型为巷道时记录对应巷道的ID */
    tunnelId?: string;
    /** 巷道编码 */
    tunnelCode?: string;
    /** 巷道名称 */
    tunnelName?: string;
    /** 画布货位布局方向，1-X轴坐标为排，0-Y轴坐标为排 */
    isColumn?: boolean;
    /** 颜色（无色为不可见、货位初始颜色、巷道初始颜色） */
    locationList?: AreaLocation[];
  };

  type OutputCanvasAreaDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputCanvasAreaDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputCanvasAreaInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 画布配置ID */
    canvasId?: string;
    /** 画布代码 */
    canvasCode?: string;
    /** 起始X轴 */
    fromXaxis?: number;
    /** 目标X轴 */
    toXaxis?: number;
    /** 起始Y轴 */
    fromYaxis?: number;
    /** 目标Y轴 */
    toYaxis?: number;
    /** 颜色（无色为不可见、货位初始颜色、巷道初始颜色） */
    canvasAreaBgColor?: string;
    canvasAreaType?: EnumCanvasAreaType;
    /** 类型为巷道时记录对应巷道的ID */
    tunnelId?: string;
    /** 巷道编码 */
    tunnelCode?: string;
    /** 巷道名称 */
    tunnelName?: string;
    /** 画布货位布局方向，1-X轴坐标为排，0-Y轴坐标为排 */
    isColumn?: boolean;
  };

  type OutputCanvasAreaInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputCanvasAreaInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputCanvasAreaInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputCanvasAreaInfoDTO[];
  };

  type OutputCanvasAreaInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputCanvasAreaInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputCanvasAreaInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputCanvasAreaInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputCanvasInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 画布代码 */
    canvasCode?: string;
    canvasType?: EnumCanvasType;
    /** X轴货格数 */
    xaxisLength?: number;
    /** Y轴货格数 */
    yaxisLength?: number;
    /** 是否默认画布 */
    isDefault?: boolean;
    displayType?: EnumDisplayType;
  };

  type OutputCanvasInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputCanvasInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputCanvasInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputCanvasInfoDTO[];
  };

  type OutputCanvasInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputCanvasInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputCanvasInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputCanvasInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputContactsInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 客户/供应商编码 */
    contactCode?: string;
    /** 客户/供应商名称 */
    contactName?: string;
    /** 是否供应商:1-是,0-否 */
    isSupplier?: boolean;
    /** 是否客户:1-是,0-否 */
    isCustomer?: boolean;
    /** 机构名称 */
    organizationName?: string;
    /** 电话号码 */
    phoneNumber?: string;
    /** 电子邮件 */
    email?: string;
    /** 通讯地址 */
    address?: string;
    /** 描述信息 */
    contactDescription?: string;
    /** 是否删除:1-已删除、0-未删除 */
    isDeleted?: boolean;
  };

  type OutputContactsInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputContactsInfoDTO[];
  };

  type OutputContactsInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputContactsInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputContainerInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 容器编号 */
    containerCode?: string;
    /** 容器类型ID */
    containerTypeId?: string;
    carryStatus?: EnumCarryStatus;
    /** 容器数量,码垛后数量 */
    containerQuantity?: number;
    /** 容器位置ID */
    locationId?: number;
    /** 容器位置编号 */
    locationCode?: string;
    /** 是否启用 */
    isEnable?: boolean;
    /** 容器类型名称 */
    containerTypeName?: string;
    /** 是否虚拟容器 */
    containerTypeIsVirtual?: boolean;
    /** 是否有容器条码（标识） */
    containerTypeIsHaveBarcode?: boolean;
    /** 容器条码规则（正则表达式） */
    containerTypeBarcodeRule?: string;
    /** 容器条码规则-最小长度 */
    containerTypeBarcodeMinLength?: number;
    /** 容器条码规则-最大长度 */
    containerTypeBarcodeMaxLength?: number;
    /** 容器尺寸-长度 */
    containerTypeSizeLength?: number;
    /** 容器尺寸-宽度 */
    containerTypeSizeWidth?: number;
    /** 容器尺寸-高度 */
    containerTypeSizeHeight?: number;
    /** 组盘-是否允许物料在容器中混放 */
    containerTypeAllowMixed?: boolean;
    /** 容器分格-总数 */
    containerTypeCellNumber?: number;
    /** 容器分格-行数 */
    containerTypeCellRow?: number;
    /** 容器分格-列数 */
    containerTypeCellColumn?: number;
    /** 组盘-容器分格-单格是否允许物料混放 */
    containerTypeCellAllowMixed?: boolean;
    /** 图标-空托图标 */
    containerTypeEmptyIco?: string;
    /** 图标-满托图标 */
    containerTypeFullIco?: string;
    /** 图标-半满图标 */
    containerTypeHalfFullIco?: string;
    /** 图标-空垛图标 */
    containerTypeEmptyStackIco?: string;
  };

  type OutputContainerInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputContainerInfoDTO[];
  };

  type OutputContainerInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputContainerInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputContainerInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputContainerInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputContainerInventoryDTO = {
    /** 库存ID */
    id?: number;
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料规格 */
    materialSize?: string;
    /** 批次号 */
    batchNumber?: string;
    qualityStatus?: EnumQualityStatus;
    /** 当前数量 */
    currentQuantity?: number;
    /** 有效期（天） */
    expiresDays?: number;
    /** 收货日期 */
    receivingDate?: string;
  };

  type OutputContainerTypeInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 容器类型名称 */
    name?: string;
    /** 是否虚拟容器 */
    isVirtual?: boolean;
    /** 是否有容器条码（标识） */
    isHaveBarcode?: boolean;
    /** 容器条码规则（正则表达式） */
    barcodeRule?: string;
    /** 容器条码规则-最小长度 */
    barcodeMinLength?: number;
    /** 容器条码规则-最大长度 */
    barcodeMaxLength?: number;
    /** 容器尺寸-长度 */
    sizeLength?: number;
    /** 容器尺寸-宽度 */
    sizeWidth?: number;
    /** 容器尺寸-高度 */
    sizeHeight?: number;
    /** 组盘-是否允许物料在容器中混放 */
    allowMixed?: boolean;
    /** 容器分格-总数 */
    cellNumber?: number;
    /** 容器分格-行数 */
    cellRow?: number;
    /** 容器分格-列数 */
    cellColumn?: number;
    /** 组盘-容器分格-单格是否允许物料混放 */
    cellAllowMixed?: boolean;
    /** 图标-空托图标 */
    emptyIco?: string;
    /** 图标-满托图标 */
    fullIco?: string;
    /** 图标-半满图标 */
    halfFullIco?: string;
    /** 图标-空垛图标 */
    emptyStackIco?: string;
    /** 是否启用 */
    isEnable?: boolean;
  };

  type OutputContainerTypeInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputContainerTypeInfoDTO[];
  };

  type OutputContainerTypeInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputContainerTypeInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputContainerTypeInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputContainerTypeInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputCustomAreaDTO = {
    /** 区域id */
    id?: number;
    /** 名称 */
    name?: string;
    /** 区域名称（一位字母一位数字） */
    areaCode?: string;
    /** 区域别名 */
    areaName?: string;
    /** 起始X轴 */
    fromXaxis?: number;
    /** 目标X轴 */
    toXaxis?: number;
    /** 起始Y轴 */
    fromYaxis?: number;
    /** 目标Y轴 */
    toYaxis?: number;
  };

  type OutputCustomAreaDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputCustomAreaDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputDictionaryInfoDTO = {
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

  type OutputDictionaryInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputDictionaryInfoDTO[];
  };

  type OutputDictionaryInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputDictionaryInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputDictionaryValueInfoDTO = {
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

  type OutputDictionaryValueInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputDictionaryValueInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputDictionaryValueInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputDictionaryValueInfoDTO[];
  };

  type OutputDictionaryValueInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputDictionaryValueInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputFunctionInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 所属菜单ID */
    menuId?: string;
    /** 功能名称 */
    functionName?: string;
    /** 功能标题 */
    functionTitle?: string;
    /** 功能图标 */
    functionIcon?: string;
    /** 功能执行动作 */
    functionAction?: string;
    /** 功能排序 */
    functionSort?: number;
  };

  type OutputGroupParamInfoDTO = {
    group?: string;
    info?: OutputSysParamInfoDTO[];
  };

  type OutputGroupParamInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputGroupParamInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputInventoryInfoDtlDTO = {
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料描述 */
    materialDescription?: string;
    /** 入库数量 */
    inQuantity?: number;
    /** 出库数量 */
    outQuantity?: number;
    /** 当前数量 */
    currentQuantity?: number;
    /** 批次号 */
    batchNumber?: string;
    /** 物料型号 */
    materialModelName?: string;
    /** 物料规格 */
    materialSize?: string;
    /** 有效期（天） */
    expiresDays?: number;
    /** 收货日期 */
    receivingDate?: string;
    qualityStatus?: EnumQualityStatus;
  };

  type OutputInventoryInfoDTO = {
    /** 库存id */
    id?: number;
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 容器类型ID */
    containerTypeId?: number;
    /** 容器类型 */
    containerTypeName?: string;
    /** 物料ID */
    materialId?: number;
    /** 物料档案ID */
    materialItemId?: number;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料规格 */
    materialSize?: string;
    /** 单位 */
    packagingName?: string;
    qualityStatus?: EnumQualityStatus;
    /** 批次 */
    batchNumber?: string;
    /** 有效期天数 */
    expiresDays?: number;
    /** 物料标识 */
    materialUID?: string;
    positionType?: EnumPositionType;
    /** 位置编号 */
    locationCode?: string;
    /** 位置编号（自动定义） */
    customCode?: string;
    /** 排-列-层 */
    positionAlias?: string;
    /** 区域编号 */
    areaCode?: string;
    /** 区域名称 */
    areaName?: string;
    /** 物料入库数量 */
    inQuantity?: number;
    /** 物料出库数量 */
    outQuantity?: number;
    /** 当前物料数量 */
    currentQuantity?: number;
    /** 分配锁定的数量 */
    lockedQuantity?: number;
    /** 可分配数量 */
    availableQuantity?: number;
    /** 分配数量 */
    quantity?: number;
    /** 是否解盘,1-已解盘，0-未解盘 */
    isDismiss?: boolean;
    /** 创建时间 */
    createTime?: string;
    /** 收货单行号 */
    receiptLineNumber?: string;
    /** 收货单号 */
    receiptCode?: string;
    /** 收货单详情 */
    receiptDescription?: string;
    /** 收货时间 */
    receivingDate?: string;
    /** 供应商名称 */
    supplierName?: string;
  };

  type OutputInventoryInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputInventoryInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputInventoryInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputInventoryInfoDTO[];
  };

  type OutputInventoryInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputInventoryInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputInvoiceHeaderDTO = {
    /** 发货单Id */
    id?: number;
    /** 发货单头编号 */
    invoiceCode?: string;
    /** 发货类型Id */
    invoiceTypeId?: number;
    /** 发货类型 */
    invoiceTypeName?: string;
    /** 出库区域id */
    outboundAreaId?: number;
    /** 出库区域 */
    outboundAreaName?: string;
    invoiceStatus?: EnumInvoiceStatus;
    qualityStatus?: EnumQualityStatus;
    /** 是否自动分配库存 */
    isAutoAllocation?: boolean;
    /** 是否波次 */
    isWaveTime?: boolean;
    /** 波次单号 */
    wavenumberCode?: string;
    /** 是否需要审核（默认否） */
    isNeedAudit?: boolean;
    /** 审核人 */
    auditUserName?: string;
    auditStatus?: EnumAuditStatus;
    /** 审核时间 */
    auditTime?: string;
    /** 描述信息 */
    invoiceHeaderDescription?: string;
    /** 创建人 */
    createName?: string;
    /** 创建时间 */
    createTime?: string;
    /** 单行列表 */
    invoiceLineList?: OutputInvoiceLineDTO[];
  };

  type OutputInvoiceHeaderDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputInvoiceHeaderDTO[];
  };

  type OutputInvoiceHeaderDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputInvoiceHeaderDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputInvoiceLineDTO = {
    /** 发货单行Id */
    id?: number;
    /** 发货单号 */
    invoiceCode?: string;
    /** 发货单行号 */
    invoiceLineNumber?: string;
    invoiceLineStatus?: EnumInvoiceStatus;
    /** 物料ID */
    materialId?: number;
    /** 物料编号 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料规格 */
    materialSize?: string;
    /** 物料类型 */
    materialTypeName?: string;
    /** 物料型号 */
    materialModelName?: string;
    /** 物料批次号 */
    batchNumber?: string;
    /** 应发数量 */
    quantity?: number;
    /** 已发数量 */
    outboundQuantity?: number;
    /** 描述信息 */
    invoiceLineDescription?: string;
  };

  type OutputLayerTileDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 画布代码 */
    canvasCode?: string;
    /** X轴货格数 */
    xaxisLength?: number;
    /** Y轴货格数 */
    yaxisLength?: number;
    /** 层 */
    locationLayer?: number;
    /** 布局区域 */
    areaList?: OutputAreaTileDTO[];
    /** 货位 */
    locationList?: OutputLocationTileDTO[];
  };

  type OutputLayerTileDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputLayerTileDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputLocationDetailDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 货位编码 */
    locationCode?: string;
    /** 货位编号(自定义) */
    customCode?: string;
    positionType?: EnumPositionType;
    inboundType?: EnumInboundType;
    /** 报警状态（是否报警）:1-报警、0-正常 */
    isAlarm?: boolean;
    /** 允许入库：1-允许、0-不允许 */
    allowStockIn?: boolean;
    /** 允许出库：1-允许、0-不允许 */
    allowStockOut?: boolean;
    locationStatus?: EnumLocationStatus;
    /** 库位空满状态：1-满、0-空 */
    isFull?: boolean;
    /** 货位排 */
    locationRow?: number;
    /** 货位列 */
    locationColumn?: number;
    /** 货位层 */
    locationLayer?: number;
    /** 货位深 */
    locationDepth?: number;
    /** 是否盘点中：1-盘点中、0-未盘点 */
    isStocktaking?: boolean;
    /** 主界面X轴坐标 */
    mainXaxis?: number;
    /** 主界面Y轴坐标 */
    mainYaxis?: number;
    /** 画布排 */
    canvasRow?: number;
    /** 画布列 */
    canvasColumn?: number;
    /** 库存 */
    inventoryList?: OutputContainerInventoryDTO[];
  };

  type OutputLocationDetailDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputLocationDetailDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputLocationInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 货位编号(区号两位，排、列、层三位数字，深位两位数字，中间用-隔开) */
    locationCode?: string;
    /** 货位编号（自定义） */
    customCode?: string;
    /** 所属仓库ID */
    warehouseId?: number;
    /** 仓库名称 */
    warehouseName?: string;
    /** 所属巷道ID */
    tunnelId?: number;
    /** 巷道编码 */
    tunnelCode?: string;
    /** 巷道名称 */
    tunnelName?: string;
    shelvesType?: EnumShelvesType;
    positionType?: EnumPositionType;
    inboundType?: EnumInboundType;
    /** 货位类型ID */
    locationTypeId?: number;
    /** 货位类型名称 */
    locationTypeName?: string;
    /** 报警状态（是否报警）:1-报警、0-正常 */
    isAlarm?: boolean;
    /** 允许入库：1-允许、0-不允许 */
    allowStockIn?: boolean;
    /** 允许出库：1-允许、0-不允许 */
    allowStockOut?: boolean;
    locationStatus?: EnumLocationStatus;
    /** 库位空满状态：1-满、0-空 */
    isFull?: boolean;
    /** 所属区域ID */
    areaId?: number;
    /** 区域名称（一位字母一位数字） */
    areaName?: string;
    /** 货位排 */
    locationRow?: number;
    /** 货位列 */
    locationColumn?: number;
    /** 货位层 */
    locationLayer?: number;
    /** 货位深 */
    locationDepth?: number;
    /** 是否盘点中：1-盘点中、0-未盘点 */
    isStocktaking?: boolean;
    /** 主界面X轴坐标 */
    mainXaxis?: number;
    /** 主界面Y轴坐标 */
    mainYaxis?: number;
    /** 画布排 */
    canvasRow?: number;
    /** 画布列 */
    canvasColumn?: number;
    /** 出库优先级 */
    outboundPriority?: number;
    containerSummary?: ContainerSummaryDTO;
  };

  type OutputLocationInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputLocationInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputLocationInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputLocationInfoDTO[];
  };

  type OutputLocationInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputLocationInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputLocationInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputLocationInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputLocationStateCountDTO = {
    name?: string;
    value?: number;
  };

  type OutputLocationStateCountDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputLocationStateCountDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputLocationTileDTO = {
    /** ID */
    id?: number;
    /** 区域id */
    areaId?: number;
    /** 画布区域ID */
    canvasAreaId?: number;
    /** 画布货位布局方向，1-纵向，0-横向 */
    isColumn?: boolean;
    /** 自定义的排 */
    canvasRow?: number;
    /** 自定义的列 */
    canvasColumn?: number;
    /** x轴坐标 */
    xaxis?: number;
    /** y轴坐标 */
    yaxis?: number;
    /** z轴坐标 货位层 */
    zaxis?: number;
    locationStatus?: Enum3DLocationStatus;
    positionType?: EnumPositionType;
  };

  type OutputLocationTypeInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 货位类型名称 */
    locationTypeName?: string;
    /** 货位类型描述 */
    locationTypeDescription?: string;
    /** 货位高度(mm) */
    locationHeight?: number;
    /** 货位宽度(mm) */
    locationWidth?: number;
  };

  type OutputLocationTypeInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputLocationTypeInfoDTO[];
  };

  type OutputLocationTypeInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputLocationTypeInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputLocationTypeInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputLocationTypeInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputMaterialInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料类型Id */
    materialTypeId?: string;
    /** 物料类型 */
    materialTypeName?: string;
    /** 物料型号ID */
    materialModelId?: number;
    /** 物料型号 */
    materialModelName?: string;
    /** 物料最小包装 ID */
    skuPackagingId?: string;
    /** 物料最小包装名称（单位名称） */
    packagingName?: string;
    defaultQualityStatus?: EnumQualityStatus;
    /** 物料规格 */
    materialSize?: string;
    /** 有效期(天数) */
    expiresDays?: number;
    /** 有效期(天数)预警，新加字段 */
    expiresDaysNotice?: number;
    /** 最低库存预警，新加字段 */
    stockMinNotice?: number;
    /** 最高库存预警，新加字段 */
    stockMaxNotice?: number;
    /** 是否有物料标识:1-有,0-没有 */
    hasMaterialSign?: boolean;
    /** 物料标识是否唯一:1-是,0-不是 */
    isUniqueSign?: boolean;
    /** 是否允许混盘:1-允许,0-不允许 */
    isMixedPallet?: boolean;
    /** 描述信息 */
    materialDescription?: string;
  };

  type OutputMaterialInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputMaterialInfoDTO[];
  };

  type OutputMaterialInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputMaterialInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputMaterialInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputMaterialInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputMaterialItemInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 物料档案收货标识 */
    receivingCode?: string;
    /** 物料标识 */
    materialUID?: string;
    /** 物料ID */
    materialId?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料类型ID */
    materialTypeId?: string;
    /** 物料类型名称 */
    materialTypeName?: string;
    /** 物料型号ID */
    materialModelId?: string;
    /** 物料型号名称 */
    materialModelName?: string;
    /** 物料最小包装 ID */
    skuPackagingId?: string;
    /** 包装编码 */
    packagingCode?: string;
    /** 规格 */
    materialSize?: string;
    qualityStatus?: EnumQualityStatus;
    /** 有效期(天数) */
    expiresDays?: number;
    /** 收货日期 */
    receivingDate?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 收货区域 */
    areaId?: string;
    /** 区域名称（一位字母一位数字） */
    areaName?: string;
    /** 收货位置（工作台编号、货位编号） */
    locationCode?: string;
    /** 收货数量 */
    quantity?: number;
    /** 供应商ID */
    supplierId?: string;
    /** 供应商名称 */
    contactName?: string;
    /** 收货单号 */
    receiptCode?: string;
    /** 收货单行号 */
    receiptLineNumber?: string;
    /** 收货单行ID */
    receiptLineId?: string;
    /** 描述信息 */
    materialItemDescription?: string;
    /** 添加时间 */
    createTime?: string;
  };

  type OutputMaterialItemInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputMaterialItemInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputMaterialItemInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputMaterialItemInfoDTO[];
  };

  type OutputMaterialItemInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputMaterialItemInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputMenuInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 父级菜单ID,为0时是菜单根节点 */
    parentId?: string;
    /** 所属系统编号 */
    systemCode?: string;
    /** 菜单名称 */
    menuName?: string;
    /** 菜单标题 */
    menuTitle?: string;
    /** vue组件名称 */
    vueComponent?: string;
    /** 菜单（页面）地址 */
    menuUrl?: string;
    /** 菜单图标 */
    menuIcon?: string;
    /** 菜单排序 */
    menuSort?: number;
    /** 多语言标识 */
    menuLanguageSign?: string;
    /** 功能权限 */
    functionList?: OutputFunctionInfoDTO[];
    /** 子集合 */
    children?: OutputMenuInfoDTO[];
  };

  type OutputMenuInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputMenuInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputMenuInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputMenuInfoDTO[];
  };

  type OutputMenuInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputMenuInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputOutboundRequirementInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 出库需求编号 */
    requirementCode?: string;
    /** 物料Id */
    materialId?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料型号Id */
    materialModelId?: string;
    /** 物料型号名称 */
    materialModelName?: string;
    /** 规格 */
    materialSize?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 物料数量 */
    quantity?: number;
    outboundRequirementType?: EnumOutboundRequirementType;
    /** 发货单头ID */
    shipmentHeadId?: string;
    /** 发货单行号 */
    shipmentLineNumber?: string;
    /** 发货单行ID */
    shipmentLineId?: string;
    /** 波次单行ID */
    waveLineId?: string;
    requirementStatus?: EnumRequirementStatus;
    /** 出库区域 */
    outboundAreaId?: string;
    /** 区域名称 */
    areaName?: string;
    allocationStatus?: EnumAutoAllocationStatus;
    /** 添加时间 */
    createTime?: string;
  };

  type OutputOutboundRequirementInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputOutboundRequirementInfoDTO[];
  };

  type OutputOutboundRequirementInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputOutboundRequirementInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputPermissionInfoDTO = {
    /** 权限ID */
    id?: string;
    /** 权限名称 */
    permissionName?: string;
    /** 权限明细 */
    permissionItemList?: OutputPermissionItemInfoDTO[];
  };

  type OutputPermissionInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputPermissionInfoDTO[];
  };

  type OutputPermissionInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputPermissionInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputPermissionItemInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 权限ID */
    permissionId?: string;
    /** 权限名称 */
    permissionName?: string;
    /** 菜单ID */
    menuId?: string;
    /** 菜单标题 */
    menuTitle?: string;
    /** 功能ID */
    functionId?: string[];
    /** 功能标题 */
    functionTitle?: string;
    children?: OutputPermissionItemInfoDTO;
  };

  type OutputPermissionItemInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputPermissionItemInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputQualityTestInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 唯一标识 */
    uid?: string;
    /** 质检单号 */
    qualityTestCode?: string;
    qualityTestStatus?: EnumQualityTestStatus;
    /** 是否搬运 */
    isCarry?: boolean;
    /** 搬运目标区域 */
    targetAreaId?: string;
    /** 搬运目标区域 */
    targetAreaName?: string;
    /** 质检单描述 */
    qualityTestDescription?: string;
    /** 物料ID */
    materialId?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 规格 */
    materialSize?: string;
    qualityStatus?: EnumQualityStatus;
    resultQualityStatus?: EnumQualityStatus;
    /** 抽检容器数量 */
    containerQuantity?: number;
    /** 添加时间 */
    createTime?: string;
    /** 添加人 */
    createName?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 更新人 */
    updateName?: string;
  };

  type OutputQualityTestInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputQualityTestInfoDTO[];
  };

  type OutputQualityTestInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputQualityTestInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputQualityTestInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputQualityTestInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputQualityTestRecordInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 质检单ID */
    qualityTestId?: string;
    /** 质检单号 */
    qualityTestCode?: string;
    /** 分配容器ID */
    containerId?: string;
    /** 分配容器编号 */
    containerCode?: string;
    /** 容器类型ID */
    containerTypeId?: string;
    /** 库位Id */
    locationId?: string;
    /** 库位编号 */
    locationCode?: string;
    /** 实际抽检数量 */
    samplingQuantity?: number;
    /** 是否取样出库 */
    isSampled?: boolean;
  };

  type OutputQualityTestRecordInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputQualityTestRecordInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputReceiptHeaderInfoDTO = {
    /** 收货单头Id */
    id?: number;
    /** 收货单头编号 */
    receiptCode?: string;
    /** 收货类型Id */
    receiptTypeId?: number;
    /** 收货类型名称 */
    receiptTypeName?: string;
    receiptStatus?: EnumReceiptStatus;
    /** 供应商Id */
    supplierId?: number;
    /** 供应商名称 */
    supplierName?: string;
    /** 是否需要审核（默认否） */
    isNeedAudit?: boolean;
    /** 审核人 */
    auditUserName?: string;
    auditStatus?: EnumAuditStatus;
    /** 审核时间 */
    auditTime?: string;
    /** 描述信息 */
    receiptHeaderDescription?: string;
    /** 创建人 */
    createName?: string;
    /** 创建时间 */
    createTime?: string;
    /** 收货单行列表 */
    receiptLineList?: OutputReceiptLineInfoDTO[];
  };

  type OutputReceiptHeaderInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputReceiptHeaderInfoDTO[];
  };

  type OutputReceiptHeaderInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputReceiptHeaderInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputReceiptLineInfoDTO = {
    /** 收货单明细id */
    id?: number;
    /** 收货单号 */
    receiptCode?: string;
    /** 收货单行号 */
    receiptLineNumber?: string;
    receiptStatus?: EnumReceiptStatus;
    /** 物料ID */
    materialId?: number;
    /** 物料编号 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料规格 */
    materialSize?: string;
    /** 物料类型 */
    materialTypeName?: string;
    /** 物料批次号 */
    batchNumber?: string;
    qualityStatus?: EnumQualityStatus;
    /** 单位 */
    packagingName?: string;
    /** 应收数量 */
    receivableQuantity?: number;
    /** 已收数量 */
    receivedQuantity?: number;
  };

  type OutputRoleInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 权限ID */
    permissionId?: string;
    /** 权限名称 */
    permissionName?: string;
    /** 角色名称 */
    roleName?: string;
    /** 描述信息 */
    roleDescription?: string;
  };

  type OutputRoleInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputRoleInfoDTO[];
  };

  type OutputRoleInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputRoleInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputRoutingInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 路径编号，唯一 */
    code?: string;
    /** 路径名称 */
    name?: string;
    /** 起始区域 */
    fromArea?: string;
    /** 起始区域名称 */
    fromAreaName?: string;
    /** 目标区域 */
    toArea?: string;
    /** 目标区域名称 */
    toAreaName?: string;
    taskType?: EnumTaskType;
    /** 任务类型 */
    taskTypeDisplay?: string;
    taskExecuteType?: EnumTaskExecuteType;
    /** 任务执行类型 */
    taskExecuteTypeDisplay?: string;
    /** WCS名称 */
    wcsName?: string;
    /** 是否空托解绑 */
    isEmptyDismiss?: boolean;
    /** 是否实托解盘 */
    isFullDismiss?: boolean;
    /** 启用状态 */
    isEnable?: boolean;
    /** 优先级 */
    priority?: number;
  };

  type OutputRoutingInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputRoutingInfoDTO[];
  };

  type OutputRoutingInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputRoutingInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputRoutingInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputRoutingInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputRowShelvesDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 货位编码 */
    locationCode?: string;
    /** 货位状态 */
    locationTypeName?: string;
    locationLayer?: number;
    /** 行 */
    locationRow?: number;
    /** 画布行 */
    canvasRow?: number;
    /** 画布列 */
    canvasColumn?: number;
    /** 深度（对应客户端的列） */
    locationDepth?: number;
    /** 列 */
    locationColumn?: number;
    shelvesType?: EnumShelvesType;
    /** 报警状态（是否报警）:1-报警、0-正常 */
    isAlarm?: boolean;
    /** 允许入库：1-允许、0-不允许 */
    allowStockIn?: boolean;
    /** 允许出库：1-允许、0-不允许 */
    allowStockOut?: boolean;
    locationStatus?: EnumLocationStatus;
    /** 库位空满状态：1-满、0-空 */
    isFull?: boolean;
    /** 是否盘点中：1-盘点中、0-未盘点 */
    isStocktaking?: boolean;
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 工作台编号 */
    workbenchCode?: string;
    /** 工作台名称 */
    workbenchName?: string;
    /** 入库类型 */
    stockInType?: string;
    /** 状态(给前端做优先级显示) */
    state?: number;
    /** 空托盘堆叠数量 */
    emptyContainerCount?: number;
    /** 物料 */
    inventoryInfoList?: OutputInventoryInfoDtlDTO[];
  };

  type OutPutRowShelvesMainDTO = {
    /** 起始坐标 */
    beginColumn?: number;
    /** 结束坐标 */
    endColumn?: number;
    /** 货位信息集合 */
    locations?: OutputRowShelvesDTO[];
  };

  type OutPutRowShelvesMainDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutPutRowShelvesMainDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputSamplingContainerDetailDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 质检单ID */
    qualityTestId?: string;
    /** 质检单号 */
    qualityTestCode?: string;
    qualityTestStatus?: EnumQualityTestStatus;
    /** 工作台位置编号 */
    locationCode?: string;
    /** 分配容器编号 */
    containerCode?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 规格 */
    materialSize?: string;
    qualityStatus?: EnumQualityStatus;
    /** 容器库存 */
    inventoryQuantity?: number;
    /** 实际抽检数量 */
    samplingQuantity?: number;
  };

  type OutputSamplingContainerDetailDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputSamplingContainerDetailDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputStocktakeDetailDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 盘点计划号 */
    stocktakeCode?: string;
    stocktakeType?: EnumStocktakeType;
    stocktakeStatus?: EnumStocktakeStatus;
    /** 搬运目标区域 */
    targetAreaId?: number;
    /** 搬运目标区域编号 */
    targetAreaCode?: string;
    /** 搬运目标区域名称 */
    targetAreaName?: string;
    /** 盘点计划描述 */
    stocktakeDescription?: string;
    /** 添加时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 盘点库位 */
    stocktakeLocationList?: StocktakeLocationInfoDTO[];
    /** 盘点记录 */
    stocktakeRecordList?: OutputStocktakeRecordInfoDTO[];
  };

  type OutputStocktakeDetailDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputStocktakeDetailDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputStocktakeInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 盘点计划号 */
    stocktakeCode?: string;
    stocktakeType?: EnumStocktakeType;
    stocktakeStatus?: EnumStocktakeStatus;
    /** 搬运目标区域 */
    targetAreaId?: number;
    /** 搬运目标区域编号 */
    targetAreaCode?: string;
    /** 搬运目标区域名称 */
    targetAreaName?: string;
    /** 盘点计划描述 */
    stocktakeDescription?: string;
    /** 创建人 */
    createName?: string;
    /** 添加时间 */
    createTime?: string;
    /** 更新人 */
    updateName?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type OutputStocktakeInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputStocktakeInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputStocktakeInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputStocktakeInfoDTO[];
  };

  type OutputStocktakeInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputStocktakeInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputStocktakeRecordInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 盘点计划Id */
    stocktakeId?: number;
    /** 盘点库位ID */
    stocktakeLocationId?: number;
    /** 盘点计划号 */
    stocktakeCode?: string;
    /** 库存ID */
    inventoryId?: number;
    /** 被盘点库位Id */
    locationId?: number;
    /** 被盘点库位编号 */
    locationCode?: string;
    /** 被盘点库位编号(自定义) */
    customCode?: string;
    /** 当前载具位置 */
    containerPosition?: string;
    /** 当前载具位置编号 */
    containerPositionCode?: string;
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 物料ID */
    materialId?: number;
    /** 物料编号 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料档案ID */
    materialItemId?: number;
    /** 规格 */
    materialSize?: string;
    /** 批次号 */
    batchNumber?: string;
    qualityStatus?: EnumQualityStatus;
    /** 盘前库存数量 */
    stocktakeQuantity?: number;
    /** 盘后数量 */
    adjustedQuantity?: number;
    stocktakeRecordStatus?: EnumStocktakeRecordStatus;
    /** 盈亏备注 */
    stocktakeRecordRemark?: string;
    /** 是否盘点完成 */
    isFinish?: boolean;
    /** 是否允许回库 */
    isAllowReturn?: boolean;
  };

  type OutputStocktakeRecordInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputStocktakeRecordInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputSysAreaReceivingSetting = {
    /** Id */
    id?: string;
    /** 区域ID */
    areaID?: number;
    receivingBusinessType?: EnumSysReceivingBusinessType;
    /** 收货业务类型描述 */
    receivingBusinessTypeDes?: string;
    /** 是否允许 */
    isAllow?: boolean;
    /** 是否在途 */
    isTransit?: boolean;
  };

  type OutputSysAreaReceivingSettingR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputSysAreaReceivingSetting;
    statusCode?: EnumStatusCode;
  };

  type OutputSysParamInfoDTO = {
    id?: number;
    /** 分组 */
    group?: string;
    /** 名称 */
    name?: string;
    /** 键 */
    key?: string;
    type?: EnumParamType;
    /** 值 */
    value?: string;
    /** 是否允许用户配置 */
    isConfigurable?: boolean;
    /** 是否禁用 */
    isDisable?: boolean;
  };

  type OutputTaskInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 任务编号 */
    taskCode?: string;
    /** 依赖任务ID */
    dependentTaskId?: number;
    /** 依赖任务编码 */
    dependentTaskCode?: string;
    /** 任务优先级 */
    taskPriority?: number;
    /** 容器类型 */
    containerTypeId?: number;
    /** 容器档案标识 */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    taskType?: EnumTaskType;
    taskStatus?: EnumTaskStatus;
    /** 是否已下发WCS */
    isToWcs?: boolean;
    /** 货位分组ID */
    locationGroupID?: number;
    allotLocationSortMode?: EnumAllotLocationSortMode;
    /** 是否锁定了真实的库位，即ToPositionCode对应一个真实的库位 */
    isLockRealLocation?: boolean;
    /** 搬运路径id */
    routingId?: number;
    taskExecuteType?: EnumTaskExecuteType;
    /** 起始区域 */
    fromAreaId?: number;
    /** 目标区域 */
    toAreaId?: number;
    /** 起始位置 */
    fromPositionCode?: string;
    /** 起始位置(自定义) */
    fromCustomCode?: string;
    /** 目标位置 */
    toPositionCode?: string;
    /** 目标位置（自定义） */
    toCustomCode?: string;
    postStatus?: EnumPostStatus;
    /** 过账状态描述 */
    postStatusDescription?: string;
    /** 是否预警 */
    isAlarm?: boolean;
    taskAlarmType?: EnumTaskAlarmType;
    /** 预警描述 */
    alarmDescription?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人 */
    updateUserName?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type OutputTaskInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputTaskInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputTaskInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputTaskInfoDTO[];
  };

  type OutputTaskInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputTaskInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputTunnelInfoDTO = {
    /** 主键id */
    id?: string;
    /** 巷道编码 */
    tunnelCode?: string;
    /** 巷道名称 */
    tunnelName?: string;
    /** 所属仓库 */
    warehouseId?: string;
    /** 所属仓库名称 */
    warehouseName?: string;
    /** 所属区域 */
    areaId?: string;
    /** 区域名称 */
    areaName?: string;
    /** 关联货排，多个排号逗号隔开 */
    relationRows?: string;
    /** 巷道状态（启用/禁用） */
    tunnelState?: boolean;
    /** 巷道描述 */
    tunnelDescribe?: string;
  };

  type OutputTunnelInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputTunnelInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputTunnelInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputTunnelInfoDTO[];
  };

  type OutputTunnelInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputTunnelInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputUserInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 所属角色 */
    roleId?: string;
    /** 角色名称 */
    roleName?: string;
    /** 权限ID */
    permissionId?: string;
    /** 是否超级管理员 */
    isAdmin?: boolean;
    /** 账号名称 */
    userName?: string;
    /** 用户头像 */
    avator?: string;
    /** 姓名 */
    realName?: string;
    userSex?: EnumSex;
    /** 出生日期 */
    birthday?: string;
    /** 工号 */
    jobNumber?: string;
    /** 电话 */
    phoneNumber?: string;
    /** email */
    userEmail?: string;
    /** 部门名称 */
    departmentName?: string;
    /** 添加者 */
    createName?: string;
    /** 添加时间 */
    createTime?: string;
  };

  type OutputUserInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputUserInfoDTO[];
  };

  type OutputUserInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputUserInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputUserInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputUserInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputWarehouseInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 仓库编码 */
    warehouseCode?: string;
    /** 仓库名称 */
    warehouseName?: string;
    /** 仓库别名 */
    warehouseOtherName?: string;
    /** 仓库描述 */
    warehouseDescribe?: string;
  };

  type OutputWarehouseInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputWarehouseInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputWarehouseInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputWarehouseInfoDTO[];
  };

  type OutputWarehouseInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputWarehouseInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputWavenumberDetailDTO = {
    /** 波次id */
    id?: string;
    /** 波次单头编号 */
    wavenumberCode?: string;
    /** 波次单名称 */
    wavenumberName?: string;
    wavenumberStatus?: EnumWavenumberStatus;
    /** 描述信息 */
    waveHeaderDescription?: string;
    /** 搬运目标区域 */
    toAreaId?: string;
    /** 搬运目标区域 */
    toAreaName?: string;
    /** 创建时间 */
    createTime?: string;
    /** 发货单列表 */
    wavenumberInvoiceList?: OutputWavenumberInvoiceDTO[];
  };

  type OutputWavenumberDetailDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputWavenumberDetailDTO;
    statusCode?: EnumStatusCode;
  };

  type OutputWavenumberHeaderDTO = {
    /** 波次id */
    id?: string;
    /** 波次单头编号 */
    wavenumberCode?: string;
    /** 波次单名称 */
    wavenumberName?: string;
    wavenumberStatus?: EnumWavenumberStatus;
    /** 描述信息 */
    waveHeaderDescription?: string;
    /** 搬运目标区域 */
    toAreaId?: string;
    /** 搬运目标区域 */
    toAreaName?: string;
    /** 创建时间 */
    createTime?: string;
    /** 单行明细 */
    wavenumberLineList?: OutputWavenumberLineDTO[];
  };

  type OutputWavenumberHeaderDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputWavenumberHeaderDTO[];
  };

  type OutputWavenumberHeaderDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputWavenumberHeaderDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputWavenumberInvoiceDTO = {
    /** 发货单Id */
    id?: string;
    /** 发货单头编号 */
    invoiceCode?: string;
    /** 发货单名称 */
    invoiceName?: string;
    /** 发货类型Id */
    invoiceTypeId?: string;
    /** 发货类型 */
    invoiceTypeName?: string;
    /** 搬运目标区域id */
    targetAreaId?: string;
    /** 搬运目标区域 */
    targetAreaName?: string;
    invoiceStatus?: EnumInvoiceStatus;
    /** 发货单有效期(天数) */
    expiresDays?: number;
    /** 是否超期 */
    isExpires?: boolean;
    /** 描述信息 */
    invoiceHeaderDescription?: string;
    /** 创建时间 */
    createTime?: string;
    qualityStatus?: EnumQualityStatus;
  };

  type OutputWavenumberInvoiceDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputWavenumberInvoiceDTO[];
  };

  type OutputWavenumberInvoiceDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputWavenumberInvoiceDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type OutputWavenumberLineDTO = {
    /** 波次行Id */
    id?: string;
    /** 波次单号 */
    wavenumberCode?: string;
    /** 波次单行行号 */
    wavenumberLineNumber?: string;
    /** 物料ID */
    materialId?: string;
    /** 物料编号 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料型号ID */
    materialModelId?: string;
    /** 物料型号 */
    materialModelName?: string;
    /** 物料批次号 */
    batchNumber?: string;
    /** 数量 */
    quantity?: number;
    wavenumberLineStatus?: EnumWavenumberStatus;
    /** 是否自动完成 */
    isAutocomplete?: boolean;
    /** 描述信息 */
    wavenumberLineDescription?: string;
    /** 出库需求Id */
    outboundRequirementId?: string;
    requirementStatus?: EnumRequirementStatus;
    autoAllocationStatus?: EnumAutoAllocationStatus;
  };

  type OutputWavenumberLineDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: OutputWavenumberLineDTO[];
    statusCode?: EnumStatusCode;
  };

  type OutputWavenumberLineDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: OutputWavenumberLineDTO[];
  };

  type OutputWavenumberLineDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: OutputWavenumberLineDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type PadCombineInfoDTO = {
    carryStatus?: EnumCarryStatus;
    /** 组盘位置编号 */
    locationCode?: string;
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 容器类型ID */
    containerTypeId?: number;
    /** 收货单号（非空托必填项） */
    receiptCode?: string;
    /** 物料编码（非空托必填项） */
    materialCode?: string;
    qualityStatus?: EnumQualityStatus;
    /** 收货数量（非空托必填项） */
    quantity?: number;
    /** 收货日期（非空托必填项） */
    receivingDate?: string;
  };

  type PadInvoiceLineDTO = {
    /** 发货单行Id */
    id?: number;
    /** 发货单号 */
    invoiceCode?: string;
    /** 发货单行号 */
    invoiceLineNumber?: string;
    invoiceLineStatus?: EnumInvoiceStatus;
    /** 物料ID */
    materialId?: number;
    /** 物料编号 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料规格 */
    materialSize?: string;
    /** 物料类型 */
    materialTypeName?: string;
    /** 物料型号 */
    materialModelName?: string;
    /** 物料批次号 */
    batchNumber?: string;
    /** 应发数量 */
    quantity?: number;
    /** 已发数量 */
    outboundQuantity?: number;
    /** 描述信息 */
    invoiceLineDescription?: string;
    /** 出库区域id */
    outboundAreaId?: number;
    /** 出库区域编号 */
    outboundAreaCode?: string;
    /** 出库区域 */
    outboundAreaName?: string;
    qualityStatus?: EnumQualityStatus;
  };

  type PadInvoiceLineDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: PadInvoiceLineDTO[];
  };

  type PadInvoiceLineDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: PadInvoiceLineDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type PadOutboundDetailDTO = {
    /** 对应出库需求Id,发货单行Id,波次单行Id */
    id?: string;
    /** 对应出库需求编号，发货单号 */
    shipmentCode?: string;
    /** 出库需求ID */
    outboundRequirementId?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    qualityStatus?: EnumQualityStatus;
    /** 物料型号 */
    materialModelName?: string;
    /** 物料规格 */
    materialSize?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 需求数量 */
    requirementQuantity?: number;
    /** 拣选出库数量 */
    pickQuantity?: number;
  };

  type PadOutboundDetailDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: PadOutboundDetailDTO[];
    statusCode?: EnumStatusCode;
  };

  type PadReceiptLineInfoDTO = {
    /** 收货单明细id */
    id?: number;
    /** 收货单号 */
    receiptCode?: string;
    /** 收货单行号 */
    receiptLineNumber?: string;
    receiptStatus?: EnumReceiptStatus;
    /** 物料ID */
    materialId?: number;
    /** 物料编号 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料规格 */
    materialSize?: string;
    /** 物料类型 */
    materialTypeName?: string;
    /** 物料批次号 */
    batchNumber?: string;
    qualityStatus?: EnumQualityStatus;
    /** 单位 */
    packagingName?: string;
    /** 应收数量 */
    receivableQuantity?: number;
    /** 已收数量 */
    receivedQuantity?: number;
    /** 供应商Id */
    supplierId?: number;
    /** 供应商名称 */
    supplierName?: string;
  };

  type PadReceiptLineInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: PadReceiptLineInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type PadReceiptLineInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: PadReceiptLineInfoDTO[];
  };

  type PadReceiptLineInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: PadReceiptLineInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type PadShipmentExecutionDTO = {
    /** ID */
    id?: string;
    /** 单据号 */
    shipmentCode?: string;
    /** 物料号 */
    materialCode?: string;
    /** 型号 */
    materialModelName?: string;
    /** 规格 */
    materialSize?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 数量 */
    quantity?: number;
    qualityStatus?: EnumQualityStatus;
  };

  type PadShipmentExecutionDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: PadShipmentExecutionDTO;
    statusCode?: EnumStatusCode;
  };

  type PadStocktakeLocationDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 盘点计划号 */
    stocktakeCode?: string;
    stocktakeType?: EnumStocktakeType;
    stocktakeStatus?: EnumStocktakeStatus;
    /** 搬运目标区域 */
    targetAreaId?: number;
    /** 搬运目标区域编号 */
    targetAreaCode?: string;
    /** 搬运目标区域名称 */
    targetAreaName?: string;
    /** 添加时间 */
    createTime?: string;
    /** 盘点库位ID */
    stocktakeLocationId?: number;
    /** 被盘库位Id */
    locationId?: number;
    /** 被盘库位编号 */
    locationCode?: string;
    /** 被盘库位编号(自定义)-显示 */
    customCode?: string;
    /** 当前容器位置 */
    containerPosition?: string;
    /** 当前容器位置编号-显示 */
    containerPositionCode?: string;
    containerPositionType?: EnumPositionType;
    /** 容器ID */
    containerId?: number;
    /** 容器编号-显示 */
    containerCode?: string;
    /** 是否允许回库-显示 */
    isAllowReturn?: boolean;
  };

  type PadStocktakeLocationDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: PadStocktakeLocationDTO[];
  };

  type PadStocktakeLocationDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: PadStocktakeLocationDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type PadUnbindingDTO = {
    unbindingType?: EnumUnbindingType;
    /** 位置编号 */
    locationCode?: string;
    /** 容器编号 */
    containerCode?: string;
  };

  type PadSetLocationEmptyDTO = {
    /** 位置id */
    locationId: string;
  };

  type PdaPickingDTO = {
    /** 拣选位置ID */
    locationId?: number;
    /** 拣选位置 */
    locationCode?: string;
    positionType?: EnumPositionType;
    /** 托盘编号 */
    containerCode?: string;
    /** 物料ID */
    materialId?: number;
    /** 物料编号 */
    materialCode?: string;
    /** 发货单行Id */
    id?: number;
    /** 发货单号 */
    invoiceCode?: string;
    /** 应发数量 */
    invoiceQuantity?: number;
    /** 已发数量 */
    outboundQuantity?: number;
    /** 可拣选的分配数量 */
    allotQuantity?: number;
    /** 当前拣选数量 */
    pickingQuantity?: number;
  };

  type PdaPickingDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: PdaPickingDTO[];
    statusCode?: EnumStatusCode;
  };

  type PdaStocktakeDetailDTO = {
    /** 盘点单号 */
    stocktakeCode?: string;
    /** 货位ID */
    locationId?: number;
    /** 盘点位置 */
    locationCode?: string;
    positionType?: EnumPositionType;
    /** 托盘Id */
    containerId?: number;
    /** 托盘编号 */
    containerCode?: string;
    /** 物料档案ID */
    materialId?: number;
    /** 物料编号 */
    materialCode?: string;
    /** 库存数量 */
    inventoryQuantity?: number;
    /** 盘后数量 */
    adjustedQuantity?: number;
  };

  type PdaStocktakeDetailDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: PdaStocktakeDetailDTO[];
    statusCode?: EnumStatusCode;
  };

  type PdaStocktakeDetailDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: PdaStocktakeDetailDTO;
    statusCode?: EnumStatusCode;
  };

  type PermissionInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 权限名称 */
    permissionName?: string;
  };

  type PermissionItemInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 权限ID */
    permissionId?: number;
    /** 权限名称 */
    permissionName?: string;
    /** 菜单ID */
    menuId?: number;
    /** 功能ID */
    functionId?: string[];
  };

  type PickingContanierInventoryDTO = {
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 容器所在库位ID */
    locationId?: number;
    /** 出库需求ID */
    outboundRequirementId?: number;
    /** 出库需求编号 */
    outboundRequirementCode?: string;
    /** 分配明细ID */
    allocationItemId?: number;
    /** 物料档案ID */
    materialItemId?: number;
    /** 物料ID */
    materialId?: number;
    /** 库存ID */
    inventoryId?: number;
    /** 发货单头ID */
    invoiceHeaderId?: number;
    /** 发货单行ID */
    invoiceLineId?: number;
    /** 发货单号 */
    invoiceCode?: string;
    /** 发货单号号 */
    invoiceLineNumber?: string;
    qualityStatus?: EnumQualityStatus;
    /** 物料编号 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 规格 */
    materialSize?: string;
    /** 出库需求数量 */
    requirementQuantity?: number;
    /** 分配数量 */
    allotQuantity?: number;
    /** 已出库数量 */
    outboundQuantity?: number;
    /** 拣选数量（默认等于该容器的分配数量-已出库数量） */
    pickingQuantity?: number;
    /** 当前容器库存数量 */
    inventoryQuantity?: number;
    /** 是否已分配 */
    isAllot?: boolean;
  };

  type PickingContanierInventoryDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: PickingContanierInventoryDTO[];
    statusCode?: EnumStatusCode;
  };

  type Query2DTile = {
    /** 层 */
    layer?: number;
    /** 区 */
    areaId?: number;
  };

  type QueryAreaInfo = {
    /** 区域名称 */
    areaName?: string;
    /** 区域编码 */
    areaCode?: string;
    areaType?: EnumAreaType;
    areaState?: EnumAreaState;
  };

  type QueryAreaInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryAreaInfo;
  };

  type QueryCanvasAreaInfo = {
    /** 画布代码 */
    canvasCode?: string;
    canvasAreaType?: EnumCanvasAreaType;
  };

  type QueryCanvasAreaInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryCanvasAreaInfo;
  };

  type QueryCanvasInfo = {
    /** 画布代码 */
    canvasCode?: string;
    canvasType?: EnumCanvasType;
    /** 是否默认画布 */
    isDefault?: boolean;
  };

  type QueryCanvasInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryCanvasInfo;
  };

  type QueryContactsInfo = {
    /** 客户/供应商编码 */
    contactCode?: string;
    /** 客户/供应商名称 */
    contactName?: string;
    /** 机构名称 */
    organizationName?: string;
    /** 是否供应商:1-是,0-否 */
    isSupplier?: boolean;
    /** 是否客户:1-是,0-否 */
    isCustomer?: boolean;
    /** 电话号码 */
    phoneNumber?: string;
  };

  type QueryContactsInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryContactsInfo;
  };

  type QueryContainerInfo = {
    /** 容器档案编码 */
    containerCode?: string;
    /** 容器类型ID集 */
    containerTypeIds?: number[];
    /** 容器载货状态集 */
    carryStatuses?: EnumCarryStatus[];
    /** 是否启用 */
    isEnable?: boolean;
  };

  type QueryContainerInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryContainerInfo;
  };

  type QueryContainerTypeInfo = {
    /** 容器类型名称 */
    name?: string;
    /** 是否启用 */
    isEnable?: boolean;
  };

  type QueryContainerTypeInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryContainerTypeInfo;
  };

  type QueryContianerInventory = {
    /** 容器档案编码 */
    containerCode?: string;
    /** 容器类型ID集 */
    containerTypeIdList?: number[];
    /** 容器载货状态集 */
    carryStatusList?: EnumCarryStatus[];
    /** 容器位置编号（系统编号/自定义编号） */
    locationCode?: string;
  };

  type QueryContianerInventoryPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryContianerInventory;
  };

  type QueryDictionaryInfo = {
    /** 字典名称 */
    dictionaryName?: string;
    businessType?: EnumBusinessType;
  };

  type QueryDictionaryInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryDictionaryInfo;
  };

  type QueryDictionaryValueInfo = {
    /** 字典Id */
    dictionaryId?: number;
    /** 字典值 */
    dictionaryValue?: string;
    /** 字典值标签 */
    valueLabel?: string;
    /** 是否系统保留值 */
    isSystem?: boolean;
  };

  type QueryDictionaryValueInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryDictionaryValueInfo;
  };

  type QueryInventory = {
    /** 区域编号 */
    areaCode?: string;
    /** 排/行最小值 */
    rowMin?: number;
    /** 排/行最大值 */
    rowMax?: number;
    /** 列最小值 */
    columnMin?: number;
    /** 列最大值 */
    columnMax?: number;
    /** 层最小值 */
    layerMin?: number;
    /** 层最大值 */
    layerMax?: number;
    inventoryStatus?: EnumQualityStatus;
    /** 物料类型ID */
    materialTypeId?: number;
    /** 物料编号 */
    materialCode?: string;
    /** 开始收货时间 */
    beginReceivingTime?: string;
    /** 结束收货时间 */
    endReceivingTime?: string;
    /** 容器编号 */
    containerCode?: string;
    carryStatus?: EnumCarryStatus;
    /** 批次号 */
    batchNumber?: string;
    /** 是否过期 */
    isExpired?: boolean;
    /** 供应商Id */
    supplierId?: number;
  };

  type QueryInventoryJournal = {
    /** 托盘编号 */
    containerCode?: string;
    /** 物料编号 */
    materialCode?: string;
  };

  type QueryInventoryJournalPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryInventoryJournal;
  };

  type QueryInventoryPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryInventory;
  };

  type QueryInvoiceHeader = {
    /** 发货单编号 */
    invoiceCode?: string;
    /** 发货单状态 */
    invoiceStatusList?: EnumInvoiceStatus[];
    /** 波次号 */
    wavenumberCode?: string;
    qualityStatus?: EnumQualityStatus;
    /** 物料编号 */
    materialCode?: string;
    /** 物料批次号 */
    batchNumber?: string;
    /** 发货类型 */
    invoiceTypeId?: number;
    /** 出库区域 */
    outboundAreaId?: number;
  };

  type QueryInvoiceHeaderPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryInvoiceHeader;
  };

  type QueryInvoiceLineInfo = {
    /** 发货单编号 */
    invoiceCode?: string;
    /** 发货单状态 */
    invoiceLineStatusList?: EnumInvoiceStatus[];
    /** 物料编号 */
    materialCode?: string;
    /** 物料批次号 */
    batchNumber?: string;
  };

  type QueryInvoiceLineInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryInvoiceLineInfo;
  };

  type QueryLocationInfo = {
    /** 区域 */
    areaId?: number;
    /** 巷道 */
    tunnelId?: number;
    shelvesType?: EnumShelvesType;
    positionType?: EnumPositionType;
    /** 货位类型 */
    locationTypeId?: number;
    /** 报警状态 */
    isAlarm?: boolean;
    /** 允许入库 */
    allowStockIn?: boolean;
    /** 允许出库 */
    allowStockOut?: boolean;
    /** 总深位 */
    locationDepth?: number;
    /** 排-起始 */
    locationRowFrom?: number;
    /** 排-结束 */
    locationRowTo?: number;
    /** 列-起始 */
    locationColumnFrom?: number;
    /** 列-结束 */
    locationColumnTo?: number;
    /** 层-起始 */
    locationLayerFrom?: number;
    /** 层-结束 */
    locationLayerTo?: number;
    /** 库位编号 */
    locationCode?: string;
    /** 货位编号（自定义） */
    customCode?: string;
    locationStatus?: EnumLocationStatus;
    /** 库位空满 */
    isFull?: boolean;
    /** 是否盘点中 */
    isStocktaking?: boolean;
  };

  type QueryLocationInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryLocationInfo;
  };

  type QueryLocationTypeInfo = {
    /** 货位类型名称 */
    locationTypeName?: string;
  };

  type QueryLocationTypeInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryLocationTypeInfo;
  };

  type QueryMaterialInfo = {
    /** 物料编号 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料类型ID(允许多选) */
    materialTypeIdList?: number[];
    /** 物料类型ID（允许多选） */
    materialModelIdList?: number[];
  };

  type QueryMaterialInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryMaterialInfo;
  };

  type QueryMaterialInventory = {
    /** 物料类型ID */
    materialTypeId?: number;
    /** 物料编号 */
    materialCode?: string;
  };

  type QueryMaterialInventoryPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryMaterialInventory;
  };

  type QueryMaterialItemInfo = {
    /** 物料名称 */
    materialName?: string;
    /** 物料类型 */
    materialTypeId?: number;
    /** 物料标识 */
    materialUID?: string;
  };

  type QueryMaterialItemInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryMaterialItemInfo;
  };

  type QueryMaterialPackagingInfo = {
    /** 包装编码 */
    packagingCode?: string;
    /** 物料包装名称 */
    packagingName?: string;
    /** 是否最小包装 */
    isSkuPackaging?: boolean;
  };

  type QueryMaterialPackagingInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryMaterialPackagingInfo;
  };

  type QueryMenuInfo = {
    /** 菜单名称 */
    menuName?: string;
  };

  type QueryMenuInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryMenuInfo;
  };

  type QueryOutboundRequirementInfo = {
    /** 出库需求编号 */
    requirementCode?: string;
    /** 物料编号 */
    materialCode?: string;
    requirementStatus?: EnumRequirementStatus;
    requirementType?: EnumOutboundRequirementType;
    /** 添加时间-起始 */
    createTimeFrom?: string;
    /** 添加时间-结束 */
    createTimeTo?: string;
  };

  type QueryOutboundRequirementInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryOutboundRequirementInfo;
  };

  type QueryPadStocktakeLocation = {
    /** 货位编号，非必填 */
    locationCode?: string;
    /** 盘点计划号 */
    stocktakeCode?: string;
    /** 盘点计划状态 */
    stocktakeStatusList?: EnumStocktakeStatus[];
  };

  type QueryPadStocktakeLocationPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryPadStocktakeLocation;
  };

  type QueryPermissionInfo = {
    /** 授权名称 */
    permissionName?: string;
  };

  type QueryPermissionInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryPermissionInfo;
  };

  type QueryQualityInspection = {
    /** 质量状态 */
    qualityStatus?: number[];
    /** 批次号 */
    batchNumber?: string;
    /** 物料编号 */
    materialCode?: string;
    /** 收货单号 */
    receivingCode?: string;
    /** 开始收货时间 */
    beginReceivingTime?: string;
    /** 结束收货时间 */
    endReceivingTime?: string;
    /** 供应商id */
    supplierId?: number;
  };

  type QueryQualityInspectionPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryQualityInspection;
  };

  type QueryQualityTestInfo = {
    /** 质检单号 */
    qualityTestCode?: string;
    qualityTestStatus?: EnumQualityTestStatus;
    /** 是否搬运 */
    isCarry?: boolean;
    /** 物料编码 */
    materialCode?: string;
    /** 批次号 */
    batchNumber?: string;
  };

  type QueryQualityTestInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryQualityTestInfo;
  };

  type QueryReceiptHearderInfo = {
    /** 收货单号 */
    receiptCode?: string;
    /** 收货单状态 */
    receiptStatusList?: EnumReceiptStatus[];
    /** 是否需要审核 */
    isNeedAudit?: boolean;
    auditStatus?: EnumAuditStatus;
    /** 物料编号 */
    materialCode?: string;
    /** 物料批次号 */
    batchNumber?: string;
  };

  type QueryReceiptHearderInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryReceiptHearderInfo;
  };

  type QueryReceiptLineInfo = {
    /** 收货单号 */
    receiptCode?: string;
    /** 物料编号 */
    materialCode?: string;
    /** 物料批次号 */
    batchNumber?: string;
    /** 收货单行状态 */
    receiptLineStatusList?: EnumReceiptStatus[];
  };

  type QueryReceiptLineInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryReceiptLineInfo;
  };

  type QueryReportInventoryDailyInfo = {
    /** 报表起始日期 */
    reportDateFrom?: string;
    /** 报表截止日期 */
    reportDateTo?: string;
  };

  type QueryReportInventoryDailyInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryReportInventoryDailyInfo;
  };

  type QueryReportLocationDailyInfo = {
    /** 报表起始日期 */
    reportDateFrom?: string;
    /** 报表截止日期 */
    reportDateTo?: string;
  };

  type QueryReportLocationDailyInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryReportLocationDailyInfo;
  };

  type QueryReportTaskDailyInfo = {
    /** 报表起始日期 */
    reportDateFrom?: string;
    /** 报表截止日期 */
    reportDateTo?: string;
  };

  type QueryReportTaskDailyInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryReportTaskDailyInfo;
  };

  type QueryRoleInfo = {
    /** 角色名称 */
    roleName?: string;
  };

  type QueryRoleInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryRoleInfo;
  };

  type QueryRoutingInfo = {
    /** 路径编号 */
    code?: string;
    /** 路径名称 */
    name?: string;
    /** 起始区域名称 */
    fromAreaNames?: string[];
    /** 目标区域名称 */
    toAreaNames?: string[];
    /** 启用状态 */
    isEnable?: boolean;
  };

  type QueryRoutingInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryRoutingInfo;
  };

  type QueryStocktakeInfo = {
    /** 盘点计划号 */
    stocktakeCode?: string;
    stocktakeStatus?: EnumStocktakeStatus;
  };

  type QueryStocktakeInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryStocktakeInfo;
  };

  type QueryStocktakeLocation = {
    /** 盘点计划ID，必填 */
    stocktakeId?: number;
    /** 货位编号，非必填 */
    locationCode?: string;
  };

  type QueryStocktakeLocationPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryStocktakeLocation;
  };

  type QueryTaskInfo = {
    /** 任务编号 */
    taskCode?: string;
    /** 容器类型 */
    containerTypeId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 任务类型 */
    taskType?: EnumTaskType[];
    /** 任务状态 */
    taskStatus?: EnumTaskStatus[];
    /** 起始区域 */
    fromAreaId?: number;
    /** 目标区域 */
    toAreaId?: number;
    /** 起始位置 */
    fromPositionCode?: string;
    /** 目标位置 */
    toPositionCode?: string;
  };

  type QueryTaskInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryTaskInfo;
  };

  type QueryTunnelInfo = {
    /** 巷道编码 */
    tunnelCode?: string;
    /** 巷道名称 */
    tunnelName?: string;
    /** 巷道状态（启用/禁用） */
    tunnelState?: boolean;
  };

  type QueryTunnelInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryTunnelInfo;
  };

  type QueryUserInfo = {
    /** 用户名称 */
    userName?: string;
    /** 实名 */
    realName?: string;
    /** 工号 */
    jobNumber?: string;
    /** 手机号 */
    phoneNumber?: string;
    /** 部门名称 */
    departmentName?: string;
  };

  type QueryUserInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryUserInfo;
  };

  type QueryWarehouseInfo = {
    /** 仓库编码 */
    warehouseCode?: string;
    /** 仓库名称 */
    warehouseName?: string;
  };

  type QueryWarehouseInfoPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryWarehouseInfo;
  };

  type QueryWavenumberHead = {
    /** 波次单号 */
    wavenumberCode?: string;
    /** 波次单名称 */
    wavenumberName?: string;
    /** 波次单状态 */
    wavenumberStatus?: number[];
    /** 发货单号 */
    invoiceCode?: string;
    /** 物料编号 */
    materialCode?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 目标区域 */
    toAreaId?: number;
    /** 起始创建时间 */
    fromCreateTime?: string;
    /** 结束创建时间 */
    toCreateTime?: string;
  };

  type QueryWavenumberHeadPageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryWavenumberHead;
  };

  type QueryWavenumberLine = {
    /** 波次单号 */
    wavenumberCode?: string;
  };

  type QueryWavenumberLinePageingParameter = {
    /** 页索引 */
    pageIndex?: number;
    /** 页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortFiledList?: SortByModel[];
    query?: QueryWavenumberLine;
  };

  type R = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    statusCode?: EnumStatusCode;
    /** 接口执行结果数据 */
    resultData?: any;
  };

  type ReceiptCombineInfoDTO = {
    combineOption?: EnumCombineOption;
    /** 组盘位置编号 */
    locationCode?: string;
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    carryStatus?: EnumCarryStatus;
    /** 容器类型ID */
    containerTypeId?: number;
    combineItemList?: ReceiptCombineItemInfoDTO[];
  };

  type ReceiptCombineItemInfoDTO = {
    /** 物料标识 */
    materialUID?: string;
    /** 物料ID */
    materialId?: number;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 包装名称 */
    packagingName?: string;
    /** 规格 */
    materialSize?: string;
    qualityStatus?: EnumQualityStatus;
    /** 有效期(天数) */
    expiresDays?: number;
    /** 收货日期 */
    receivingDate?: string;
    /** 批次号 */
    batchNumber?: string;
    /** 收货数量 */
    quantity?: number;
    /** 供应商ID,ContactsInfo表主键 */
    supplierId?: number;
    /** 收货单号 */
    receiptCode?: string;
    /** 收货单行号 */
    receiptLineNumber?: string;
    /** 收货单行ID */
    receiptLineId?: number;
    /** 描述信息 */
    materialItemDescription?: string;
  };

  type ReceiptLineInfoDTO = {
    /** 收货单明细id */
    id?: number;
    /** 收货单号 */
    receiptCode?: string;
    /** 收货单行号 */
    receiptLineNumber?: string;
    /** 物料ID */
    materialId?: number;
    /** 物料批次号 */
    batchNumber?: string;
    qualityStatus?: EnumQualityStatus;
    /** 数量 */
    receivableQuantity?: number;
  };

  type ReportInventoryDailyInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 报表日期 */
    reportDate?: string;
    /** 库存数量 */
    inventoryTotal?: number;
    /** 收货物料总数 */
    receivingTotal?: number;
    /** 发货物料总数 */
    shipmentTotal?: number;
    /** 待检数量 */
    unCheckedTotal?: number;
    /** 良品数量 */
    qualifiedTotal?: number;
    /** 不良品数量 */
    unqualifiedTotal?: number;
  };

  type ReportInventoryDailyInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: ReportInventoryDailyInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type ReportInventoryDailyInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: ReportInventoryDailyInfoDTO[];
  };

  type ReportInventoryDailyInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: ReportInventoryDailyInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type ReportLocationDailyInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 报表日期 */
    reportDate?: string;
    /** 空库位总数 */
    emptyLocationTotal?: number;
    /** 放物料的库位总数 */
    fullContainerLocationTotal?: number;
    /** 放空容器的库位总数 */
    emptyContainerLocationTotal?: number;
  };

  type ReportLocationDailyInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: ReportLocationDailyInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type ReportLocationDailyInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: ReportLocationDailyInfoDTO[];
  };

  type ReportLocationDailyInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: ReportLocationDailyInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type ReportTaskDailyInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 报表日期 */
    reportDate?: string;
    /** 入库任务数 */
    inTotal?: number;
    /** 出库任务数 */
    outTotal?: number;
    /** 越库任务数 */
    crossTotal?: number;
    /** 移库任务数 */
    moveTotal?: number;
  };

  type ReportTaskDailyInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: ReportTaskDailyInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type ReportTaskDailyInfoDTOPageResult = {
    /** 页大小 */
    pageSize?: number;
    /** 页索引 */
    pageIndex?: number;
    /** 总数量 */
    totalCount?: number;
    /** 分页数据 */
    pageData?: ReportTaskDailyInfoDTO[];
  };

  type ReportTaskDailyInfoDTOPageResultR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: ReportTaskDailyInfoDTOPageResult;
    statusCode?: EnumStatusCode;
  };

  type ReportTaskInfoDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 任务编号 */
    taskCode?: string;
    /** 容器编码 */
    containerCode?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 物料数量 */
    materialQuantity?: number;
    taskStatus?: EnumTaskStatus;
    taskType?: EnumTaskType;
    taskExecuteType?: EnumTaskExecuteType;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type ReportTaskInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: ReportTaskInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type RequestLocationDTO = {
    /** 任务编号 */
    taskCode?: string;
    /** 托盘编号 */
    palletCode?: string;
    /** 当前目标位置 */
    toPosition?: string;
    /** 提交申请位置 */
    requestPosition?: string;
  };

  type RoleInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 权限ID */
    permissionId?: number;
    /** 角色名称 */
    roleName?: string;
    /** 描述信息 */
    roleDescription?: string;
  };

  type RoutingInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 路径编号，唯一 */
    code?: string;
    /** 路径名称 */
    name?: string;
    /** 起始区域 */
    fromArea?: number;
    /** 起始区域名称 */
    fromAreaName?: string;
    /** 目标区域 */
    toArea?: number;
    /** 目标区域名称 */
    toAreaName?: string;
    taskType?: EnumTaskType;
    taskExecuteType?: EnumTaskExecuteType;
    /** WCS名称配置，用于任务分发 */
    wcsName?: string;
    /** 是否空托解绑：1-是，0-否 */
    isEmptyDismiss?: boolean;
    /** 是否实托解盘：1-是，0-否 */
    isFullDismiss?: boolean;
    /** 启用状态 */
    isEnable?: boolean;
    /** 优先级 */
    priority?: number;
  };

  type SelectItem = {
    /** 选项ID */
    itemId?: string;
    /** 选项值 */
    itemValue?: string;
    /** 选项名称 */
    itemName?: string;
    /** 数据项目 */
    dataItem?: any;
  };

  type SelectItemListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: SelectItem[];
    statusCode?: EnumStatusCode;
  };

  type SideViewDTO = {
    /** 显示编号 */
    displayCode?: string;
    /** 仓库ID */
    warehouseId?: string;
    /** 区域ID */
    areaId?: string;
    /** 巷道ID */
    tunnelId?: string;
    /** 排 */
    locationRow?: number;
    /** 列 */
    locationColumn?: number;
    /** 层 */
    locationLayer?: number;
    /** x轴 */
    xaxis?: number;
    /** y轴 */
    yaxis?: number;
    /** 库位总数 */
    locationCount?: number;
    /** 满库位总数 */
    fullLocationCount?: number;
  };

  type SortByModel = {
    /** 排序字段 */
    fieldName?: string;
    sortType?: EnumSortType;
  };

  type StocktakeInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 盘点计划号 */
    stocktakeCode?: string;
    /** 搬运目标区域 */
    targetAreaId?: number;
    /** 盘点计划描述 */
    stocktakeDescription?: string;
  };

  type StocktakeLocationInfoDTO = {
    /** 盘点库位ID */
    stocktakeLocationId?: number;
    /** 被盘库位Id */
    locationId?: number;
    /** 被盘库位编号 */
    locationCode?: string;
    /** 被盘库位编号(自定义)-显示 */
    customCode?: string;
    /** 当前容器位置 */
    containerPosition?: string;
    /** 当前容器位置编号-显示 */
    containerPositionCode?: string;
    containerPositionType?: EnumPositionType;
    /** 容器ID */
    containerId?: number;
    /** 容器编号-显示 */
    containerCode?: string;
    /** 是否允许回库-显示 */
    isAllowReturn?: boolean;
  };

  type StocktakeRecordInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 盘点计划号 */
    stocktakeCode?: string;
    stocktakeStatus?: EnumStocktakeStatus;
    /** 被盘点库位编号 */
    locationCode?: string;
    /** 被盘库位编号(自定义)-显示 */
    customCode?: string;
    /** 容器编号 */
    containerCode?: string;
    /** 物料编号 */
    materialCode?: string;
    /** 物料名称 */
    materialName?: string;
    /** 规格 */
    materialSize?: string;
    /** 批次号 */
    batchNumber?: string;
    qualityStatus?: EnumQualityStatus;
    /** 盘前库存数量 */
    stocktakeQuantity?: number;
    /** 盘后数量 */
    adjustedQuantity?: number;
    stocktakeRecordStatus?: EnumStocktakeRecordStatus;
    /** 盈亏备注 */
    stocktakeRecordRemark?: string;
  };

  type StocktakeRecordInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: StocktakeRecordInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type StringListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: string[];
    statusCode?: EnumStatusCode;
  };

  type StringR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: string;
    statusCode?: EnumStatusCode;
  };

  type SysAreaReceivingSettingDTO = {
    id?: number;
    areaID?: number;
    receivingBusinessType?: EnumSysReceivingBusinessType;
    receivingBusinessTypeDes?: string;
    isAllow?: boolean;
    isTransit?: boolean;
  };

  type SysParamInfo = {
    id?: number;
    group?: string;
    name?: string;
    key?: string;
    type?: EnumParamType;
    value?: string;
    isConfigurable?: boolean;
    isDisable?: boolean;
  };

  type TaskApplyDTO = {
    /** 托盘编号 */
    palletCode?: string;
    /** 申请取货位置 */
    requestPosition?: string;
    /** 申请放货位置 */
    requestPutPosition?: string;
    /** 任务类型 （1、入库。2、出库。3、移库） */
    taskType?: number;
    /** 托盘载货状态（0未知、1空、2满） */
    carryState?: number;
    /** 货物类型 */
    cargoType?: number;
    /** 设备触发任务提交的参数Json字符串 */
    cargoParams?: string;
  };

  type TaskInfo = {
    id?: number;
    taskCode?: string;
    dependentTaskId?: number;
    taskPriority?: number;
    containerTypeId?: number;
    containerId?: number;
    taskType?: EnumTaskType;
    taskStatus?: EnumTaskStatus;
    isToWcs?: boolean;
    locationGroupID?: number;
    allotLocationSortMode?: EnumAllotLocationSortMode;
    isLockRealLocation?: boolean;
    routingId?: number;
    taskExecuteType?: EnumTaskExecuteType;
    fromAreaId?: number;
    toAreaId?: number;
    fromPositionCode?: string;
    toPositionCode?: string;
    postStatus?: EnumPostStatus;
    postStatusDescription?: string;
    isAlarm?: boolean;
    taskAlarmType?: EnumTaskAlarmType;
    alarmDescription?: string;
    createTime?: string;
    updateUserName?: string;
    updateTime?: string;
  };

  type TaskInfoR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: TaskInfo;
    statusCode?: EnumStatusCode;
  };

  type ToPositionDTO = {
    /** 分配的目标库位 */
    toPosition?: string;
  };

  type ToPositionDTOWCSResponseResult = {
    /** 接口执行结果是否成功（200代表执行成功） */
    status?: number;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: ToPositionDTO;
    /** 是否还有后续任务，WCS以此判断是否释放当前小车空闲 */
    isNextTask?: boolean;
  };

  type TunnelInfoDTO = {
    /** 主键id */
    id?: number;
    /** 巷道编码 */
    tunnelCode?: string;
    /** 巷道名称 */
    tunnelName?: string;
    /** 所属仓库 */
    warehouseId?: number;
    /** 所属区域 */
    areaId?: number;
    /** 关联货排，多个排号逗号隔开 */
    relationRows?: string;
    /** 巷道状态（启用/禁用） */
    tunnelState?: boolean;
    /** 巷道描述 */
    tunnelDescribe?: string;
  };

  type UpdataPermissionItemInfoDTO = {
    /** 权限ID */
    permissionId?: string;
    /** 权限明细 */
    permissionItemInfosDTO?: PermissionItemInfoDTO[];
  };

  type UpdateAllocationDTO = {
    /** 出库需求ID */
    requirementId?: number;
    /** 取消的分配明细ID集合 */
    allocationItemIdList?: number[];
  };

  type UpdateMenuInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 父级菜单ID,为0时是菜单根节点 */
    parentId?: number;
    /** 所属系统编号 */
    systemCode?: string;
    /** 菜单名称 */
    menuName?: string;
    /** 菜单标题 */
    menuTitle?: string;
    /** vue组件名称 */
    vueComponent?: string;
    /** 菜单（页面）地址 */
    menuUrl?: string;
    /** 菜单图标 */
    menuIcon?: string;
    /** 菜单排序 */
    menuSort?: number;
    /** 多语言标识 */
    menuLanguageSign?: string;
    /** 功能权限 */
    functionList?: FunctionInfoDTO[];
  };

  type UpLoadTaskErrorDTO = {
    /** 任务编号 */
    taskCode?: string;
    /** 托盘编号 */
    palletCode?: string;
    /** 异常类型（0未知、1占位异常、2取空异常） */
    errorType?: number;
  };

  type UpLoadTaskStatusDTO = {
    /** 任务编号 */
    taskCode?: string;
    /** 托盘编号 */
    palletCode?: string;
    /** 任务状态（2执行中、5取货完成、6放货完成，7任务完成） */
    taskStatus?: number;
    /** 取货位置 */
    fromPosition?: string;
    /** 放货位置 */
    toPosition?: string;
  };

  type UserInfoDTO = {
    /** 主键，雪花ID */
    id?: number;
    /** 所属角色 */
    roleId?: number;
    /** 账号名称 */
    userName?: string;
    /** 账号密码 */
    userPwd?: string;
    /** 用户头像 */
    avator?: string;
    /** 姓名 */
    realName?: string;
    userSex?: EnumSex;
    /** 出生日期 */
    birthday?: string;
    /** 工号 */
    jobNumber?: string;
    /** 电话 */
    phoneNumber?: string;
    /** email */
    userEmail?: string;
    /** 部门名称 */
    departmentName?: string;
  };

  type UserPermissionDTO = {
    /** 主键，雪花ID */
    id?: string;
    /** 所属角色 */
    roleId?: string;
    /** 角色名称 */
    roleName?: string;
    /** 是否超级管理员 */
    isAdmin?: boolean;
    /** 账号名称 */
    userName?: string;
    /** 用户头像 */
    avator?: string;
    /** 姓名 */
    realName?: string;
    userSex?: EnumSex;
    userSexDisplay?: string;
    /** 出生日期 */
    birthday?: string;
    /** 工号 */
    jobNumber?: string;
    /** 电话 */
    phoneNumber?: string;
    /** email */
    userEmail?: string;
    /** 部门名称 */
    departmentName?: string;
    /** 添加者 */
    createName?: string;
    /** 添加时间 */
    createTime?: string;
    /** 权限 */
    permission?: OutputMenuInfoDTO[];
  };

  type UserPermissionDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: UserPermissionDTO;
    statusCode?: EnumStatusCode;
  };

  type WaitAllocationItemInfoDTO = {
    /** 主键ID */
    id?: number;
    /** 出库需求ID */
    outboundRequirementId?: number;
    /** 库存ID */
    inventoryId?: number;
    /** 已分配数量 */
    quantity?: number;
    /** 容器ID */
    containerId?: number;
    /** 容器编号 */
    containerCode?: string;
    /** 库位ID/工作台ID */
    locationId?: number;
    /** 容器库位编码 */
    locationCode?: string;
    /** 库位编码（自动义） */
    customCode?: string;
    /** 容器所处区域 */
    areaId?: number;
    /** 容器所处区域编号 */
    areaCode?: string;
    /** 容器所处区域 */
    areaName?: string;
    qualityStatus?: EnumQualityStatus;
    /** 物料编码 */
    materialCode?: string;
    /** 收货日期 */
    receivingDate?: string;
    /** 是否拣选完成 */
    isPickingFinish?: boolean;
    /** 拣选数量 */
    pickingQuantity?: number;
    /** 是否取消 */
    isCancel?: boolean;
    /** 已分配锁定库存 */
    lockQuantity?: number;
  };

  type WaitAllocationItemInfoDTOListR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    /** 接口执行结果数据 */
    resultData?: WaitAllocationItemInfoDTO[];
    statusCode?: EnumStatusCode;
  };

  type WarehouseInfoDTO = {
    /** 仓库id */
    id?: number;
    /** 仓库编码 */
    warehouseCode?: string;
    /** 仓库名称 */
    warehouseName?: string;
    /** 仓库别名 */
    warehouseOtherName?: string;
    /** 仓库描述 */
    warehouseDescribe?: string;
  };

  type WarehouseInfoDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: WarehouseInfoDTO;
    statusCode?: EnumStatusCode;
  };

  type WarehouseSummaryDTO = {
    /** 物料总库存 */
    materialInventoryTotal?: number;
    /** 满托盘数 */
    fullContainerTotal?: number;
    /** 空托盘数 */
    emptyContainerTotal?: number;
    /** 库容 */
    locationTotal?: number;
    /** 满库位 */
    fullLocationTotal?: number;
    /** 空库位 */
    emptyLocationTotal?: number;
  };

  type WarehouseSummaryDTOR = {
    /** 接口执行结果是否成功 */
    success?: boolean;
    /** 接口执行结果信息（一般执行异常返回异常消息） */
    message?: string;
    resultData?: WarehouseSummaryDTO;
    statusCode?: EnumStatusCode;
  };

  type WavenumberHeaderInfoDTO = {
    /** 波次id */
    id?: number;
    /** 波次单头编号 */
    wavenumberCode?: string;
    /** 波次单名称 */
    wavenumberName?: string;
    wavenumberStatus?: EnumWavenumberStatus;
    /** 描述信息 */
    waveHeaderDescription?: string;
    /** 搬运目标区域 */
    toAreaId?: number;
    /** 创建时间 */
    createTime?: string;
  };

  type WavenumberLineInfoDTO = {
    /** 波次行Id */
    id?: number;
    /** 波次单号 */
    wavenumberCode?: string;
    /** 波次单行行号 */
    wavenumberLineNumber?: string;
    /** 物料ID */
    materialId?: number;
    /** 物料编号 */
    materialCode?: string;
    /** 物料型号ID */
    materialModelId?: number;
    /** 物料型号 */
    materialModelName?: string;
    /** 物料批次号 */
    batchNumber?: string;
    /** 数量 */
    quantity?: number;
    wavenumberLineStatus?: EnumWavenumberStatus;
    /** 是否自动完成 */
    isAutocomplete?: boolean;
    /** 描述信息 */
    wavenumberLineDescription?: string;
  };

  type WeatherForecast = {
    date?: string;
    temperatureC?: number;
    temperatureF?: number;
    summary?: string;
  };

  type InStockApplyBody = {
    fromLocationCode: string;
    materialCode: string;
    isabnormalTray: boolean;
    lpn: string;
    productType: string;
    productName: string;
    materialTypeId: number;
    grade: string;
    boxType: number;
    stackQuantity: number;
    stackLayer: string;
    stackLocation: string;
    country: string;
    outDate: string;
    colour: string;
    batchNo: string;
    bag: string;
    weight: string;
    supplierCD: string;
    fromSys: string;
  };
}
