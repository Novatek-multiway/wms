import { useMemo } from 'react';
import useConvertorRequest from "./useConvertorRequest";
import { t } from "i18next";

export const STATUS_COLOR_MAP = {
    New: 'processing',                              //  新增
    ToBeAllocated: 'processing',                    //  待分配
    Allocating: 'processing',                       //  分配中
    AllocationException: 'error',                   //  分配异常
    Outbound: 'processing',                         //  出库中
    Finish: 'success',                              //  完成
    Complete: 'success',                              //  完成
    Cancel: 'default',                              //  取消
    ManualFinish: 'success',                        //  手动完成
    Waiting: 'processing',                          //  待收货
    Receiving: 'processing',                        //  收货中
    Stocktaking: 'processing',                      //  盘点中
    Adjustment: 'processing',                       //  待调账
}

export type StatusKey = keyof typeof STATUS_COLOR_MAP;

interface IBadgeProps {
    title: string;
    color: string;
}

export type IRecordBadge = Record<string, IBadgeProps>

const initialValue = {
    default: {
        type: STATUS_COLOR_MAP.Cancel,
        title: t('无')
    }
};

export default function useStatusOptions(service: () => Promise<any>) {
    const options = useConvertorRequest(service, opt => ({ ...opt, label: opt.itemName, value: opt.itemId }), ['resultData']);
    const statusEnum = useMemo<IRecordBadge>(() => {
		return options.reduce<IRecordBadge>((acc, cur) => {
			acc[cur.value] = {
				type: STATUS_COLOR_MAP[cur.itemValue as StatusKey],
				title: cur.label
			}
			return acc
		}, initialValue)
	}, [options])
    return {
        options,
        statusEnum
    }
}