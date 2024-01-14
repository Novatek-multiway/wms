import { useTranslation } from 'react-i18next';
import { Radio, Form, message } from 'antd';
import { GetLocationDetailById, postPadInboundUnbinding } from 'apis';
import { useAppDispatch } from 'hooks';
import { last, pick } from 'lodash';
import { MwDialog, MwSearchTableField, MwSearchTable } from 'multiway';
import { memo, useState } from 'react';
import { findParentIds, getFieldBasedInterface } from 'utils';
import {
  SCANNER_DASHBOARD_UNBIND_LOCATION,
  SCANNER_DASHBOARD_UNBIND_CONTAINER,
} from '@/common/constants';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
import ScannerCascader from '@/components/ScannerCascader';
import ScannerSelect from '@/components/ScannerSelect';

import type { API } from 'apis';
import useEnumOptions from '@/common/hooks/useEnumOptions';
import { reset } from 'store';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';
import useContainerCodeOptions from '@/common/hooks/useContainerCodeOptions';
interface IProps {
  locationId: string;
  refresh: () => void;
}

interface FormFields extends Omit<API.PadUnbindingDTO, 'locationCode'> {
  locationCode: string[];
}

const getField = getFieldBasedInterface<FormFields>();

function UnbindingDialog({ locationId, refresh }: IProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [inventoryList, setInventoryList] = useState<API.OutputContainerInventoryDTO[]>([]);
  const [form] = Form.useForm<FormFields>();
  const { containerCodeOptions, load: loadContainer } = useContainerCodeOptions(false);
  const { locationCodeOptions: locationOptions, load } = useLocationCodeOptions('itemValue', false)
  const { options, run } = useEnumOptions('EnumUnbindingType', 'itemId', true);

  const setCode = (code: any) => {
    const values = findParentIds(locationOptions, code);
    if (values) {
      form.setFieldValue('locationCode', values);
    } else {
      form.setFieldValue('locationCode', [code]);
    }
  };


  const onOpen = async () => {
    setVisible(true);
    // @ts-ignore
    load();
    loadContainer();
    run();
    const res = (await GetLocationDetailById({ id: locationId })) as API.OutputLocationDetailDTOR;
    form.resetFields();
    form.setFieldValue('locationCode', [res.resultData?.areaId, res.resultData?.locationCode]);
    setInventoryList(res?.resultData?.inventoryList ?? []);
  };

  const onConfirm = async () => {
    const values = await form.validateFields();
    const body: API.PadUnbindingDTO = {
      ...pick(values, ['containerCode', 'unbindingType']),
      locationCode: last(values.locationCode),
    };
    await postPadInboundUnbinding(body);
    message.success('解盘成功！');
    form.resetFields();
    setVisible(false);
    dispatch(reset());
    refresh();
  };

  useScannerCodeEffect(SCANNER_DASHBOARD_UNBIND_CONTAINER, (code) => {
    form.setFieldValue('containerCode', code);
  });

  useScannerCodeEffect(SCANNER_DASHBOARD_UNBIND_LOCATION, setCode);

  const handleSelectChange = (value: any, options: any[]) => {
    if (options.length === 2) {
      const id = last(options)?.id;
      GetLocationDetailById({ id }).then((res: API.OutputLocationDetailDTOR) => {
        setInventoryList(res?.resultData?.inventoryList ?? []);
      });
    }
  };

  const fields: Array<MwSearchTableField> = [
    {
      title: t('物料编号'),
      key: 'materialCode',
      width: 150,
      render: (text: string, record: API.OutputContainerInventoryDTO) =>
        `${text}(${record.materialName})`,
    },
    {
      title: t('物料规格'),
      key: 'materialSize',
      width: 150,
    },
    {
      title: t('数量'),
      key: 'currentQuantity',
      width: 100,
    },
  ];

  return (
    <>
      <div onClick={onOpen}>{t('解盘')}</div>
      <MwDialog
        centered
        title={t('解盘')}
        visible={visible}
        onClose={() => setVisible(false)}
        bodyStyle={{ maxHeight: 360, overflow: 'auto' }}
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
            unbindingType: 2,
          }}
        >
          <Form.Item label={t('解盘方式')} name={getField('unbindingType')}>
            <Radio.Group>
              {options.map((opt) => (
                <Radio.Button key={opt.label} value={opt.value}>
                  {opt.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={t('组盘位置')}
            name="locationCode"
            rules={[{ required: true, message: t('必填') }]}
          >
            <ScannerCascader
              onChange={handleSelectChange}
              options={locationOptions}
              placeholder={t('默认选中库位编号，可以改，也可以扫码')}
              scannerKey={SCANNER_DASHBOARD_UNBIND_LOCATION}
            />
          </Form.Item>

          <Form.Item
            label={t('容器编号')}
            name="containerCode"
            // rules={[{ required: true, message: t('必填') }]}
          >
            <ScannerSelect
              options={containerCodeOptions}
              placeholder={t('请输入容器编号或扫码')}
              scannerKey={SCANNER_DASHBOARD_UNBIND_CONTAINER}
            />
          </Form.Item>
        </Form>
        <MwSearchTable
          fields={fields}
          data={inventoryList}
          rowKey="id"
          scrollX={600}
          extraVisible={false}
        ></MwSearchTable>
      </MwDialog>
    </>
  );
}

export default memo(UnbindingDialog);
