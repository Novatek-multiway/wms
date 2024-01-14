import { Input, Button } from 'antd';
import { SearchProps } from 'antd/es/input';
import { useAppDispatch } from 'hooks';
import { setScannerKey } from 'store';
import { ScanOutlined } from '@ant-design/icons';
import { ScannerKey } from '@/common/constants';
import { memo } from 'react';

interface IProps extends SearchProps {
  scannerKey: ScannerKey;
}

function ScannerInput({ onSearch, scannerKey, ...props }: IProps) {
  const dispatch = useAppDispatch();

  const handleSearch = () => {
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
      <Input
        {...props}
        allowClear
        style={{ width: 'calc(100% - 46px)' }}
        className='rounded-r-none'
        size="middle"
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

export default memo(ScannerInput);
