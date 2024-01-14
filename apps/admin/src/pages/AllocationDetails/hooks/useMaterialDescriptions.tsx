import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { DEFAULT_MATIERAL_DES } from '../constants';
import { OptionItem } from '@/common/hooks/useEnumOptions';
import type { API } from 'apis';
import { t } from 'i18next';
interface IProps {
  record: API.OutputInvoiceLineDTO;
  tableData: API.OutputInventoryInfoDTO[];
  statusOptions: OptionItem[];
}

interface IDescriptionsItem {
  label: string;
  value: string | number;
}

export default function useMaterialDescriptions({ record, tableData, statusOptions }: IProps) {
  // console.log('record: ', record);
  return useMemo<IDescriptionsItem[]>(() => {
    const defaultDescriptions: IDescriptionsItem[] = DEFAULT_MATIERAL_DES.map(({ label, key }) => {
      if (Array.isArray(key)) {
        return {
          label,
          value: key.reduce<string>((acc, cur, index) => {
            acc = acc + (index === 0 ? record?.[cur] : `(${record?.[cur]})`);
            return acc;
          }, ''),
        };
      }
      return {
        label,
        value: record?.[key] ?? t('空'),
      };
    });

    const totalQuantity = tableData?.reduce((acc, cur) => {
      acc += cur.quantity!;
      return acc;
    }, 0);

    const qualityStatusText =
      statusOptions?.find?.((opt) => opt.value === record?.qualityStatus)?.label ?? t('空');

    return [
      ...defaultDescriptions,
      {
        label: t('已分配库存'),
        value: totalQuantity,
      },
      {
        label: t('质量状态'),
        value: qualityStatusText,
      },
    ];
  }, [record, tableData, statusOptions]);
}
