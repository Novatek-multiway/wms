import { Cascader, Input, Button, Radio, RadioChangeEvent, Space } from 'antd';
import { CascaderProps, DefaultOptionType } from 'antd/es/cascader';
import { useAppDispatch } from 'hooks';
import { setScannerKey } from 'store';
import { ScanOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { memo } from 'react';

type DeCascaderProps = CascaderProps<DefaultOptionType> & {
  scannerKey: string;
  onSearch?: () => void;
};

function ScannerCascader({ onSearch, scannerKey, ...props }: DeCascaderProps) {
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

  return (
    <>
      <Cascader
        className={styles.scannerCascader}
        {...props}
        allowClear
        size="middle"
        style={{ width: 'calc(100% - 46px)' }}
        dropdownStyle={{ width: 'calc(100% - 46px)' }}
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

export default memo(ScannerCascader);
