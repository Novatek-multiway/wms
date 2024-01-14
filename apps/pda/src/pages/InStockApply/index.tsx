import { useTranslation } from "react-i18next";
import { useState, FC, useRef } from "react";
import { Button, Form, Input, Toast, InputInstance } from "react-vant";
import { getPdaInStockApply } from "apis";
import { REQUIRE_RULES } from "@/common/constants";

import type { API } from "apis";

const InStockApply: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<API.getPdaInStockApplyParams>();
  const [isLoading, setIsLoading] = useState(false);

  const locationCodeRef = useRef<InputInstance>(null);
  const containerCodeRef = useRef<InputInstance>(null);

  const resetFields = () => {
    locationCodeRef.current?.clear();
    containerCodeRef.current?.clear();
  };

  const onFinish = async () => {
    setIsLoading(true);
    const values = await form.validateFields();
    await getPdaInStockApply(values).finally(() => setIsLoading(false));
    form.resetFields();
    resetFields();
    setIsLoading(false);
    Toast.success(t("创建组盘任务成功！"));
  };
  return (
    <div className="InStockApply">
      <Form
        colon
        form={form}
        onFinish={onFinish}
        footer={
          <div className="mt-2">
            <Button
              round
              nativeType="submit"
              type="primary"
              block
              loading={isLoading}
            >
              {t("提交")}
            </Button>
          </div>
        }
      >
        <Form.Item
          name="fromLocationCode"
          label={t("托盘位置")}
          rules={REQUIRE_RULES}
          validateTrigger={["onBlur"]}
        >
          <Input
            placeholder={t("请输入托盘位置或扫码")}
            clearable
            ref={locationCodeRef}
          />
        </Form.Item>
        <Form.Item
          name="containerCode"
          label={t("托盘编号")}
          validateTrigger={["onBlur"]}
        >
          <Input
            placeholder={t("请输入托盘编号或扫码")}
            clearable
            ref={containerCodeRef}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default InStockApply;
