import { useRequest } from 'ahooks';
import { GetContainerTypeList } from 'apis';
import { useMemo } from 'react';
import { TEnumName, TValueField, OptionItem } from './useEnumOptions';
import type { API } from 'apis';

export default function useContainerTypeList(manual: boolean) {
  const { data, run } = useRequest(GetContainerTypeList, { manual });
  const options = useMemo(
    () =>
      (data?.resultData ?? []).map((item) => ({
        ...item,
        value: item.id,
        label: item.name!,
      })),
    [data]
  );
  return {
    options,
    run,
  };
}
