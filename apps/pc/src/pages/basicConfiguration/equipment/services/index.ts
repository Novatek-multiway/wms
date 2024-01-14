import { get, post, del, put } from "@/http/request";
class _Equipment {
	private apiDict = {
		equipment: "/Equipment",
		equipmentType: "/EquipmentType"
	};

	// Container -- 设备档案管理
	public getEquipmentData = (params: any = "") => post(`${this.apiDict.equipment}/GetPageData`, { ...params });
	public delEquipment = (params: any = "") => del(`${this.apiDict.equipment}/Delete?id=${params}`);
	public addEquipment = (params: any = "") => post(`${this.apiDict.equipment}/Add`, { ...params });
	public updateEquipment = (params: any = "") => put(`${this.apiDict.equipment}/Update`, { ...params });

	// - ContainerType -- 设备类型管理
	public getEquipmentTypeData = (params: any = "") => post(`${this.apiDict.equipmentType}/GetPageData`, { ...params });
	public delEquipmentType = (params: any = "") => del(`${this.apiDict.equipmentType}/Delete?id=${params}`);
	public addEquipmentType = (params: any = "") => post(`${this.apiDict.equipmentType}/Add`, { ...params });
	public updateEquipmentType = (params: any = "") => put(`${this.apiDict.equipmentType}/Update`, { ...params });
}

export default new _Equipment();
