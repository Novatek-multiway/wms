import { useTranslation } from "react-i18next";
import { FC, useEffect, useState, useRef } from "react";
import { Button, Form, Input, Toast, InputInstance } from "react-vant";
import {
  getPdaGetStocktakeCode,
  postPdaAddStocktakeBySampling,
  getPdaGetInventoryQuantity,
} from "apis";

import type { API } from "apis";
import { REQUIRE_RULES } from "@/common/constants";

const StocktakeBySampling: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<API.AddStocktakeBySamplingDTO>();
  const [isLoading, setIsLoading] = useState(false);
  const [stocktakeCode, setStocktakeCode] = useState<string>();
  const [stocktakeRecord, setStocktakeRecord] =
    useState<API.PdaStocktakeDetailDTO>();

  const materialCode = Form.useWatch("materialCode", form);
  const locationCode = Form.useWatch("locationCode", form);
  const containerCode = Form.useWatch("containerCode", form);

  const locationCodeRef = useRef<InputInstance>(null);
  const containerCodeRef = useRef<InputInstance>(null);
  const materialCodeRef = useRef<InputInstance>(null);
  const quantityRef = useRef<InputInstance>(null);

  const resetFields = () => {
    locationCodeRef.current?.clear();
    containerCodeRef.current?.clear();
    materialCodeRef.current?.clear();
    quantityRef.current?.clear();
  };

  const onFinish = async () => {
    setIsLoading(true);
    const values = await form.validateFields();
    const body: API.AddStocktakeBySamplingDTO = {
      locationId: stocktakeRecord?.locationId,
      materialId: stocktakeRecord?.materialId,
      stocktakeCode,
      adjustedQuantity: Number(values.adjustedQuantity),
    };
    await postPdaAddStocktakeBySampling(body).finally(() =>
      setIsLoading(false)
    );
    Toast.success(t("创建抽盘任务成功！"));
    form.resetFields();
    resetFields();
    setStocktakeRecord(undefined);
  };

  useEffect(() => {
    getPdaGetStocktakeCode().then((res: API.StringR) => {
      setStocktakeCode(res.resultData);
    });
  }, []);

  useEffect(() => {
    if (materialCode && locationCode) {
      getPdaGetInventoryQuantity({
        materialCode,
        locationCode,
        containerCode,
      }).then((res: API.PdaStocktakeDetailDTOR) => {
        setStocktakeRecord(res.resultData);
      });
    }
  }, [materialCode, containerCode, locationCode]);

  return (
    <div className="StocktakeBySampling">
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
              disabled={!stocktakeRecord}
            >
              {t("提交")}
            </Button>
          </div>
        }
      >
        <Form.Item name="stocktakeCode" label={t("盘点单号")}>
          {stocktakeCode}
        </Form.Item>
        <Form.Item
          name="locationCode"
          label={t("盘点位置")}
          rules={REQUIRE_RULES}
          validateTrigger={["onBlur"]}
        >
          <Input
            placeholder={t("请输入盘点位置或扫码")}
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
        <Form.Item
          name="materialCode"
          label={t("物料编号")}
          rules={REQUIRE_RULES}
          validateTrigger={["onBlur"]}
        >
          <Input
            placeholder={t("请输入物料编号或扫码")}
            clearable
            ref={materialCodeRef}
          />
        </Form.Item>
        <Form.Item name="reQuality" label={t("库存数量")} disabled>
          {stocktakeRecord?.inventoryQuantity}
        </Form.Item>
        <Form.Item
          name="adjustedQuantity"
          label={t("盘后数量")}
          rules={REQUIRE_RULES}
          validateTrigger={["onBlur"]}
        >
          <Input
            placeholder={t("请输入盘后数量")}
            type="digit"
            ref={quantityRef}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default StocktakeBySampling;
