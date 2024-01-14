import { useRequest } from 'ahooks';
import { getPadContainerInventoryGetContainerTypeList } from 'apis';
import { useMemo } from 'react';
import { TEnumName, TValueField, OptionItem } from './useEnumOptions';
import type { API } from 'apis';

export default function useContainerTypeList(manual: boolean) {
  const { data, run } = useRequest(getPadContainerInventoryGetContainerTypeList, { manual });
  const options = useMemo(
    () =>
      (data?.resultData ?? []).map((item) => ({
        ...item,
        value: item.itemValue,
        label: item.itemName!,
      })),
    [data]
  );
  return {
    options,
    run,
  };
}
