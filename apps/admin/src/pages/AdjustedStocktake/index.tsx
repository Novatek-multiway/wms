import { Breadcrumb, Descriptions, message, Select, Spin } from 'antd';
import {
  getPadStocktakeAdjustedStocktake,
  getPadStocktakeGetAdjustedStocktake,
  getPadStocktakeGetStocktakingList,
} from 'apis';
import {
  MwAction,
  MwButton,
  MwSearchTable,
  MwSearchTableField,
  MwTableCtrlField,
  setDefaultDataFilter,
} from 'multiway';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getFieldBasedInterface } from 'utils';
import useEnumMap from '@/common/hooks/useEnumMap';
import useEnumOptions, { OptionItem } from '@/common/hooks/useEnumOptions';

import type { API } from 'apis';
import ScannerSelect from '@/components/ScannerSelect';
import { SCANNER_STOCKTAKE_CODE } from '@/common/constants';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
interface IStocktaking extends API.OutputStocktakeInfoDTO {
  value: number;
  label: string;
}

const getField = getFieldBasedInterface<API.OutputStocktakeInfoDTO>();

export default function AdjustedStocktake() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [stocktakingList, setStocktakingList] = useState<IStocktaking[]>([]);
  const [stocktakeId, setStocktakeId] = useState<string>();
  const [stocktake, setStocktake] = useState<IStocktaking>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSummitLoading, setIsSummitLoading] = useState(false);
  const [stocktakeRecords, setStocktakeRecords] = useState<API.StocktakeRecordInfoDTO[]>([]);

  const { map: stocktakeTypeMap } = useEnumMap('EnumStocktakeType', 'itemId', false);
  const { options: stocktakeStatusOptions } = useEnumOptions(
    'EnumStocktakeStatus',
    'itemId',
    false
  );

  const { options: qualityStatusOptions } = useEnumOptions('EnumQualityStatus', 'itemId', false);
  const { options: stocktakeRecordStatusOptions } = useEnumOptions(
    'EnumStocktakeRecordStatus',
    'itemId',
    false
  );

  const descriptionList = useMemo<OptionItem[]>(() => {
    if (!stocktake) return [];
    return [
      {
        value: stocktakeTypeMap?.[stocktake.stocktakeType!]?.itemName ?? '',
        label: t('盘点类型'),
      },
      {
        value: stocktakeStatusOptions.find((opt) => opt.value === stocktake.stocktakeStatus)?.label,
        label: t('盘点状态'),
      },
      {
        value: `${stocktake.targetAreaCode}(${stocktake.targetAreaName})`,
        label: t('搬运目标区域'),
      },
    ];
  }, [stocktake, stocktakeStatusOptions]);

  const initData = async () => {
    const res = (await getPadStocktakeGetStocktakingList()) as API.OutputStocktakeInfoDTOListR;
    const list: IStocktaking[] = (res?.resultData ?? [])?.map((record) => ({
      ...record,
      value: record.id!,
      label: record.stocktakeCode!,
    }));
    setStocktakingList(list);
  };

  const handleSelectChange = async (value: string, option: IStocktaking) => {
    setIsLoading(true);
    setStocktakeId(value);
    setStocktake(option);
    const res = (await getPadStocktakeGetAdjustedStocktake({
      id: value,
    }).finally(() => setIsLoading(false))) as API.StocktakeRecordInfoDTOListR;
    setStocktakeRecords(res?.resultData ?? []);
  };

  const back = () => {
    navigate('/inventory');
  };

  const handleSummit = async () => {
    setIsSummitLoading(true);
    await getPadStocktakeAdjustedStocktake({ id: stocktakeId }).then(() =>
      setIsSummitLoading(false)
    );

    message.success(t('盘点单申请调账成功'));
    back();
  };

  const fields: MwSearchTableField[] = [
    {
      title: t('盘点计划号'),
      key: 'stocktakeCode',
      width: 150,
      fixed: 'left',
    },
    {
      title: t('盘点状态'),
      key: 'stocktakeStatus',
      width: 150,
      options: stocktakeStatusOptions,
    },
    {
      title: t('被盘点库位'),
      key: 'customCode',
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
      render: (text: string, record: API.StocktakeRecordInfoDTO) =>
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
    },
    {
      title: t('盈亏状态'),
      key: 'stocktakeRecordStatus',
      width: 120,
      options: stocktakeRecordStatusOptions,
    },
  ];

  useEffect(() => {
    initData();
  }, []);

  useScannerCodeEffect(SCANNER_STOCKTAKE_CODE, (code) => {
    const option = stocktakingList.find((stock) => stock.value === code);
    if (option) {
      handleSelectChange(code, option);
    }
  });

  return (
    <div className="p-3">
      <Breadcrumb className="mb-2">
        <Breadcrumb.Item onClick={back}>{t('盘点')}</Breadcrumb.Item>
        <Breadcrumb.Item>{t('申请调账')}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-col">
        <div className="flex flex-row items-center mb-2">
          <div className="whitespace-nowrap mr-1">{t('盘点单号')}: </div>
          <ScannerSelect
            scannerKey={SCANNER_STOCKTAKE_CODE}
            options={stocktakingList}
            value={stocktakeId}
            onChange={handleSelectChange}
            placeholder={t('请选择盘点单号或者扫码')}
          />
        </div>
        <div className="flex-auto">
          {isLoading ? (
            <Spin />
          ) : (
            <div>
              <Descriptions>
                {descriptionList.map((des) => (
                  <Descriptions.Item key={des.label} label={des.label}>
                    {des.value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
              <MwSearchTable
                extraVisible={false}
                fields={fields}
                scrollX={1000}
                rowKey={'id'}
                data={stocktakeRecords}
              >
                <MwButton
                  loading={isSummitLoading}
                  type="primary"
                  disabled={!stocktakeId}
                  onClick={handleSummit}
                >
                  {t('提交')}
                </MwButton>
              </MwSearchTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
