import {
    getApiLocationGetAreaLocationList,
} from 'apis';
import useOptions from './useOptions';
import type { API } from 'apis';

export default function useLocationOptions() {
    const locationService = () =>
        getApiLocationGetAreaLocationList({}).then(
            (res: API.AreaLocationDTOListR) => res?.resultData ?? []
        );

    const { options, run } = useOptions<API.AreaLocationDTO>(
        locationService,
        (opt) => ({ 
            ...opt, 
            text: `${opt.areaCode}(${opt.areaName})`, 
            value: `${opt.areaCode}(${opt.areaName})`, 
            children: (opt?.locationSelectItemList ?? []).map(loca => ({
                ...loca,
                key: loca.itemValue! + loca.itemId!,
                id: loca.itemId,
                value: loca.itemName,
                text: loca.itemName,
            }))
        })
    );

    return {
        options,
        run
    }
}