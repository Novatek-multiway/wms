import { useTranslation } from "react-i18next";
import { FC, useEffect, useState, useRef } from "react";
import {
  Button,
  Form,
  Input,
  Radio,
  Space,
  Toast,
  Dialog,
  Cell,
  InputInstance,
} from "react-vant";
import useEnumOptions from "@/common/hooks/useEnumOptions";
import { postPdaUnbinding, getPdaGetLocationDetailByCode } from "apis";
import { REQUIRE_RULES } from "@/common/constants";

import type { API } from "apis";
const Unbinding: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<API.PadUnbindingDTO>();
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryList, setInventoryList] = useState<
    API.OutputContainerInventoryDTO[]
  >([]);
  const { options: unbindTypeOptions } = useEnumOptions("EnumUnbindingType");
  const locationCode = Form.useWatch("locationCode", form);

  const locationCodeRef = useRef<InputInstance>(null);
  const containerCodeRef = useRef<InputInstance>(null);

  const resetFields = () => {
    locationCodeRef.current?.clear();
    containerCodeRef.current?.clear();
  };

  const toDetail = () => {
    getPdaGetLocationDetailByCode({ locationCode }).then(
      (res: API.OutputLocationDetailDTOR) => {
        const newInventoryList = res.resultData?.inventoryList ?? [];
        setInventoryList(newInventoryList);
        Dialog.alert({
          message: (
            <>
              {newInventoryList.length === 0 ? (
                <div>{t("无物料")}</div>
              ) : (
                <Cell.Group>
                  {newInventoryList.map((inven) => (
                    <Cell
                      title={`${inven.materialName}`}
                      value={inven.materialCode}
                      key={inven.materialCode}
                    />
                  ))}
                </Cell.Group>
              )}
            </>
          ),
        });
      }
    );
  };

  const onFinish = async () => {
    setIsLoading(true);
    const values = await form.validateFields();
    await postPdaUnbinding(values).finally(() => setIsLoading(false));
    Toast.success(t("解盘成功！"));
    form.resetFields();
    resetFields();
  };

  return (
    <div className="Unbinding">
      <Form
        colon
        form={form}
        onFinish={onFinish}
        initialValues={{
          unbindingType: 1,
        }}
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
        <Form.Item name="unbindingType" label={t("解盘方式")}>
          <Radio.Group>
            <Space>
              {unbindTypeOptions?.map((opt) => (
                <Radio name={opt.itemId} key={opt.itemId}>
                  {opt.itemName}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="locationCode"
          label={t("解盘位置")}
          rules={REQUIRE_RULES}
          validateTrigger={["onBlur"]}
        >
          <Input
            placeholder={t("请输入解盘位置或扫码")}
            clearable
            ref={locationCodeRef}
          />
        </Form.Item>
        <Form.Item
          name="containerCode"
          label={t("容器编号")}
          validateTrigger={["onBlur"]}
        >
          <Input
            placeholder={t("请输入容器编号或扫码")}
            clearable
            ref={containerCodeRef}
          />
        </Form.Item>
        <Form.Item name="" label="" className="flex justify-end">
          <Button type="primary" size="small" onClick={toDetail}>
            {t("查看物料")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Unbinding;
