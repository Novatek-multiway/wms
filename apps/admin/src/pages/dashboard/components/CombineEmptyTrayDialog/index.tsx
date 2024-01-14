import { SCANNER_DASHBOARD_COMBINE_EMPTY_LOCATION } from '@/common/constants';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
import ScannerCascader from '@/components/ScannerCascader';
import { Form, InputNumber, Select, message } from 'antd';
import type { API } from 'apis';
import { GetLocationDetailById, CombineEmptyTrayStacker } from 'apis';
import { useAppDispatch } from 'hooks';
import { last, pick } from 'lodash';
import { MwDialog } from 'multiway';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { reset } from 'store';
import { findParentIds } from 'utils';

interface IProps {
  locationId: string;
  refresh: () => void;
}

interface FormFields
  extends Omit<API.getPadContainerInventoryEmptyTrayOutApplyParams, 'locationCode'> {
  locationCode: string[];
}

function CombineEmptyTrayDialog({ locationId, refresh }: IProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm<FormFields>();
  const dispatch = useAppDispatch();
  const { locationCodeOptions: locationOptions, load } = useLocationCodeOptions('itemValue', false);

  const onOpen = async () => {
    setVisible(true);
    await load();
    // @ts-ignore
    const res = await GetLocationDetailById({ id: locationId });
    form.resetFields();
    form.setFieldValue('locationCode', [res.resultData.areaId, res.resultData.locationCode]);
  };

  const onConfirm = async () => {
    const values = await form.validateFields();
    const body = {
      ...values,
      locationCode: last(values.locationCode),
    };
    await CombineEmptyTrayStacker(body);
    form.resetFields();
    dispatch(reset());
    setVisible(false);
    refresh();
    message.success(t('操作成功'));
  };

  const setCode = (code: any) => {
    const values = findParentIds(locationOptions, code);
    if (values) {
      form.setFieldValue('locationCode', values);
    } else {
      form.setFieldValue('locationCode', [code]);
    }
  };

  useScannerCodeEffect(SCANNER_DASHBOARD_COMBINE_EMPTY_LOCATION, setCode);

  return (
    <>
      <div onClick={onOpen}>{t('绑定空托盘垛')}</div>
      <MwDialog
        centered
        title={t('绑定空托盘垛')}
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
            quantity: 10,
          }}
        >
          <Form.Item
            label={t('目标位置')}
            name="locationCode"
            rules={[{ required: true, message: t('必填') }]}
          >
            <ScannerCascader
              options={locationOptions}
              scannerKey={SCANNER_DASHBOARD_COMBINE_EMPTY_LOCATION}
              placeholder={t('默认选中库位编号，可以改，也可以扫码')}
            />
          </Form.Item>

          <Form.Item
            label={t('空托数量')}
            name="quantity"
            rules={[{ required: true, message: t('必填') }]}
          >
            <InputNumber placeholder={t('请输入空托数量')} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </MwDialog>
    </>
  );
}

export default memo(CombineEmptyTrayDialog);
