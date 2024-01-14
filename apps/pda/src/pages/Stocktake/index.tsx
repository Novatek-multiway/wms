import { useTranslation } from "react-i18next";
import { FC, useState, useEffect, useMemo, useRef } from "react";
import {
  Button,
  Form,
  Input,
  Toast,
  PickerProps,
  Picker,
  InputInstance,
} from "react-vant";
import styles from "./index.module.scss";
import {
  getPdaGetUnfinishStocktakeByMaterialCode,
  postPdaUpdateStocktakeRecord,
  getPdaInStockApply,
} from "apis";
import { REQUIRE_RULES } from "@/common/constants";

import type { API } from "apis";
const Stocktake: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<API.PdaStocktakeDetailDTO>();
  const [isLoading, setIsLoading] = useState(false);
  const [isApplyLoading, setIsApplyLoading] = useState(false);
  const [stocktakeList, setStocktakeList] = useState<
    API.PdaStocktakeDetailDTO[]
  >([]);
  const [stocktake, setStocktake] = useState<API.PdaStocktakeDetailDTO>();

  const isWorkbench = useMemo(
    () => stocktake && stocktake.positionType === 2,
    [stocktake]
  );

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
    form.setFieldValue("stocktakeCode", undefined);
  };

  const onChange = () => {
    form.setFieldValue("stocktakeCode", "");
    setStocktake(undefined);
    quantityRef.current?.clear();
  };

  const onConfirm: PickerProps<API.PdaStocktakeDetailDTO>["onConfirm"] = (
    value: string,
    selectedRow: API.PdaStocktakeDetailDTO,
    index: number
  ) => {
    form.setFieldValue("stocktakeCode", value);
    form.setFieldValue("adjustedQuantity", selectedRow?.adjustedQuantity);
    setStocktake(selectedRow);
  };

  const onSummit = async () => {
    const values = await form.validateFields();
    setIsLoading(true);
    const body: API.PdaStocktakeDetailDTO = {
      ...stocktake,
      adjustedQuantity: values.adjustedQuantity,
    };
    await postPdaUpdateStocktakeRecord(body).finally(() => setIsLoading(false));
    form.resetFields();
    resetFields();
    setStocktake(undefined);
    Toast.success(t("修改盘点记录成功！"));
  };

  const onSummitAndApply = async () => {
    const values = await form.validateFields();
    setIsApplyLoading(true);
    const body: API.PdaStocktakeDetailDTO = {
      ...stocktake,
      adjustedQuantity: values.adjustedQuantity,
    };
    await postPdaUpdateStocktakeRecord(body);
    Toast.success(t("修改盘点记录成功！"));
    const params: API.getPdaInStockApplyParams = {
      fromLocationCode: stocktake?.locationCode,
      containerCode: stocktake?.containerCode,
    };
    await getPdaInStockApply(params).finally(() => setIsApplyLoading(false));
    form.resetFields();
    resetFields();
    setStocktake(undefined);
    Toast.success(t("创建回库任务成功！"));
  };

  useEffect(() => {
    if (materialCode && locationCode) {
      getPdaGetUnfinishStocktakeByMaterialCode({
        materialCode,
        locationCode,
        containerCode,
      }).then((res: API.PdaStocktakeDetailDTOListR) => {
        setStocktakeList(
          res.resultData!.map((i) => ({
            ...i,
            value: i.stocktakeCode,
            text: i.stocktakeCode,
          }))
        );
      });
    }
  }, [materialCode, containerCode, locationCode]);

  return (
    <div className={styles.stocktake}>
      <Form
        colon
        form={form}
        footer={
          <div className={styles.footer}>
            <Button
              type="primary"
              disabled={!isWorkbench}
              onClick={onSummitAndApply}
              loading={isApplyLoading}
            >
              {t("提交/回库")}
            </Button>
            <Button
              className={styles.btn}
              type="primary"
              loading={isLoading}
              onClick={onSummit}
            >
              {t("提交")}
            </Button>
          </div>
        }
      >
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          name="stocktakeCode"
          label={t("盘点单号")}
          isLink
          trigger="onConfirm"
          rules={REQUIRE_RULES}
          onClick={(_, action) => {
            action?.current?.open();
          }}
        >
          <Picker
            popup
            columns={stocktakeList}
            onConfirm={onConfirm}
            placeholder=""
          >
            {(val) => val || t("请选择盘点单号")}
          </Picker>
        </Form.Item>
        <Form.Item name="inventoryQuantity" label={t("库存数量")} disabled>
          {stocktake?.inventoryQuantity}
        </Form.Item>
        <Form.Item
          name="adjustedQuantity"
          label={t("盘后数量")}
          required
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

export default Stocktake;
