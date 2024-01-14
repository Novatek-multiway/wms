import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';
import { Button, Form, Input, Select, Radio, message, Cascader } from 'antd';
import { PostUnbindingBatch } from 'apis';
import { last } from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { REQUIRE_RULES } from './../../../../pda/src/common/constants/index';

interface IFormProps {
  unbindingType: number;
  locationCode: string[][];
}

export default function UnbindingBatch() {
  const { t } = useTranslation();

  const [form] = Form.useForm<IFormProps>();
  const [loading, setLoading] = useState(false);
  const { locationCodeOptions: locationOptions, load } = useLocationCodeOptions('itemValue', true);

  const handleFinish = async (values: IFormProps) => {
    setLoading(true);
    const body = {
      unbindingType: values.unbindingType,
      locationCode: values.locationCode.reduce<string[]>((acc, cur) => {
        if (cur.length > 1) {
          acc.push(last(cur)!);
        }
        return acc;
      }, []),
    };
    await PostUnbindingBatch(body).finally(() => setLoading(false));
    form.resetFields();
    message.success('操作成功');
  };

  return (
    <div className="p-4">
      <Form
        form={form}
        name="basic"
        layout="horizontal"
        autoComplete="off"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        initialValues={{
          unbindingType: 1,
          locationCode: [
            ['1692458540981297152', 'C1-T4-007-001-001-01'],
            ['1692458540981297152', 'C1-T4-007-002-001-01'],
            ['1692458540981297152', 'C1-T4-007-003-001-01'],
          ],
        }}
        onFinish={handleFinish}
      >
        <Form.Item label="解绑类型" name="unbindingType">
          <Radio.Group>
            <Radio value={1}>出库</Radio>
            <Radio value={2}>撤销</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={'解盘位置'} name="locationCode">
          <Cascader
            style={{ width: '100%' }}
            options={locationOptions}
            multiple
            maxTagCount="responsive"
            showCheckedStrategy={Cascader.SHOW_CHILD}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 12 }} required rules={REQUIRE_RULES}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {t('提交')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
