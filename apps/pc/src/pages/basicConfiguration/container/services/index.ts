import { get, post, del, put } from "@/http/request";
class _Container {
	private apiDict = {
		container: "/Container",
		containerType: "/ContainerType"
	};

	// Container -- 容器档案管理
	public getContainerData = (params: any = "") => post(`${this.apiDict.container}/GetPageData`, { ...params });
	public getContainerList = () => get(`/Container/GetContainerSelectItem`);
	public delContainer = (params: any = "") => del(`${this.apiDict.container}/Delete?id=${params}`);
	public addContainer = (params: any = "") => post(`${this.apiDict.container}/Add`, { ...params });
	public updateContainer = (params: any = "") => put(`${this.apiDict.container}/Update`, { ...params });

	// - ContainerType -- 容器类型管理
	public getContainerTypeData = (params: any = "") => post(`${this.apiDict.containerType}/GetPageData`, { ...params });
	public delContainerType = (params: any = "") => del(`${this.apiDict.containerType}/Delete?id=${params}`);
	public addContainerType = (params: any = "") =>
		post(`${this.apiDict.containerType}/Add`, {
			...params,
			emptyIco: "",
			emptyStackIco: "",
			fullIco: "",
			halfFullIco: ""
		});
	public updateContainerType = (params: any = "") => put(`${this.apiDict.containerType}/Update`, { ...params });
	public getCarryStatus = () => get(`/Enum/GetSelectItemList?enumName=EnumCarryStatus`);

}

export default new _Container();
