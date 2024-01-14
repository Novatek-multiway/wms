import { get } from '@/http/request'

export const GetCanvasMain = <T>() => get<T>('/Canvas/GetCanvasMain')

export const GetCanvasArea = <T>() => get<T>('/CanvasArea/GetCanvasArea')

export const GetCustomArea = <T>() => get<T>('/CanvasArea/GetCustomArea')

interface IGetRowInfoByArea {
    canvasRow: number
}
export const GetRowInfoByArea = <T>(params: IGetRowInfoByArea) => get<T>('/Location/GetRowInfoByArea', { ...params })