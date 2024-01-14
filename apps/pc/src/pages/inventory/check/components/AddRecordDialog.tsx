
import useConvertorRequest from "@/hooks/useConvertorRequest";
import { getMaterialInfo } from "@/pages/basicConfiguration/material/services/materialInfo";
import useLocationCodeOptions from "@/pages/shoppingBusiness/picking/hooks/useLocationCodeOptions";
import { materialTypeIdOptions } from "@/utils/date";
import { Cascader, message } from "antd";
import { MwButton, MwCtrl, MwDialogForm, MwDialogFormField, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { last, omit } from 'lodash';
import services from "../../services";

interface IProps {
	record: Record;
  refresh: () => void;
}

export default function AddRecordDialog({ record, refresh }: IProps) {
  const { t: ot } = useTranslation();
  const t = (key: string): string => ot(key);
  const formRef = useRef<any>()

  const { AddStocktakeRecordInfo } = services;

  const [visible, setVisible] = useState(false);

  const materialOptions = useConvertorRequest(getMaterialInfo, option => ({
		...option,
		label: `${option.materialCode}(${option.materialName})`,
		value: option.materialCode
	})); // 物料信息

  const { locationCodeOptions, load } = useLocationCodeOptions()

  const fields: Array<MwDialogFormField> = [
    {
      title: '被盘点库位',
      key: 'locationCode',
      required: true,
      type: 'custom',
      renderContent: () => {
				return (
					<Cascader
						options={locationCodeOptions}
						displayRender={(labels: string[]) => labels[labels.length - 1]}
						style={{ width: "100%" }}
						placeholder={t("请选择组盘位置")}
					/>
				);
			}
    },
    {
      title: '物料编号',
      key: 'materialCode',
      required: true,
      type: 'select',
      options: materialOptions
    },
    {
      title: '包装类型',
      key: 'materialTypeId',
      type: 'select',
      options: materialTypeIdOptions
    },
    {
      title: 'LPN',
      key: 'lpn',
      required: true
    },
  ];

  const onAddRecord = (data: any) => {
    const body = {
      ...omit(data, ['locationCode']),
      locationCode: last(data.locationCode),
      stocktakeId: record.id
    }
    return AddStocktakeRecordInfo(body)
  }

  return (
    <>
      <MwCtrl>
				<MwButton onClick={() => setVisible(true)}>{t("新增盘亏")}</MwButton>
			</MwCtrl>
      <MwDialogForm
        ref={formRef}
        visible={visible}
        fields={fields}
        addApi={onAddRecord}
        onClose={() => setVisible(false)}
        onSuccess={() => {
          message.success('操作成功');
          refresh();
        }}
      />
    </>
  )
}
