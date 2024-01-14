import { get, post, del, put } from "@/http/request";
class TaskInfo {
	public AddTask = (params: any = "") => post("/Task/Add", params);
	public GetPageDataTask = (params: any = "") => post("/Task/GetPageData", params);
	public ManualFinish = (body: { id: string; targetLocation: string }) => post("/Task/ManualFinish", body);
	public CancelTask = (params: { taskId: string; }) => get("/Task/Cancel", params);
	public OperateTask = (params: any = "") => put("/Task/Operate", params);
	public UpdateTask = (params: any = "") => put("/Task/Update", params);
	public UpdatePostStatusTask = (params: any = "") => get("/Task/UpdatePostStatus", params);
	public StorageMova = (params: any = "") => get("/Storage/Move", params);
	public getContainerData = (params: any = "") => post(`/container/GetPageData`, { ...params });
}

export default new TaskInfo();
