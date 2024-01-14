import { useState, useRef, ElementRef, RefObject } from "react";
import { isEmpty } from "lodash";
import { MwSearchTableProps, MwSearchTable } from "multiway";

export interface ITableRef {
    refresh: () => void;
    reset: () => void;
    getSelection: () => any[];
    getTableData: () => any[];
}

export type ITable = ElementRef<typeof MwSearchTable> & ITableRef;

interface IProps {
    record: Record<string, any>;
    service: (params: { lineId: string }) => Promise<any>;
    onSelectionChange?: (selections: Record<string, any>, values: string[]) => void;
}

interface IReturnType {
    ref: RefObject<ElementRef<typeof MwSearchTable> & ITableRef>;
    tableProps: MwSearchTableProps;
    tableData: any[];
    isDisabled: boolean;
    getSelections: () => any[] | undefined;
}

export default function useCommonTableProps({ record, service, onSelectionChange }: IProps): IReturnType{
    const [isDisabled, setIsDisabled] = useState(false);

    //  由于描述列表需要用到tableData，但通过ref获取到的tableData无法rerender。
    const [tableData, setTableData] = useState([]);

    const ref = useRef<ElementRef<typeof MwSearchTable> & ITableRef>(null);

    const handleSelectionChange = (selections: Record<string, any>, values: string[]) => {
        setIsDisabled(isEmpty(values))
        onSelectionChange?.(selections, values)
    }

    const api = async () => {
        const res = await service({ lineId: record.id }).then(res => ({
            content: (res?.resultData ?? [])?.map(item => ({
                ...item,
                _quantity: 0    //  用做可分配库存表格数量输入框的字段绑定
            })),
			// 数据总共 n 条
			totalCount: (res?.resultData)?.length,
			...res
        }));
        setTableData(res?.resultData)
        return res
    };

    //  通过ref获取到的selections里的数据不是实时的。
    const getSelections = () => {
        const selections = ref.current?.getSelection()?.map(item => item.id);
        const idToRecord = ref?.current?.getTableData?.().reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
        }, {})
        return selections?.map(sel => idToRecord[sel]);
    }

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
            onSelectionChange: handleSelectionChange
        },
        getSelections
    }
}