import { useTranslation } from 'react-i18next';
import { Form, Select, message } from 'antd';
import { GetLocationDetailById, getPadContainerInventoryEmptyTrayOutApply } from 'apis';
import { MwDialog } from 'multiway';
import { memo, useState } from 'react';
import useContainerTypeList from '@/common/hooks/useContainerTypeList';
import { useAppDispatch } from 'hooks';
import type { API } from 'apis';
import ScannerCascader from '@/components/ScannerCascader';
import { SCANNER_DASHBOARD_EMPTY_LOCATION } from '@/common/constants';
import { last, pick } from 'lodash';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
import { findParentIds } from 'utils';
import { reset } from 'store';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';

interface IProps {
  locationId: string;
  refresh: () => void;
}

interface FormFields
  extends Omit<API.getPadContainerInventoryEmptyTrayOutApplyParams, 'locationCode'> {
  locationCode: string[];
}

function EmptyTrayOutApplyDialog({ locationId, refresh }: IProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm<FormFields>();
  const dispatch = useAppDispatch();
  const { locationCodeOptions: locationOptions, load } = useLocationCodeOptions('itemValue', false)
  const { options: containerTypeOptions, run } = useContainerTypeList(true);

  const onOpen = async () => {
    setVisible(true);
    await load();
    run();
    // @ts-ignore
    const res = await GetLocationDetailById({ id: locationId });
    form.resetFields();
    form.setFieldValue('locationCode', [res.resultData.areaId, res.resultData.locationCode]);
  };

  const onConfirm = async () => {
    const values = await form.validateFields();
    const body: API.getPadContainerInventoryEmptyTrayOutApplyParams = {
      ...pick(values, ['trayTypeId']),
      locationCode: last(values.locationCode),
    };
    await getPadContainerInventoryEmptyTrayOutApply(body);
    form.resetFields();
    dispatch(reset());
    setVisible(false);
    refresh();
    message.success(t('呼叫空托成功'));
  };

  const setCode = (code: any) => {
    const values = findParentIds(locationOptions, code);
    if (values) {
      form.setFieldValue('locationCode', values);
    } else {
      form.setFieldValue('locationCode', [code]);
    }
  };

  useScannerCodeEffect(SCANNER_DASHBOARD_EMPTY_LOCATION, setCode);

  return (
    <>
      <div onClick={onOpen}>{t('呼叫空托')}</div>

      <MwDialog
        centered
        title={t('呼叫空托')}
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
        >
          <Form.Item
            label={t('目标位置')}
            name="locationCode"
            rules={[{ required: true, message: t('必填') }]}
          >
            <ScannerCascader
              options={locationOptions}
              scannerKey={SCANNER_DASHBOARD_EMPTY_LOCATION}
              placeholder={t('默认选中库位编号，可以改，也可以扫码')}
            />
          </Form.Item>

          <Form.Item
            label={t('容器类型')}
            name="trayTypeId"
            rules={[{ required: true, message: t('必填') }]}
          >
            <Select
              placeholder={t('请选择容器类型')}
              // onChange={onGenderChange}
              allowClear
              options={containerTypeOptions}
            ></Select>
          </Form.Item>
        </Form>
      </MwDialog>
    </>
  );
}

export default memo(EmptyTrayOutApplyDialog);
