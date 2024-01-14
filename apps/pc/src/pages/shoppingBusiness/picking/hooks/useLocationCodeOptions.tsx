import useConvertorRequest from "@/hooks/useConvertorRequest";
import { getWorkbenchData } from "@/pages/basicConfiguration/material/services/materialFile";
import { useOptions } from "multiway";
import { useMemo } from 'react';

type TLocationValueField = 'itemValue' | 'itemId';

export default function useLocationCodeOptions(locationValueField: TLocationValueField = 'itemValue') {
	//	组盘位置
    const { options: locationCodeList, load } = useOptions(getWorkbenchData, {
		params: { pageIndex: 1, pageSize: 100 },
		path: ['resultData'],
		transform: item => ({
			...item,
			label: `${item.areaCode}(${item.areaName})`,
			value: item.id,
		})
	});

    const locationCodeOptions = useMemo(() => locationCodeList.map(item => ({
		...item,
		value: item.value,
		label: item.label,
		key: item.id,
		children: item.locationSelectItemList.map(opt => ({
			...opt,
			key: opt.itemValue + opt.itemId,
			id: opt.itemId,
			value: opt[locationValueField],
			label: opt.itemName,
		}))
	})), [locationCodeList])

    return { locationCodeOptions, load }
}