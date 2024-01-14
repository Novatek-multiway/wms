import { useRequest } from 'ahooks';
import { getApiEnumGetSelectItemList } from 'apis';
import { useMemo } from 'react';

import type { API } from 'apis';
//  /api/Enum/GetAllEnumNameList
export type TEnumName =
  | 'Enum3DLocationStatus'
  | 'EnumAutoAllocationStatus'
  | 'EnumAllotLocationMode'
  | 'EnumAllotLocationProcessType'
  | 'EnumAllotLocationSortMode'
  | 'EnumAllotLocationType'
  | 'EnumAreaState'
  | 'EnumAreaType'
  | 'EnumAuditStatus'
  | 'EnumBusinessType'
  | 'EnumCanvasAreaType'
  | 'EnumCanvasType'
  | 'EnumCombineOperationType'
  | 'EnumCombineOption'
  | 'EnumContainerCarryStatus'
  | 'EnumContainerPosition'
  | 'EnumCurrentRCLState'
  | 'EnumDisplayType'
  | 'EnumEntityState'
  | 'EnumInboundType'
  | 'EnumInvoiceStatus'
  | 'EnumLocationStatus'
  | 'EnumMessageReadState'
  | 'EnumMessageState'
  | 'EnumMessageType'
  | 'EnumOutboundRequirementType'
  | 'EnumParamType'
  | 'EnumPositionType'
  | 'EnumPostStatus'
  | 'EnumQualityStatus'
  | 'EnumQualityTestStatus'
  | 'EnumReceiptStatus'
  | 'EnumRequirementStatus'
  | 'EnumSex'
  | 'EnumShelvesType'
  | 'EnumSortType'
  | 'EnumStatusCode'
  | 'EnumStocktakeExceptionType'
  | 'EnumStocktakeRecordStatus'
  | 'EnumStocktakeStatus'
  | 'EnumStocktakeType'
  | 'EnumSysReceivingBusinessType'
  | 'EnumTaskAlarmType'
  | 'EnumTaskExecuteType'
  | 'EnumTaskStatus'
  | 'EnumTaskType'
  | 'EnumWavenumberLineStatus'
  | 'EnumWavenumberStatus'
  | 'EnumInventoryJournalType'
  | 'EnumUnbindingType'
  | 'EnumCarryStatus';

export interface OptionItem extends API.Int32SelectItem {
  label: string;
  value: any;
  disabled?: boolean;
  children?: OptionItem[];
}

export type TValueField = Exclude<keyof API.Int32SelectItem, 'itemName'>;

export default function useEnumOptions(
  enumName: TEnumName,
  valueField: TValueField,
  manual = false
) {
  const service = (): Promise<API.Int32SelectItemListR> =>
    getApiEnumGetSelectItemList({ enumName });
  const { data, run } = useRequest(service, { manual });
  const options = useMemo<OptionItem[]>(() => {
    return (data?.resultData ?? []).map((item) => ({
      label: item.itemName!,
      value: item[valueField]!,
      ...item,
    }));
  }, [data]);

  return {
    options,
    run,
  };
}
