import { getApiLocationGetAreaLocationList } from 'apis';
import { useOptions } from 'multiway';
import { useMemo } from 'react';
import type { API } from 'apis';

type TLocationValueField = 'itemValue' | 'itemId';

interface ILocation extends API.AreaLocationDTO {
  label: string;
  value: number;
}

export default function useLocationCodeOptions(
  locationValueField: TLocationValueField = 'itemValue',
  autoload = true
) {
  //	组盘位置
  const { options: locationCodeList, load } = useOptions(getApiLocationGetAreaLocationList, {
    params: { pageIndex: 1, pageSize: 100 },
    path: ['resultData'],
    transform: (item: API.AreaLocationDTO): ILocation => ({
      ...item,
      label: `${item.areaCode}(${item.areaName})`,
      value: item.id!,
    }),
    autoload
  });

  const locationCodeOptions = useMemo(
    () =>
      (locationCodeList as ILocation[]).map((item) => ({
        ...item,
        value: item.value,
        label: item.label,
        key: item.id,
        children: (item?.locationSelectItemList ?? []).map((opt) => ({
          ...opt,
          key: opt.itemValue! + opt.itemId!,
          id: opt.itemId,
          value: opt[locationValueField],
          label: opt.itemName,
        })),
      })),
    [locationCodeList]
  );

  return { locationCodeOptions, load };
}
