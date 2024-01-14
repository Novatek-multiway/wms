import { Form, Input, InputNumber, message, Select } from 'antd';
import { GetLocationDetailById, PadOutStockApply } from 'apis';
import { useAppDispatch } from 'hooks';
import { last } from 'lodash';
import { MwDialog } from 'multiway';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { reset } from 'store';
import { findParentIds } from 'utils';
import { SCANNER_DASHBOARD_INSTOCK_LOCATION } from '@/common/constants';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';
import useMaterialOptions from '@/common/hooks/useMaterialOptions';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
import ScannerCascader from '@/components/ScannerCascader';

import type { API } from 'apis';
interface IProps {
  locationId: string;
  refresh: () => void;
}

interface FormFields extends Omit<API.getApiInvoiceHeaderInStockApplyParams, 'locationCode'> {
  locationCode: string[];
}

function OutStockApplyDialog({ locationId, refresh }: IProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm<FormFields>();
  const { locationCodeOptions: locationOptions, load } = useLocationCodeOptions('itemValue', false);
  const { materialOptions, load: loadMaterial } = useMaterialOptions(false);

  const onOpen = async () => {
    setVisible(true);
    // @ts-ignore
    load();
    loadMaterial();
    const res = await GetLocationDetailById({ id: locationId });
    form.resetFields();
    form.setFieldValue('locationCode', [res.resultData?.areaId, res.resultData?.locationCode]);
  };

  const onConfirm = async () => {
    const values = await form.validateFields();
    const body = {
      ...values,
      locationCode: last(values.locationCode),
    };
    await PadOutStockApply(body);
    form.resetFields();
    setVisible(false);
    dispatch(reset());
    refresh();
    message.success(t('操作成功'));
  };

  useScannerCodeEffect(SCANNER_DASHBOARD_INSTOCK_LOCATION, (code) => {
    const values = findParentIds(locationOptions, code);
    if (values) {
      form.setFieldValue('locationCode', values);
    } else {
      form.setFieldValue('locationCode', [code]);
    }
  });

  return (
    <>
      <div onClick={onOpen}>{t('出库叫料')}</div>

      <MwDialog
        centered
        title={t('出库叫料')}
        visible={visible}
        onClose={() => setVisible(false)}
        bodyStyle={{ maxHeight: 500, overflow: 'auto' }}
        onConfirm={onConfirm}
        cancelVisible={false}
        confirmText={t('提交')}
      >
        <Form
          form={form}
          layout="vertical"
          name="basic"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          initialValues={{
            quantity: 1,
          }}
        >
          <Form.Item
            label={t('出库位置')}
            name="locationCode"
            rules={[{ required: true, message: t('必填') }]}
          >
            <ScannerCascader
              options={locationOptions}
              placeholder={t('默认选中库位编号，可以改，也可以扫码')}
              scannerKey={SCANNER_DASHBOARD_INSTOCK_LOCATION}
            />
          </Form.Item>
          <Form.Item label={t('LPN')} name="lpnCode">
            <Input placeholder="请输入LPN" />
          </Form.Item>
          <Form.Item label={t('托数')} name="quantity">
            <InputNumber placeholder="请输入托数" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </MwDialog>
    </>
  );
}

export default memo(OutStockApplyDialog);
