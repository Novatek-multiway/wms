import { useTranslation } from 'react-i18next';
import { Form, Select, message } from 'antd';
import {
  BindingEmpty,
  GetLocationDetailById,
  // InStockApply,
  postApiMaterialGetPageData,
} from 'apis';

import { useAppDispatch } from 'hooks';
import { last, pick } from 'lodash';
import { MwDialog } from 'multiway';
import { memo, useState } from 'react';
import { findParentIds } from 'utils';
import {
  SCANNER_DASHBOARD_INSTOCK_CONTAINER,
  SCANNER_DASHBOARD_INSTOCK_LOCATION,
} from '@/common/constants';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
import ScannerCascader from '@/components/ScannerCascader';
// import ScannerSelect from '@/components/ScannerSelect';

import type { API } from 'apis';
import { reset } from 'store';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';
import useContainerTypeList from '@/common/hooks/useContainerTypeList';
import { OptionItem } from '@/common/hooks/useEnumOptions';
import ScannerSelect from '@/components/ScannerSelect';
interface IProps {
  locationId: string;
  refresh: () => void;
}

interface FormFields extends Omit<API.getApiInvoiceHeaderInStockApplyParams, 'fromLocationCode'> {
  fromLocationCode: string[];
}

function BindingEmptyDialog({ locationId, refresh }: IProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm<FormFields>();
  const { options: containerCodeOptions, run: loadContainer } = useContainerTypeList(false);
  const { locationCodeOptions: locationOptions, load } = useLocationCodeOptions('itemValue', false);
  const [materialOptions, setMaterialOptions] = useState<OptionItem[]>([]);

  const onOpen = async () => {
    setVisible(true);
    // @ts-ignore
    load();
    loadContainer({ locationId: locationId });
    const res = await GetLocationDetailById({ id: locationId });
    form.resetFields();
    form.setFieldValue('fromLocationCode', [res.resultData?.areaId, res.resultData?.locationCode]);

    postApiMaterialGetPageData({ pageIndex: 1, pageSize: 100 }).then(
      (res: API.OutputMaterialInfoDTOPageResultR) => {
        const options: OptionItem[] = (res.resultData?.pageData ?? [])?.map((material) => ({
          ...material,
          value: material.materialCode!,
          label: `${material.materialCode!}(${material.materialName!})`,
        }));
        setMaterialOptions(options);
        form.setFieldValue('matreialCode', options[0].value);
      }
    );
  };

  const onConfirm = async () => {
    const values = await form.validateFields();
    const body: API.getApiInvoiceHeaderInStockApplyParams = {
      ...pick(values, ['containerTypeId']),
      locationId: locationId,
    };
    await BindingEmpty(body);
    form.resetFields();
    setVisible(false);
    dispatch(reset());
    refresh();
    message.success(t('申请入库成功'));
  };

  useScannerCodeEffect(SCANNER_DASHBOARD_INSTOCK_CONTAINER, (code) => {
    form.setFieldValue('containerCode', code);
  });

  useScannerCodeEffect(SCANNER_DASHBOARD_INSTOCK_LOCATION, (code) => {
    const values = findParentIds(locationOptions, code);
    if (values) {
      form.setFieldValue('fromLocationCode', values);
    } else {
      form.setFieldValue('fromLocationCode', [code]);
    }
  });

  return (
    <>
      <div onClick={onOpen}>{t('绑定空托')}</div>

      <MwDialog
        centered
        title={t('绑定空托')}
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
            label={t('绑定位置')}
            name="fromLocationCode"
            rules={[{ required: true, message: t('必填') }]}
          >
            <ScannerCascader
              options={locationOptions}
              placeholder={t('默认选中库位编号，可以改，也可以扫码')}
              scannerKey={SCANNER_DASHBOARD_INSTOCK_LOCATION}
              disabled
            />
          </Form.Item>
          <Form.Item label={t('托盘类型')} name="containerTypeId">
            <Select>
              {containerCodeOptions.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </MwDialog>
    </>
  );
}

export default memo(BindingEmptyDialog);
