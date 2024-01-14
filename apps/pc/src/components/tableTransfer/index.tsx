import { Table, Transfer } from 'antd';
import type { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import type { TransferItem, TransferProps } from 'antd/es/transfer';
import { difference } from 'lodash';
import styles from './index.module.less'

interface TableTransferProps<T extends TransferItem> extends TransferProps<TransferItem> {
    dataSource: T[];
    leftColumns: ColumnsType<T>;
    rightColumns: ColumnsType<T>;
    loading: boolean;
}

function TableTransfer<T extends TransferItem>({ leftColumns, rightColumns, loading, ...restProps }: TableTransferProps<T>) {
    return (
        <Transfer {...restProps} className={styles.tableTransfer}>
            {({
                direction,
                filteredItems,
                onItemSelectAll,
                onItemSelect,
                selectedKeys: listSelectedKeys,
                disabled: listDisabled,
            }) => {
                const columns = direction === 'left' ? leftColumns : rightColumns;

                const rowSelection: TableRowSelection<TransferItem> = {
                    getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
                    onSelectAll(selected, selectedRows) {
                        const treeSelectedKeys = selectedRows
                            .filter((item) => !item.disabled)
                            .map(({ key }) => key);
                        const diffKeys = selected
                            ? difference(treeSelectedKeys, listSelectedKeys)
                            : difference(listSelectedKeys, treeSelectedKeys);
                        onItemSelectAll(diffKeys as string[], selected);
                    },
                    onSelect({ key }, selected) {
                        onItemSelect(key as string, selected);
                    },
                    selectedRowKeys: listSelectedKeys,
                };

                return (
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        loading={loading}
                        dataSource={filteredItems}
                        size="small"
                        style={{ pointerEvents: listDisabled ? 'none' : undefined }}
                        onRow={({ key, disabled: itemDisabled }) => ({
                            onClick: () => {
                                if (itemDisabled || listDisabled) return;
                                onItemSelect(key as string, !listSelectedKeys.includes(key as string));
                            },
                        })}
                    />
                );
            }}
        </Transfer>
    )
};

export default TableTransfer