import { get } from "@/http/request";

export const getCanvasMain = () => get<ResultMessageOfString>("/Canvas3D/GetMain");

export const getCanvasArea = (canvasId: string) => get<ResultMessageOfString>("/Canvas3D/GetAreaList", { canvasId });

export const getCustomArea = () => get<ResultMessageOfString>("/Canvas3D/GetCustomAreaList");

export const getLocationInfo = (id: string) => get<ResultMessageOfString>("/Canvas3D/GetLocationDetailById", { id });

interface IEnumItem {
    itemId: number;
    itemName: string;
    itemValue: string;
}

export const getEnum3DLocationStatus = () => get<IEnumItem[]>("/Enum/GetSelectItemList", { enumName: 'Enum3DLocationStatus' });