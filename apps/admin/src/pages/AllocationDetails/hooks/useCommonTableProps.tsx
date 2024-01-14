import { useState, useRef, RefObject } from 'react';
import { isEmpty } from 'lodash';
import { MwSearchTableProps } from 'multiway';
import { ITable } from '@/typing';
import { Result } from 'apis';

interface IProps<T> {
  lineId: string;
  service: (params: { lineId: string }) => Promise<Result<T[]>>;
  onSelectionChange?: (selections: T[], values: string[]) => void;
}

interface IReturnType<T> {
  ref: RefObject<ITable<T>>;
  tableProps: MwSearchTableProps;
  tableData: T[];
  isDisabled: boolean;
  getSelections: () => T[] | undefined;
}

export default function useCommonTableProps<T>({
  lineId,
  service,
  onSelectionChange,
}: IProps<T>): IReturnType<T> {
  const [isDisabled, setIsDisabled] = useState(false);

  //  由于描述列表需要用到tableData，但通过ref获取到的tableData无法rerender。
  const [tableData, setTableData] = useState<T[]>([]);

  const ref = useRef<ITable>(null);

  const handleSelectionChange = (selections: T[], values: string[]) => {
    setIsDisabled(isEmpty(values));
    onSelectionChange?.(selections, values);
  };

  const api = async () => {
    const res = await service({ lineId });
    setTableData(res?.resultData);
    return res;
  };

  //  通过ref获取到的selections里的数据不是实时的。
  const getSelections = () => {
    const selections = ref.current?.getSelection()?.map((item) => item.id);
    const idToRecord = ref?.current?.getTableData?.().reduce((acc, cur) => {
      acc[cur.id] = cur;
      return acc;
    }, {});
    return selections?.map((sel) => idToRecord[sel]);
  };

  return {
    ref,
    tableData,
    isDisabled,
    tableProps: {
      api,
      searchVisible: false,
      ref,
      pagination: { pageSize: 5 },
      extraVisible: false,
      rowKey: 'id',
      selectionType: 'checkbox',
      scrollX: 1000,
      compact: true,
      // @ts-ignore
      onSelectionChange: handleSelectionChange,
    },
    getSelections,
  };
}
