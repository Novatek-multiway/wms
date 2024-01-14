import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { GetLocationDetailById, getPadCarryTaskMove } from 'apis';
import { MwDialog } from 'multiway';
import { memo, useState } from 'react';
import { Form, Radio } from 'antd';
import ScannerCascader from '@/components/ScannerCascader';
import {
  SCANNER_DASHBOARD_MOVE_CONTAINER,
  SCANNER_DASHBOARD_MOVE_LOCATION,
} from '@/common/constants';
import { last, pick } from 'lodash';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
import { findParentIds } from 'utils';
import { useAppDispatch, useAppSelector } from 'hooks';

import type { API } from 'apis';
import { reset } from 'store';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';

interface IProps {
  locationId: string;
  refresh: () => void;
}

interface FormFields extends Omit<API.getPadCarryTaskMoveParams, 'fromLocation' | 'toLocation'> {
  fromLocation: string[];
  toLocation: string[];
}

function MoveContainerDialog({ locationId, refresh }: IProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm<FormFields>();
  const { locationCodeOptions: locationOptions, load } = useLocationCodeOptions('itemValue', false)

  const setCode = (code: any, field: keyof FormFields) => {
    const values = findParentIds(locationOptions, code);
    if (values) {
      form.setFieldValue(field, values);
    } else {
      form.setFieldValue(field, [code]);
    }
  };

  const onOpen = async () => {
    setVisible(true);
    await load();
    // @ts-ignore
    const res = await GetLocationDetailById({ id: locationId });
    form.resetFields();
    form.setFieldValue('fromLocation', [res.resultData.areaId, res.resultData.locationCode]);
  };

  const onConfirm = async () => {
    const values = await form.validateFields();
    const body: API.getPadCarryTaskMoveParams = {
      ...pick(values, ['isAutoCarry']),
      fromLocation: last(values.fromLocation),
      toLocation: last(values.toLocation),
    };
    await getPadCarryTaskMove(body);
    form.resetFields();
    setVisible(false);
    dispatch(reset());
    message.success(t('任务创建成功'));
    refresh();
  };

  useScannerCodeEffect(SCANNER_DASHBOARD_MOVE_LOCATION, (code) => setCode(code, 'fromLocation'));

  useScannerCodeEffect(SCANNER_DASHBOARD_MOVE_CONTAINER, (code) => setCode(code, 'toLocation'));

  return (
    <>
      <div onClick={onOpen}>{t('点到点搬运')}</div>

      <MwDialog
        centered
        title={t('点到点搬运')}
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
          initialValues={{ isAutoCarry: true }}
        >
          <Form.Item
            label={t('起始位置')}
            name="fromLocation"
            rules={[{ required: true, message: t('必填') }]}
          >
            <ScannerCascader
              options={locationOptions}
              placeholder={t('默认选中库位编号，可以改，也可以扫码')}
              scannerKey={SCANNER_DASHBOARD_MOVE_LOCATION}
            />
          </Form.Item>
          <Form.Item label={t('目标位置')} name="toLocation" rules={[{ required: true, message: t('必填') }]}>
            <ScannerCascader
              options={locationOptions}
              placeholder={t('请选择目标位置')}
              scannerKey={SCANNER_DASHBOARD_MOVE_CONTAINER}
            />
          </Form.Item>
          <Form.Item label={t('自动搬运')} name="isAutoCarry">
            <Radio.Group>
              <Radio value={true}>{t('自动搬运')}</Radio>
              <Radio value={false}>{t('手动搬运')}</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </MwDialog>
    </>
  );
}

export default memo(MoveContainerDialog);
