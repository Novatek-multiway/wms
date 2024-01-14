import { useTranslation } from "react-i18next";
import { useState, FC, useRef } from "react";
import {
  Button,
  Picker,
  Form,
  Input,
  Toast,
  PickerColumnOption,
  PickerProps,
  InputInstance,
} from "react-vant";
import { getPdaGetContainerTypeList, getPdaEmptyTrayOutApply } from "apis";
import type { API } from "apis";
import useOptions from "@/common/hooks/useOptions";
import { REQUIRE_RULES } from "@/common/constants";

type IContainerTypeOption = PickerColumnOption & API.SelectItem;

const EmptyTrayOut: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<API.getPdaEmptyTrayOutApplyParams>();
  const [isLoading, setIsLoading] = useState(false);
  const [containerType, setContainerType] = useState<string>();

  const locationCodeRef = useRef<InputInstance>(null);

  const service = () =>
    getPdaGetContainerTypeList().then(
      (res: API.SelectItemListR) => res?.resultData ?? []
    );

  const { options: containerTypeOptions } = useOptions<API.SelectItem>(
    service,
    (opt) => ({
      ...opt,
      text: opt.itemName,
      value: opt.itemName,
    })
  );

  const resetFields = () => {
    locationCodeRef.current?.clear();
  };

  const onFinish = async () => {
    setIsLoading(true);
    const values = await form.validateFields();
    const params: API.getPdaEmptyTrayOutApplyParams = {
      locationCode: values.locationCode,
      trayTypeId: containerType as unknown as number,
    };
    await getPdaEmptyTrayOutApply(params).finally(() => setIsLoading(false));
    Toast.success(t("创建呼叫空托任务成功！"));
    form.resetFields();
    resetFields();
  };

  const onConfirm: PickerProps["onConfirm"] = (
    value: string,
    option: IContainerTypeOption
  ) => {
    setContainerType(option.itemId);
  };

  return (
    <div className="EmptyTrayOut">
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
          name="locationCode"
          label={t("呼叫位置")}
          rules={REQUIRE_RULES}
          validateTrigger={["onBlur"]}
        >
          <Input
            placeholder={t("请输入呼叫位置或扫码")}
            clearable
            ref={locationCodeRef}
          />
        </Form.Item>
        <Form.Item
          name="trayTypeId"
          label={t("托盘类型")}
          isLink
          trigger="onConfirm"
          rules={REQUIRE_RULES}
          onClick={(_, action) => {
            action?.current?.open();
          }}
        >
          <Picker
            popup
            columns={containerTypeOptions}
            onConfirm={onConfirm}
            placeholder=""
          >
            {(val) => val || t("请选择托盘类型")}
          </Picker>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmptyTrayOut;
