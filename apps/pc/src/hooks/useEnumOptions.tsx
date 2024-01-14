import useConvertorRequest, { OptionItem } from "./useConvertorRequest";
import { get } from "@/http/request";

interface IEnumItem {
    itemId: string;
    itemValue: string;
    itemName: string;
}

//  /api/Enum/GetAllEnumNameList
type TEnumName = "Enum3DLocationStatus" | 
"EnumAutoAllocationStatus" | 
"EnumAllotLocationMode" | 
"EnumAllotLocationProcessType" | 
"EnumAllotLocationSortMode" | 
"EnumAllotLocationType" | 
"EnumAreaState" | 
"EnumAreaType" | 
"EnumAuditStatus" | 
"EnumBusinessType" | 
"EnumCanvasAreaType" | 
"EnumCanvasType" | 
"EnumCombineOperationType" | 
"EnumCombineOption" | 
"EnumContainerCarryStatus" | 
"EnumContainerPosition" | 
"EnumCurrentRCLState" | 
"EnumDisplayType" | 
"EnumEntityState" | 
"EnumInboundType" | 
"EnumInvoiceStatus" | 
"EnumLocationStatus" | 
"EnumMessageReadState" | 
"EnumMessageState" | 
"EnumMessageType" | 
"EnumOutboundRequirementType" | 
"EnumParamType" | 
"EnumPositionType" | 
"EnumPostStatus" | 
"EnumQualityStatus" | 
"EnumQualityTestStatus" | 
"EnumReceiptStatus" | 
"EnumRequirementStatus" | 
"EnumSex" | 
"EnumShelvesType" | 
"EnumSortType" | 
"EnumStatusCode" | 
"EnumStocktakeExceptionType" | 
"EnumStocktakeRecordStatus" | 
"EnumStocktakeStatus" | 
"EnumStocktakeType" | 
"EnumSysReceivingBusinessType" | 
"EnumTaskAlarmType" | 
"EnumTaskExecuteType" | 
"EnumTaskStatus" | 
"EnumTaskType" | 
"EnumWavenumberLineStatus" | 
"EnumWavenumberStatus" | 
"EnumInventoryJournalType"

type TValueField = Exclude<keyof IEnumItem, 'itemName'>

export default function useEnumOptions(enumName: TEnumName, valueField: TValueField = 'itemValue'): OptionItem[] {
    const request = () => get<IEnumItem[]>('/Enum/GetSelectItemList',  { enumName });
    const enumOptions = useConvertorRequest(request , { label: "itemName" ,  value: valueField } ,  ["resultData"])
    return enumOptions;
}