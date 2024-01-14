import useEnumOptions from '@/common/hooks/useEnumOptions';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';
import { Button, Form, Input, Select, Switch, message, Row, Col, Cascader } from 'antd';
import { API, OpenApiInStockApply } from 'apis';
import { chunk, last } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const REQUIRE_RULES = [{ required: true, message: '必填' }];

export type InStockApplyBody = API.InStockApplyBody;

const materialTypeIdOptions = [
  {
    value: 2,
    label: '吨包',
  },
  {
    value: 1,
    label: '小包',
  },
];

const boxTypeOptions = [
  {
    value: 0,
    label: '整箱',
  },
  {
    value: 1,
    label: '尾箱',
  },
];

const inputFields = [
  {
    key: 'outDate',
    label: '出料日',
  },
  {
    key: 'colour',
    label: '颜色',
  },
  {
    key: 'batchNo',
    label: '批次号',
  },
  {
    key: 'bag',
    label: 'BAG番号',
    required: true,
  },
  {
    key: 'weight',
    label: '重量',
    required: true,
  },
  {
    key: 'supplierCD',
    label: '供应商CD',
  },
];

export default function InStockApply() {
  const { t } = useTranslation();

  const [form] = Form.useForm<InStockApplyBody>();
  const [loading, setLoading] = useState(false);
  const boxTypeValue = Form.useWatch('boxType', form);
  const { options: qualityStatusOptions } = useEnumOptions('EnumQualityStatus', 'itemId');
  const { locationCodeOptions: locationOptions, load } = useLocationCodeOptions('itemValue', false);

  const handleFinish = async (values: InStockApplyBody) => {
    setLoading(true);
    const code = last(values.fromLocationCode);
    await OpenApiInStockApply({ ...values, fromSys: 'PAD', fromLocationCode: code! }).finally(() =>
      setLoading(false)
    );
    load();
    form.resetFields();
    message.success('操作成功');
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4">
      <Form
        form={form}
        name="basic"
        layout="horizontal"
        autoComplete="off"
        onFinish={handleFinish}
        style={{ width: '80%', margin: '0 auto' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={t('起点库位编号')}
              name="fromLocationCode"
              required
              rules={REQUIRE_RULES}
            >
              <Cascader options={locationOptions} placeholder="请输入起点库位编号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('物料编号')} name="materialCode" required rules={REQUIRE_RULES}>
              <Input placeholder="请输入物料编号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={t('异常托盘')} name="isabnormalTray">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('LPN')} name="lpn" required rules={REQUIRE_RULES}>
              <Input placeholder="请输入lpn编号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={t('制品种类')} name="productType" required rules={REQUIRE_RULES}>
              <Input placeholder="请输入制品种类" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('制品名称')} name="productName" required rules={REQUIRE_RULES}>
              <Input placeholder="请输入制品名称" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={t('包装类型')} name="materialTypeId" required rules={REQUIRE_RULES}>
              <Select options={materialTypeIdOptions} placeholder="请输入包装类型" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('等级')} name="grade" required rules={REQUIRE_RULES}>
              <Input placeholder="请输入等级" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={t('尾箱类型')} name="boxType" required rules={REQUIRE_RULES}>
              <Select options={boxTypeOptions} placeholder="请选择尾箱类型" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('码垛层')} name={'stackLayer'} key={'stackLayer'}>
              <Input placeholder={`请输入码垛层`} disabled={boxTypeValue === 0} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={t('码垛位')} name={'stackLocation'} key={'stackLocation'}>
              <Input placeholder={`请输入码垛位`} disabled={boxTypeValue === 0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('国家')} name={'country'} key={'country'}>
              <Input placeholder={`请输入国家`} />
            </Form.Item>
          </Col>
        </Row>
        {chunk(inputFields, 2).map((items, index) => (
          <Row gutter={16} key={index + 'row'}>
            {items.map((item) => (
              <Col span={12} key={item.key + 'col'}>
                <Form.Item
                  label={t(item.label)}
                  name={item.key}
                  key={item.key}
                  required={item?.required ?? false}
                >
                  <Input placeholder={`请输入${item.label}`} />
                </Form.Item>
              </Col>
            ))}
          </Row>
        ))}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={t('质量状态')} name="qualityStatus" required rules={REQUIRE_RULES}>
              <Select options={qualityStatusOptions} placeholder="请选择质量状态" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 2, span: 12 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {t('提交')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
