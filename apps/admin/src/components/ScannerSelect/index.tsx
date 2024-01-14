import { Cascader, Input, Button, Radio, RadioChangeEvent, Space, Select } from 'antd';
import { SelectProps, DefaultOptionType } from 'antd/es/select';
import { useAppDispatch } from 'hooks';
import { setScannerKey } from 'store';
import { ScanOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { ScannerKey } from '@/common/constants';
import { memo } from 'react';

interface IProps extends SelectProps {
  scannerKey: ScannerKey;
  onSearch?: () => void;
}

function ScannerSelect({ onSearch, scannerKey, ...props }: IProps) {
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    onSearch?.();
    // @ts-ignore
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        action: 'camera',
      })
    );
    dispatch(setScannerKey(scannerKey));
  };

  const filter: SelectProps['filterOption'] = (
    inputValue: string,
    option: DefaultOptionType | undefined
  ) => (option?.label ?? '')?.toLowerCase().includes(inputValue.toLowerCase());

  return (
    <>
      <Select
        className={styles.scannerSelect}
        {...props}
        allowClear
        size="middle"
        style={{ width: 'calc(100% - 46px)' }}
        // showSearch
        // filterOption={filter}
      />
      <Button
        icon={<ScanOutlined />}
        type="primary"
        style={{ width: 46 }}
        className="rounded-l-none"
        onClick={handleSearch}
      />
    </>
  );
}

export default memo(ScannerSelect);
