import { useTranslation } from 'react-i18next';
import { Cascader, Input, message, Radio, RadioChangeEvent, Space } from 'antd';
import {
  postPadStocktakeCreateCarryTask,
  postPadStocktakeGetFinishPageData,
  postPadStocktakeGetUnfinishPageData,
  getPadStocktakeInStockApply,
} from 'apis';
import { isEmpty } from 'lodash';
import {
  MwAction,
  MwButton,
  MwCtrl,
  MwSearchTable,
  MwSearchTableField,
  MwTableCtrlField,
  setDefaultDataFilter,
} from 'multiway';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFieldBasedInterface } from 'utils';
import { commonOptions, SCANNER_INVENTORY_CODE } from '@/common/constants';
import useEnumOptions from '@/common/hooks/useEnumOptions';
import useStatusOptions from '@/common/hooks/useStatusOptions';
import { ITable } from '@/typing';

import type { API } from 'apis';
import { getPadStocktakeCreateCarryTask } from 'apis/modules/stocktake';
import CarryTaskDialog from '@/components/CarryTaskDialog';
import ScannerInput from '@/components/ScannerInput';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
const { Search } = Input;

const getField = getFieldBasedInterface<API.PadStocktakeLocationDTO>();

function Inventory() {
  const { t } = useTranslation();
  setDefaultDataFilter((res: API.PadStocktakeLocationDTOPageResultR) => {
    return {
      content: res?.resultData?.pageData ?? [],
      totalCount: res?.resultData?.totalCount ?? 0,
      ...res,
    };
  });

  const [isFinish, setIsFinish] = useState(false);
  const [taskCode, setTaskCode] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCarryTaskLoading, setIsCarryTaskLoading] = useState(false);

  const tableRef = useRef<ITable<API.PadStocktakeLocationDTO>>(null);
  const navigate = useNavigate();

  const api = async (res: any) => {
    const {
      pagination: { current, pageSize },
    } = res;
    const data: API.QueryPadStocktakeLocationPageingParameter = {
      pageIndex: current,
      pageSize,
      query: {
        stocktakeCode: taskCode,
      },
    };
    const service = isFinish
      ? postPadStocktakeGetFinishPageData
      : postPadStocktakeGetUnfinishPageData;
    return service(data);
  };

  const { options: stocktakeStatusOptions, statusEnum } = useStatusOptions(
    'EnumStocktakeStatus',
    'itemId',
    false
  );

  const { options: stocktakeTypeOptions } = useEnumOptions('EnumStocktakeType', 'itemId', false);
  const { options: positionTypeOptions } = useEnumOptions('EnumPositionType', 'itemId', false);

  const handleRadioChange = (e: RadioChangeEvent) => {
    setIsFinish(e.target.value);
    tableRef?.current?.refresh();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskCode(e.target.value);
    tableRef?.current?.refresh();
  };

  const toRecord = (record: API.PadStocktakeLocationDTO) => {
    navigate(`/stocktakeRecord/${record.stocktakeLocationId}`);
  };

  const toAdjusted = () => {
    navigate('/adjustedStocktake');
  };

  const toSamplingStocktake = () => {
    navigate('/samplingStocktake');
  };

  const handleSelectionsChange = (selections: API.PadStocktakeLocationDTO[], values: string[]) => {
    setIsDisabled(isEmpty(values));
  };

  const handleBatchCarryTask = async () => {
    setIsCarryTaskLoading(true);
    const selections = tableRef.current?.getSelection()?.map((sel) => sel.stocktakeLocationId!);
    await postPadStocktakeCreateCarryTask(selections!).finally(() => setIsCarryTaskLoading(false));
    message.success(t('搬运成功'));
  };

  const handleCarryTask = (record: API.PadStocktakeLocationDTO, targetLocation: string) => {
    return getPadStocktakeCreateCarryTask({
      targetLocation,
      id: record.stocktakeLocationId,
    });
  };

  const handleInStockApply = async (record: API.PadStocktakeLocationDTO) => {
    await getPadStocktakeInStockApply({
      fromLocationCode: record.locationCode,
      containerCode: record.containerCode,
    });
    message.success(t('回库成功'));
  };

  const fields: Array<MwSearchTableField> = [
    {
      title: t('盘点计划号'),
      key: 'stocktakeCode',
      width: 150,
      fixed: 'left',
    },
    {
      title: t('盘点类型'),
      key: 'stocktakeType',
      width: 150,
      options: stocktakeTypeOptions,
    },
    {
      title: t('搬运目标区域'),
      key: 'targetAreaCode',
      width: 150,
      render: (text: string, record: API.PadStocktakeLocationDTO) =>
        `${text}(${record.targetAreaName})`,
    },
    {
      title: t('盘点状态'),
      key: 'stocktakeStatus',
      options: stocktakeStatusOptions,
      width: 150,
      valueEnum: statusEnum,
      renderType: 'status',
    },
    {
      title: t('被盘库位编号'),
      key: 'customCode',
      width: 150,
    },
    {
      title: t('容器编号'),
      key: 'containerCode',
      width: 150,
    },
    {
      title: t('容器位置'),
      key: 'containerPosition',
      width: 150,
    },
    {
      title: t('容器位置类型'),
      key: 'containerPositionType',
      width: 150,
      options: positionTypeOptions,
    },
    {
      title: t('允许回库'),
      key: 'isAllowReturn',
      width: 120,
      options: commonOptions,
    },
  ];

  const ctrl: MwTableCtrlField = {
    width: 220,
    fixed: 'right',
    title: t('operation'),
    render: (_, record: API.PadStocktakeLocationDTO) => (
      <>
        <CarryTaskDialog
          summit={(targetLocation) => handleCarryTask(record, targetLocation)}
          areaId={record.targetAreaId!}
        />

        {record.isAllowReturn && (
          <MwButton
            size="small"
            type="primary"
            className="ml-[6px]"
            onClick={() => handleInStockApply(record)}
          >
            {t('回库')}
          </MwButton>
        )}

        {!isFinish && (
          <MwButton
            type="primary"
            size="small"
            className="ml-1"
            onClick={() => {
              toRecord(record);
            }}
          >
            {t('盘点记录')}
          </MwButton>
        )}
      </>
    ),
  };

  useScannerCodeEffect(SCANNER_INVENTORY_CODE, (code) => {
    handleInputChange({ target: { value: code } });
  });

  return (
    <MwSearchTable
      ref={tableRef}
      api={api}
      fields={fields}
      rowKey="stocktakeLocationId"
      scrollX={800}
      onSelectionChange={handleSelectionsChange}
      selectionType="checkbox"
      selectShowKey="stocktakeLocationId"
      extraVisible={false}
      title={
        <>
          <Radio.Group value={isFinish} buttonStyle="solid" onChange={handleRadioChange}>
            <Radio.Button value={false}>{t('未完成')}</Radio.Button>
            <Radio.Button value={true}>{t('已完成')}</Radio.Button>
          </Radio.Group>
          <ScannerInput
            value={taskCode}
            placeholder={t('输入盘点单号，可以扫码')}
            onChange={handleInputChange}
            scannerKey={SCANNER_INVENTORY_CODE}
          />
        </>
      }
      ctrl={ctrl}
    >
      <>
        <MwButton
          type="primary"
          onClick={handleBatchCarryTask}
          loading={isCarryTaskLoading}
          disabled={isDisabled}
        >
          {t('批量搬运')}
        </MwButton>
        {!isFinish && (
          <MwButton type="primary" onClick={toAdjusted}>
            {t('申请调账')}
          </MwButton>
        )}

        <MwButton type="primary" onClick={toSamplingStocktake}>
          {t('抽样盘点')}
        </MwButton>
      </>
    </MwSearchTable>
  );
}

export default Inventory;
