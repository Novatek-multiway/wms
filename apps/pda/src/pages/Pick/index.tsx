import { useTranslation } from "react-i18next";
import { FC, useEffect, useState, useMemo, useRef } from "react";
import {
  Button,
  Form,
  Input,
  Toast,
  Picker,
  PickerProps,
  InputInstance,
} from "react-vant";
import styles from "./index.module.scss";
import {
  getPdaGetUnfinishOutboundByMaterialCode,
  postPdaOutboundPicking,
  getPdaInStockApply,
} from "apis";
import { REQUIRE_RULES } from "@/common/constants";
import type { API } from "apis";
const Pick: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<API.PdaPickingDTO>();
  const [isLoading, setIsLoading] = useState(false);
  const [isApplyLoading, setIsApplyLoading] = useState(false);
  const [invoiceList, setInvoiceList] = useState<API.PdaPickingDTO[]>([]);
  const [invoiceLine, setInvoiceLine] = useState<API.PdaPickingDTO>();

  const materialCode = Form.useWatch("materialCode", form);
  const locationCode = Form.useWatch("locationCode", form);
  const containerCode = Form.useWatch("containerCode", form);

  const locationCodeRef = useRef<InputInstance>(null);
  const containerCodeRef = useRef<InputInstance>(null);
  const materialCodeRef = useRef<InputInstance>(null);
  const receiptCodeRef = useRef<InputInstance>(null);
  const quantityRef = useRef<InputInstance>(null);

  const resetFields = () => {
    locationCodeRef.current?.clear();
    containerCodeRef.current?.clear();
    materialCodeRef.current?.clear();
    receiptCodeRef.current?.clear();
    quantityRef.current?.clear();
  };

  const isWorkbench = useMemo(
    () => invoiceLine && invoiceLine.positionType === 2,
    [invoiceLine]
  );

  const onConfirm: PickerProps<API.PdaPickingDTO>["onConfirm"] = (
    value: string,
    selectedRow: API.PdaPickingDTO,
    index: number
  ) => {
    form.setFieldValue("invoiceCode", value);
    form.setFieldValue("pickingQuantity", selectedRow?.allotQuantity);
    setInvoiceLine(selectedRow);
  };

  const onChange = () => {
    receiptCodeRef.current?.clear();
    setInvoiceLine(undefined);
    quantityRef.current?.clear();
  };

  const onSummit = async () => {
    const values = await form.validateFields();
    setIsLoading(true);
    const body: API.PdaPickingDTO = {
      ...invoiceLine,
      pickingQuantity: values.pickingQuantity,
    };
    await postPdaOutboundPicking(body).finally(() => setIsLoading(false));
    form.resetFields();
    resetFields();
    setInvoiceLine(undefined);
    Toast.success(t("出库成功！"));
  };

  const onSummitAndApply = async () => {
    const values = await form.validateFields();
    setIsApplyLoading(true);
    const body: API.PdaPickingDTO = {
      ...invoiceLine,
      pickingQuantity: values.pickingQuantity,
    };
    await postPdaOutboundPicking(body);
    Toast.success(t("出库成功！"));
    const params: API.getPdaInStockApplyParams = {
      fromLocationCode: invoiceLine?.locationCode,
      containerCode: invoiceLine?.containerCode,
    };
    await getPdaInStockApply(params).finally(() => setIsApplyLoading(false));
    form.resetFields();
    resetFields();
    setInvoiceLine(undefined);
    Toast.success(t("创建回库任务成功！"));
  };

  const onOpen = async (actions: any) => {
    getPdaGetUnfinishOutboundByMaterialCode({
      materialCode,
      locationCode,
      containerCode,
    }).then((res: API.PdaPickingDTOListR) => {
      setInvoiceList(
        res.resultData!.map((i) => ({
          ...i,
          value: i.invoiceCode,
          text: i.invoiceCode,
        }))
      );
      actions.open();
    });
  };

  return (
    <div className={styles.pick}>
      <Form
        colon
        form={form}
        footer={
          <div className={styles.footer}>
            <Button
              type="primary"
              loading={isApplyLoading}
              disabled={!isWorkbench}
              onClick={onSummitAndApply}
            >
              {t("提交/回库")}
            </Button>
            <Button
              className={styles.btn}
              type="primary"
              onClick={onSummit}
              loading={isLoading}
            >
              {t("提交")}
            </Button>
          </div>
        }
      >
        <Form.Item
          name="locationCode"
          label={t("拣选位置")}
          rules={REQUIRE_RULES}
          validateTrigger={["onBlur"]}
        >
          <Input
            placeholder={t("请输入拣选位置或扫码")}
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
          name="invoiceCode"
          label={t("发货单号")}
          rules={REQUIRE_RULES}
          validateTrigger={["onBlur"]}
        >
          <Input
            ref={receiptCodeRef}
            placeholder={t("请输入发货单号或扫码")}
            disabled
            suffix={
              <Picker
                popup={{
                  round: true,
                }}
                title={t("请选择发货单号")}
                columns={invoiceList}
                onConfirm={onConfirm}
                placeholder=""
              >
                {(val, _, actions) => {
                  return (
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => onOpen(actions)}
                    >
                      {t("待发列表")}
                    </Button>
                  );
                }}
              </Picker>
            }
          />
        </Form.Item>
        <Form.Item name="invoiceQuantity" label={t("应发数量")} disabled>
          {invoiceLine?.invoiceQuantity}
        </Form.Item>
        <Form.Item name="outboundQuantity" label={t("已发数量")} disabled>
          {invoiceLine?.outboundQuantity ?? 0}
        </Form.Item>
        <Form.Item name="allotQuantity" label={t("可拣选数量")} disabled>
          {invoiceLine?.allotQuantity}
        </Form.Item>
        <Form.Item
          validateTrigger={["onBlur"]}
          name="pickingQuantity"
          label={t("拣选数量")}
          required
          rules={[
            {
              validator: (_, value) => {
                if (invoiceLine?.allotQuantity) return Promise.resolve(true);
                if (Number(value) > invoiceLine?.allotQuantity!) {
                  return Promise.reject(
                    new Error(t("拣选数量不能大于可拣选数量"))
                  );
                }
                return Promise.resolve(true);
              },
            },
          ]}
        >
          <Input
            placeholder={t("请输入拣选数量")}
            type="digit"
            ref={quantityRef}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Pick;
