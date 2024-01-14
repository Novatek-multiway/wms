import { useTranslation } from "react-i18next";
import { getPdaMove } from "apis";
import { FC, useState } from "react";
import { Button, Form, Picker, Toast } from "react-vant";
import { REQUIRE_RULES } from "@/common/constants";
import useLocationOptions from "@/common/hooks/useLocationOptions";

import type { API } from "apis";
const CarryTask: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<API.getPdaMoveParams>();
  const [isLoading, setIsLoading] = useState(false);
  const [fromLocation, setFromLocation] = useState<string>();
  const [toLocation, setToLocation] = useState<string>();

  const { options, run } = useLocationOptions();

  const onConfirm = (
    value: string[],
    selectedRow: any[],
    index: number[],
    type: "to" | "from"
  ) => {
    const location = index.reduce((acc, cur, index) => {
      if (index === 0) {
        acc = acc?.[cur];
      } else {
        acc = acc?.children?.[cur];
      }
      return acc;
    }, options);
    const code = location?.itemValue;
    if (type === "to") {
      setToLocation(code);
    } else {
      setFromLocation(code);
    }
  };

  const resetFields = () => {
    form.setFieldValue("toLocation", "");
    form.setFieldValue("fromLocation", "");
    setFromLocation("");
    setToLocation("");
  };

  const onFinish = async () => {
    if (!toLocation && !fromLocation) {
      await form.validateFields();
      return;
    }
    if (!fromLocation) {
      await form.validateFields(["fromLocation"]);
      return;
    }
    if (!toLocation) {
      await form.validateFields(["toLocation"]);
      return;
    }
    setIsLoading(true);
    const body: API.getPdaMoveParams = {
      fromLocation,
      toLocation,
      isAutoCarry: true,
    };
    await getPdaMove(body).finally(() => setIsLoading(false));
    form.resetFields();
    resetFields();
    Toast.success(t("创建搬运任务成功"));
    run();
  };

  return (
    <div className="CarryTask">
      <Form
        colon
        form={form}
        footer={
          <div className="mt-2">
            <Button
              round
              onClick={onFinish}
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
          name="fromLocation"
          label={t("起始位置")}
          isLink
          trigger="onConfirm"
          required
          rules={REQUIRE_RULES}
          onClick={(_, action) => {
            action?.current?.open();
          }}
        >
          <Picker
            popup
            columns={options}
            onConfirm={(value: string[], selectedRow: any[], index: number[]) =>
              onConfirm(value, selectedRow, index, "from")
            }
            placeholder=""
          >
            {(val) => val?.[1] || t("请选择起始位置")}
          </Picker>
        </Form.Item>

        <Form.Item
          name="toLocation"
          label={t("目标位置")}
          isLink
          trigger="onConfirm"
          required
          rules={REQUIRE_RULES}
          onClick={(_, action) => {
            action?.current?.open();
          }}
        >
          <Picker
            popup
            columns={options}
            onConfirm={(value: string[], selectedRow: any[], index: number[]) =>
              onConfirm(value, selectedRow, index, "to")
            }
            placeholder=""
          >
            {(val) => val?.[1] || t("请选择目标位置")}
          </Picker>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CarryTask;
