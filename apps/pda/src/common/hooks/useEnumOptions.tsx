import { getApiEnumGetSelectItemList } from 'apis';

import type { API } from 'apis';
import useOptions from './useOptions';
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

export default function useEnumOptions(enumName: TEnumName) {
  const service = (): Promise<API.Int32SelectItemListR> =>
    getApiEnumGetSelectItemList({ enumName });
  const props = useOptions<API.Int32SelectItem>(
    () => service().then((res) => res?.resultData ?? []),
    (opt) => ({ ...opt, value: opt.itemName, text: opt.itemName })
  );
  return props;
}
