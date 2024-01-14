import { useRequest } from 'ahooks';
import { getApiEnumGetSelectItemList } from 'apis';
import { useMemo } from 'react';
import { TEnumName, TValueField } from './useEnumOptions';
import type { API } from 'apis';

interface IMapItem extends API.Int32SelectItem {
  label: string;
}

export default function useEnumMap(enumName: TEnumName, mapKey: TValueField, manual: boolean) {
  const service = (): Promise<API.Int32SelectItemListR> =>
    getApiEnumGetSelectItemList({ enumName });
  const { data, run } = useRequest(service, { manual });

  const map = useMemo<Record<string, IMapItem>>(
    () =>
      (data?.resultData ?? []).reduce<Record<string, IMapItem>>((acc, cur) => {
        const key = cur[mapKey] as string;
        acc[key] = {
          ...cur,
          label: cur.itemName!,
        };
        return acc;
      }, {}),
    [data]
  );

  return {
    map,
    run,
  };
}
