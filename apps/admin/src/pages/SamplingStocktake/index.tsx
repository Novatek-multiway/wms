import { useTranslation } from 'react-i18next';
import {
  Breadcrumb,
  Button,
  Form,
  InputNumber,
  message,
} from 'antd';
import {
  getPadStocktakeGetStocktakeCode,
  postApiMaterialGetPageData,
  postPadStocktakeAddStocktakeBySampling,
} from 'apis';
import pick from 'lodash/pick';
import last from 'lodash/last';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFieldBasedInterface } from 'utils';
import {
  SCANNER_SAMPLING_LOCATIONCODE,
  SCANNER_SAMPLING_MATERIAL,
} from '@/common/constants';
import { OptionItem } from '@/common/hooks/useEnumOptions';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
import ScannerCascader from '@/components/ScannerCascader';
import ScannerSelect from '@/components/ScannerSelect';
import { useOptions } from 'multiway';

import type { API } from 'apis';
type EP = Omit<API.AddStocktakeBySamplingDTO, 'locationId' | 'stocktakeCode'>;
interface FormFields extends EP {
  locationId: number[];
}

const getField = getFieldBasedInterface<FormFields>();

export default function SamplingStocktake() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form] = Form.useForm<FormFields>();
  const [stocktakeCode, setStocktakeCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { locationCodeOptions } = useLocationCodeOptions('itemId');

  const { options: materialOptions } = useOptions(postApiMaterialGetPageData, {
    params: { pageIndex: 1, pageSize: 100 },
    path: ['resultData', 'pageData'],
    transform: (item: API.OutputMaterialInfoDTO): OptionItem => ({
      ...item,
      label: `${item.materialCode}(${item.materialName})`,
      value: item.id!,
    }),
  });

  const handleBack = () => {
    navigate('/inventory');
  };

  const handleFinish = async (values: FormFields) => {
    setIsLoading(true);
    const body: API.AddStocktakeBySamplingDTO = {
      ...pick(values, ['materialId', 'adjustedQuantity']),
      stocktakeCode,
      locationId: last(values.locationId),
    };
    await postPadStocktakeAddStocktakeBySampling(body).finally(() => setIsLoading(false));
    message.success(t('抽盘成功'));
    form.resetFields();
  };

  useEffect(() => {
    getPadStocktakeGetStocktakeCode().then((res: API.StringR) => {
      const code = res?.resultData ?? '';
      setStocktakeCode(code);
    });
  }, []);

  useScannerCodeEffect(SCANNER_SAMPLING_MATERIAL, (code) => {
    form.setFieldValue(getField('materialId'), code);
  });

  return (
    <div className="p-4">
      <div className="text-base mb-2">
        <Breadcrumb>
          <Breadcrumb.Item onClick={handleBack}>{t('盘点')}</Breadcrumb.Item>
          <Breadcrumb.Item>{t('抽样盘点')}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form
        form={form}
        name="basic"
        layout="horizontal"
        autoComplete="off"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
        onFinish={handleFinish}
      >
        <Form.Item label={t('盘点单号')}>{stocktakeCode}</Form.Item>
        <Form.Item
          label={t('货位')}
          name={getField('locationId')}
          rules={[{ required: true, message: t('请选择货位!') }]}
        >
          <ScannerCascader
            options={locationCodeOptions}
            scannerKey={SCANNER_SAMPLING_LOCATIONCODE}
            placeholder={t('请选择货位或者扫码')}
          />
        </Form.Item>
        <Form.Item
          label={t('物料')}
          name={getField('materialId')}
          rules={[{ required: true, message: t('请选择物料!') }]}
        >
          <ScannerSelect
            options={materialOptions}
            scannerKey={SCANNER_SAMPLING_MATERIAL}
            placeholder={t('请选择物料或者扫码')}
          />
        </Form.Item>
        <Form.Item
          label={t('盘后库存')}
          name={getField('adjustedQuantity')}
          rules={[{ required: true, message: t('请输入盘后库存') }]}
        >
          <InputNumber placeholder={t('请输入盘后库存')} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 22 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {t('提交')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
