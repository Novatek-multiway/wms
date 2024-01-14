import { get, post, del, put } from "@/http/request";
import type { DictionaryInfoDTO, OutputDictionaryInfoDTOPageResult } from "../common/type";
class Dictionary {
	private apiDict = {
		dictionary: "/Dictionary",
	};
	public addDictionary = (data: DictionaryInfoDTO) => post<boolean>(`${this.apiDict.dictionary}/AddDictionary`, { ...data, id: 0, parentId: 0 });	// parentId新增时默认0，isDeleted默认false, id为0
	public deleteDictionary = (params: any = "") => del<boolean>(`${this.apiDict.dictionary}/DeleteDictionary?id=${params}`);
    public updateDictionary = (data: any = "") => post<boolean>(`${this.apiDict.dictionary}/UpdateDictionary`, { ...data });
    public getDictionaryPageData = (data: any = "") => post<OutputDictionaryInfoDTOPageResult>(`${this.apiDict.dictionary}/GetDictionaryPageData`, { ...data });
	public getBusinessTypeOptions = () => get(`/Enum/GetSelectItemList?enumName=EnumBusinessType`);
}

export default new Dictionary();
