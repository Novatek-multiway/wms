import { useTranslation } from 'react-i18next';
import { Breadcrumb, Cascader, Descriptions, Input, InputNumber, message } from 'antd';
import {
  MwAction,
  MwButton,
  MwCtrl,
  MwSearchTable,
  MwSearchTableField,
  MwTableCtrlField,
  setDefaultDataFilter,
} from 'multiway';
import { useNavigate, useParams } from 'react-router-dom';
import { commonOptions } from '@/common/constants';
import {
  API,
  getPadStocktakeGetStocktakeRecordByLocation,
  postPadStocktakeUpdateStocktakeRecord,
} from 'apis';
import { ITable } from '@/typing';
import { useRef } from 'react';
import useEnumOptions from '@/common/hooks/useEnumOptions';

export default function StocktakeRecord() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { stocktakeLocationId = '' } = useParams();

  setDefaultDataFilter((res: API.OutputStocktakeRecordInfoDTOListR) => {
    return {
      content: res?.resultData ?? [],
      totalCount: res?.resultData?.length ?? 0,
      ...res,
    };
  });

  const tableRef = useRef<ITable<API.OutputStocktakeRecordInfoDTO>>(null);

  const { options: qualityStatusOptions } = useEnumOptions('EnumQualityStatus', 'itemId', false);
  const { options: stocktakeRecordStatusOptions } = useEnumOptions(
    'EnumStocktakeRecordStatus',
    'itemId',
    false
  );

  const back = () => {
    navigate('/inventory');
  };

  const handleTableChange = (
    value: string | number,
    index: number,
    field: keyof API.OutputStocktakeRecordInfoDTO
  ) => {
    const currentData = tableRef?.current?.getTableData();
    const newTableData = currentData?.map((item, idx: number) => {
      if (idx === index) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    tableRef?.current?.setTableData?.(newTableData!);
  };

  const handleUpdate = async (record: API.OutputStocktakeRecordInfoDTO) => {
    // console.log('record: ', record);
    await postPadStocktakeUpdateStocktakeRecord([record]);
    message.success(t('更新盘点计划成功'));
    tableRef.current?.refresh();
  };

  const fields: MwSearchTableField[] = [
    {
      title: t('盘点计划号'),
      key: 'stocktakeCode',
      width: 150,
      fixed: 'left',
    },
    {
      title: t('被盘点库位'),
      key: 'customCode',
      width: 150,
    },
    {
      title: t('容器位置'),
      key: 'containerPositionCode',
      width: 150,
    },
    {
      title: t('容器编号'),
      key: 'containerCode',
      width: 150,
    },
    {
      title: t('物料编号'),
      key: 'materialCode',
      width: 150,
      render: (text: string, record: API.OutputStocktakeRecordInfoDTO) =>
        `${text}(${record.materialName})`,
    },
    {
      title: t('物料规格'),
      key: 'materialSize',
      width: 150,
    },
    {
      title: t('质量状态'),
      key: 'qualityStatus',
      width: 150,
      options: qualityStatusOptions,
    },
    {
      title: t('盘前数量'),
      key: 'stocktakeQuantity',
      width: 100,
    },
    {
      title: t('盘后数量'),
      key: 'adjustedQuantity',
      width: 150,
      render: (text: number, record, index) => (
        <InputNumber
          min={0}
          value={text}
          placeholder={t('请输入盘后数量')}
          onChange={(val) => handleTableChange(val as number, index, 'adjustedQuantity')}
        />
      ),
    },
    {
      title: t('盈亏状态'),
      key: 'stocktakeRecordStatus',
      width: 120,
      options: stocktakeRecordStatusOptions,
    },
    {
      title: t('盘点完成'),
      key: 'isFinish',
      width: 120,
      options: commonOptions,
    },
  ];

  const ctrl: MwTableCtrlField = {
    width: 150,
    fixed: 'right',
    title: t('operation'),
    render: (_, record: API.PadStocktakeLocationDTO) => (
      <>
        <MwButton
          type="primary"
          size="small"
          onClick={() => {
            handleUpdate(record);
          }}
        >
          {t('提交')}
        </MwButton>
      </>
    ),
  };

  return (
    <div className="p-3">
      <Breadcrumb className="mb-2">
        <Breadcrumb.Item onClick={back}>{t('盘点')}</Breadcrumb.Item>
        <Breadcrumb.Item>{t('盘点记录')}</Breadcrumb.Item>
      </Breadcrumb>
      <MwSearchTable
        // @ts-ignore
        api={() => getPadStocktakeGetStocktakeRecordByLocation({ stocktakeLocationId })}
        extraVisible={false}
        fields={fields}
        scrollX={1300}
        rowKey={'id'}
        ref={tableRef}
        ctrl={ctrl}
      ></MwSearchTable>
    </div>
  );
}
