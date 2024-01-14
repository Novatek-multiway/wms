import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
// import useConvertorRequest from "./useConvertorRequest";
import useEnumOptions, { TEnumName, TValueField } from './useEnumOptions';

export const STATUS_COLOR_MAP = {
  New: 'processing', //  新增
  Add: 'processing', //  新增
  ToBeAllocated: 'processing', //  待分配
  Executing: 'processing', //  待分配
  Allocating: 'processing', //  分配中
  AllocationException: 'error', //  分配异常
  Outbound: 'processing', //  出库中
  Finish: 'success', //  完成
  Complete: 'success', //  完成
  Cancel: 'default', //  取消
  Error: 'Error', //  取消
  ManualFinish: 'success', //  手动完成
  Waiting: 'processing', //  待收货
  Receiving: 'processing', //  收货中
  Stocktaking: 'processing', //  盘点中
  Adjustment: 'processing', //  待调账
};

export type StatusKey = keyof typeof STATUS_COLOR_MAP;

interface IBadgeProps {
  status: string;
  text: string;
}

export type IRecordBadge = Record<string, IBadgeProps>;

const initialValue = {
  default: {
    status: STATUS_COLOR_MAP.Cancel,
    text: '',
  },
};

export default function useStatusOptions(
  enumName: TEnumName,
  valueField: TValueField,
  manual = false
) {
  const { options } = useEnumOptions(enumName, valueField, manual);
  const statusEnum = useMemo<IRecordBadge>(() => {
    return options.reduce<IRecordBadge>((acc, cur) => {
      acc[cur.value] = {
        status: STATUS_COLOR_MAP[cur.itemValue as StatusKey],
        text: cur.label,
      };
      return acc;
    }, initialValue);
  }, [options]);
  return {
    options,
    statusEnum,
  };
}
