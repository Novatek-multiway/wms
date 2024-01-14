import { useTranslation } from "react-i18next";
import {
  getPadContainerInventoryGetAllContainerSelectItem,
  getPdaGetUnfinishInboundByMaterialCode,
  postPdaBinding,
} from "apis";
import { FC, useEffect, useRef, useState } from "react";
import {
  Button,
  DatetimePicker,
  Form,
  Input,
  InputInstance,
  Picker,
  PickerProps,
  Radio,
  Toast,
} from "react-vant";
import { CARRY_STATUS, REQUIRE_RULES } from "@/common/constants";
import styles from "./index.module.scss";

import type { API } from "apis";

function getYesterday() {
  var today = new Date();
  var yesterday = new Date(today.getTime());
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
}

function getNextYearDate() {
  var today = new Date();
  var nextYear = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  );
  return nextYear;
}

const Combine: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<API.PadCombineInfoDTO>();
  const [isLoading, setIsLoading] = useState(false);
  const [receiptLines, setReceiptLines] = useState<API.PadReceiptLineInfoDTO[]>(
    []
  );
  const [receiptLine, setReceiptLine] = useState<API.PadReceiptLineInfoDTO>();
  const [containerList, setContainerList] = useState<API.SelectItem[]>([]);

  const locationCodeRef = useRef<InputInstance>(null);
  const containerCodeRef = useRef<InputInstance>(null);
  const materialCodeRef = useRef<InputInstance>(null);
  const receiptCodeRef = useRef<InputInstance>(null);
  const quantityRef = useRef<InputInstance>(null);

  const materialCode = Form.useWatch("materialCode", form);

  const onDateChange = (date: Date) => {
    form.setFieldValue("receivingDate", date);
  };

  const onConfirm: PickerProps<API.PadReceiptLineInfoDTO>["onConfirm"] = (
    value: string,
    selectedRow: API.PadReceiptLineInfoDTO,
    index: number
  ) => {
    form.setFieldValue("receiptCode", value);
    setReceiptLine(selectedRow);
  };

  const resetFields = () => {
    locationCodeRef.current?.clear();
    containerCodeRef.current?.clear();
    materialCodeRef.current?.clear();
    receiptCodeRef.current?.clear();
    quantityRef.current?.clear();
  };

  const onOpen = async (actions: any) => {
    const res = await getPdaGetUnfinishInboundByMaterialCode({ materialCode });
    setReceiptLines(
      res.resultData!.map((r) => ({
        ...r,
        value: r.receiptCode,
        text: r.receiptCode,
      }))
    );
    actions.open();
  };

  const onFinish = async () => {
    setIsLoading(true);
    const values = await form.validateFields();
    const containerItem = containerList.find(
      (c) => c.itemValue === values.containerCode
    );
    const body: API.PadCombineInfoDTO = {
      carryStatus: values.carryStatus,
      locationCode: values.locationCode,
      containerId: containerItem?.itemId,
      containerCode: values.containerCode,
      containerTypeId: containerItem?.dataItem?.containerTypeId,
      receiptCode: values.receiptCode,
      materialCode: values.materialCode,
      qualityStatus: 2,
      quantity: values.quantity,
      receivingDate: values.receivingDate?.toLocaleDateString?.(),
      materialUID: receiptLine?.hasMaterialSign ? values.materialUID : "",
    };
    await postPdaBinding(body).finally(() => setIsLoading(false));
    form.resetFields();
    resetFields();
    setReceiptLines([]);
    setReceiptLine(undefined);
    Toast.success(t("创建组盘任务成功！"));
  };

  useEffect(() => {
    locationCodeRef.current?.focus();
    getPadContainerInventoryGetAllContainerSelectItem().then(
      (res: API.SelectItemListR) => {
        setContainerList(res.resultData!);
      }
    );
  }, []);

  return (
    <div className={styles.combine}>
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
        initialValues={{
          receivingDate: new Date(),
          qualityStatus: 2,
          carryStatus: 1,
        }}
      >
        <Form.Item name="carryStatus" label={t("载货状态")}>
          <Radio.Group direction="horizontal" className={styles.radio}>
            {CARRY_STATUS.map(({ value, label }) => (
              <Radio name={value} key={label}>
                {label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(p, n) => p.carryStatus !== n.carryStatus}
        >
          {({ getFieldValue }) => {
            const carryStatus = getFieldValue?.("carryStatus") ?? 1;
            const content = [
              <Form.Item
                validateTrigger={["onBlur"]}
                name="locationCode"
                label={t("组盘位置")}
                key="locationCode"
                required
                rules={[{ required: true, message: t("必填") }]}
              >
                <Input
                  placeholder={t("请输入组盘位置或扫码")}
                  clearable
                  ref={locationCodeRef}
                />
              </Form.Item>,
              <Form.Item
                validateTrigger={["onBlur"]}
                name="containerCode"
                label={t("托盘编号")}
                key="containerCode"
                required
                rules={REQUIRE_RULES}
              >
                <Input
                  placeholder={t("请输入托盘编号或扫码")}
                  clearable
                  ref={containerCodeRef}
                />
              </Form.Item>,
            ];

            if (carryStatus !== 0) {
              content.push(
                ...[
                  <Form.Item
                    validateTrigger={["onBlur"]}
                    name="materialCode"
                    label={t("物料编号")}
                    key="materialCode"
                    required
                    rules={REQUIRE_RULES}
                  >
                    <Input
                      placeholder={t("请输入物料编号或扫码")}
                      clearable
                      ref={materialCodeRef}
                    />
                  </Form.Item>,
                  <Form.Item
                    validateTrigger={["onBlur"]}
                    name="receiptCode"
                    label={t("收货单号")}
                    key="receiptCode"
                    required
                    rules={REQUIRE_RULES}
                  >
                    <Input
                      placeholder={t("请输入收货单号或扫码")}
                      ref={receiptCodeRef}
                      suffix={
                        <Picker
                          placeholder=""
                          popup={{
                            round: true,
                          }}
                          title={t("请选择收货单号")}
                          columns={receiptLines}
                          onConfirm={onConfirm}
                        >
                          {(val, _, actions) => {
                            return (
                              <Button
                                size="small"
                                type="primary"
                                onClick={() => onOpen(actions)}
                              >
                                {t("待收列表")}
                              </Button>
                            );
                          }}
                        </Picker>
                      }
                    />
                  </Form.Item>,
                  <Form.Item
                    name="receivableQuantity"
                    label={t("应收数量")}
                    disabled
                    key="receivableQuantity"
                  >
                    <span>{receiptLine?.receivableQuantity ?? 0}</span>
                    <span className="w-[6.2em] ml-3">{t("已收数量：")}</span>
                    <span>{receiptLine?.receivedQuantity ?? 0}</span>
                  </Form.Item>,
                  <Form.Item
                    name="quantity"
                    label={t("收货数量")}
                    key="quantity"
                    validateTrigger={["onBlur"]}
                    rules={REQUIRE_RULES}
                  >
                    <Input
                      placeholder={t("请输入收货数量")}
                      type="digit"
                      ref={quantityRef}
                    />
                  </Form.Item>,
                  <Form.Item
                    name="receivingDate"
                    label={t("收货日期")}
                    isLink
                    onClick={(_, action) => {
                      action?.current?.open();
                    }}
                    key="receivingDate"
                  >
                    <DatetimePicker
                      popup={{ round: true }}
                      type="date"
                      onConfirm={onDateChange}
                      confirmButtonText=" "
                      minDate={getYesterday()}
                      maxDate={getNextYearDate()}
                    >
                      {(val: Date) =>
                        val ? val.toLocaleDateString() : t("请选择日期")
                      }
                    </DatetimePicker>
                  </Form.Item>,
                ]
              );
              if (receiptLine?.hasMaterialSign) {
                content.push(
                  <Form.Item
                    name="materialUID"
                    label={t("物料标识")}
                    key="materialUID"
                    rules={REQUIRE_RULES}
                    required
                  >
                    <Input placeholder={t("请输入物料标识")} />
                  </Form.Item>
                );
              }
            }
            return content;
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Combine;
