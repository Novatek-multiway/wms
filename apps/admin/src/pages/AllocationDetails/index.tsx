import { Breadcrumb, Descriptions, InputNumber, message } from 'antd';
import {
    getPadOutboundCreateCarryTask, getPadOutboundGetAllocatedList, getPadOutboundGetInventoryList, getPadOutboundInStockApply,
    getPadOutboundSuggestInventoryList, postPadOutboundCancelAllocated, postPadOutboundConfirmAllocated, postPadOutboundCreateCarryTask
} from 'apis';
import { useAppSelector } from 'hooks';
import { pick, isEmpty, has } from 'lodash';
import { MwButton, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from 'multiway';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { commonOptions } from '@/common/constants';
import useEnumOptions from '@/common/hooks/useEnumOptions';
import CarryTaskDialog from '@/components/CarryTaskDialog';
import useCommonTableProps from './hooks/useCommonTableProps';
import useMaterialDescriptions from './hooks/useMaterialDescriptions';

import type { API } from 'apis';
export default function AllocationDetails() {
  const { t } = useTranslation();
  const { lineId } = useParams();
  const navigate = useNavigate();

  const invoiceRecord = useAppSelector((state) => state.outbound.invoiceRecord);
  const { options: qualityStatusOptions } = useEnumOptions('EnumQualityStatus', 'itemId', false);

  setDefaultDataFilter((res: any) => {
    // return 的对象需要包含以下两条数据
    return {
      // 表格列表的数据
      content: res?.resultData.map((item) => ({
        ...item,
        _quantity: 0, //  用做可分配库存表格数量输入框的字段绑定
      })),
      // 数据总共 n 条
      totalCount: (res?.resultData).length,
      ...res,
    };
  });

  const [confirmAllocatedLoading, setConfirmAllocatedLoading] = useState(false);
  const [cancelAllocatedLoading, setCancelAllocatedLoading] = useState(false);
  const [SuggestInventoryLoading, setSuggestInventoryLoading] = useState(false);
  const [batchCarryTaskLoading, setBatchCarryTaskLoading] = useState(false);

  const {
    isDisabled: isConfirmAllocatedDisabled,
    tableProps: inventoryTableProps,
    ref: inventoryTableRef,
    getSelections: getConfirmSelections,
  } = useCommonTableProps<API.OutputAllocationItemInfoDTO>({
    service: getPadOutboundGetInventoryList,
    lineId: lineId as string,
  });

  const {
    tableProps: allocatedTableProps,
    isDisabled: isCancelAllocatedDisabled,
    ref: allocatedTableRef,
    tableData,
  } = useCommonTableProps<API.OutputInventoryInfoDTO>({
    service: getPadOutboundGetAllocatedList,
    lineId: lineId as string,
  });

  const materialDes = useMaterialDescriptions({
    record: invoiceRecord,
    tableData,
    statusOptions: qualityStatusOptions,
  });

  const refresh = () => {
    allocatedTableRef?.current?.refresh?.();
    inventoryTableRef?.current?.refresh?.();
  };

  //  确认分配
  const handleConfirmAllocated = async () => {
    setConfirmAllocatedLoading(true);
    const selections = getConfirmSelections()?.map((selection) => ({
      ...pick(selection, ['containerId']),
      quantity: selection._quantity as number,
      inventoryId: selection.id,
      invoiceLineId: lineId,
    }));
    await postPadOutboundConfirmAllocated(selections).finally(() =>
      setConfirmAllocatedLoading(false)
    );

    message.success(t('分配成功'));
    inventoryTableRef?.current?.clearSelection?.();
    refresh();
  };

  // 系统推荐
  const handleSuggestInventory = async () => {
    setSuggestInventoryLoading(true);
    const { resultData } = await getPadOutboundSuggestInventoryList({
      lineId,
    }).finally(() => setSuggestInventoryLoading(false));

    if (!isEmpty(resultData)) {
      const idToQualityMap = resultData?.reduce((acc, cur) => {
        acc[cur.inventoryId] = cur.allotQuantity;
        return acc;
      }, {});
      const inventoryList = inventoryTableRef?.current?.getTableData();
      const selections: Record[] = [];
      const newInventoryList = inventoryList?.map((inventory) => {
        if (has(idToQualityMap, inventory.id)) {
          const newInventory = {
            ...inventory,
            _quantity: idToQualityMap[inventory.id!],
          };
          selections.push(newInventory);
          return newInventory;
        }
        return inventory;
      });
      inventoryTableRef.current?.setTableData(newInventoryList!);
      inventoryTableRef.current?.setSelection(selections);
    }
  };

  //  取消分配
  const handleCancelAllocated = async () => {
    setCancelAllocatedLoading(true);
    const selections = (allocatedTableRef?.current?.getSelection?.() ?? []).map(
      (selection) => selection.id!
    );

    await postPadOutboundCancelAllocated(selections).finally(() =>
      setCancelAllocatedLoading(false)
    );

    allocatedTableRef?.current?.clearSelection?.();
    refresh();
  };

  // 搬运
  const handleCarryTask = async (
    record: API.OutputAllocationItemInfoDTO,
    targetLocation: string
  ) => {
    return getPadOutboundCreateCarryTask({
      allocationId: record.id,
      targetLocation,
    });
  };

  //  批量搬运
  const handleBatchCarryTask = async () => {
    setBatchCarryTaskLoading(true);
    const selections = (allocatedTableRef?.current?.getSelection?.() ?? []).map(
      (selection) => selection.id!
    );

    if (!selections.length) {
      setBatchCarryTaskLoading(false);
      return;
    }
    await postPadOutboundCreateCarryTask(selections).finally(() => setBatchCarryTaskLoading(false));
    allocatedTableRef?.current?.clearSelection?.();
    message.success(t('搬运成功'));
    refresh();
  };

  // 出库
  const handleOutboundPicking = (record: API.OutputAllocationItemInfoDTO) => {
    const query = {
      ...pick(record, ['areaId', 'locationCode']),
      ...pick(invoiceRecord, ['invoiceCode']),
    };
    const queryStr = Object.entries(query)
      .map((i) => i.join('='))
      .join('&');
    navigate(`/outboundPicking?${queryStr}`);
  };

  // 回库
  const handleInStockApply = async (record: API.OutputAllocationItemInfoDTO) => {
    const params: API.getPadOutboundInStockApplyParams = {
      fromLocationCode: record.locationCode,
      containerCode: record.containerCode,
    };
    await getPadOutboundInStockApply(params);
    message.success(t('回库成功'));
    refresh();
  };

  const handleTableChange = (value: string | number, index: number, field: string) => {
    const currentData = inventoryTableRef?.current?.getTableData();
    const newTableData = currentData?.map((item: Record, idx: number) => {
      if (idx === index) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    inventoryTableRef?.current?.setTableData?.(newTableData);
  };

  const allocatedTableFields: Array<MwSearchTableField> = [
    {
      title: t('容器编号'),
      key: 'containerCode',
      width: 150,
      fixed: 'left',
    },
    {
      title: t('所属区域'),
      key: 'areaName',
      width: 150,
      render: (text: string, record: API.OutputAllocationItemInfoDTO) =>
        text && record.areaCode ? `${record.areaCode}(${text})` : '',
    },
    {
      title: t('容器位置'),
      key: 'customCode',
      width: 180,
    },
    {
      title: t('已分配数量'),
      key: 'quantity',
      width: 120,
    },
    {
      title: t('拣选数量'),
      key: 'pickingQuantity',
      width: 100,
    },
    {
      title: t('拣选完成'),
      key: 'isPickingFinish',
      width: 100,
      options: commonOptions,
    },
  ];

  const inventoryTableFields: Array<MwSearchTableField> = [
    {
      title: t('容器编号'),
      key: 'containerCode',
      width: 120,
      fixed: 'left',
    },
    {
      title: t('位置编号'),
      key: 'customCode',
      width: 150,
    },
    {
      title: t('创建时间'),
      key: 'createTime',
      width: 150,
    },
    {
      title: t('分配锁定'),
      key: 'lockedQuantity',
      width: 120,
    },
    {
      title: t('可用数量'),
      key: 'availableQuantity',
      width: 120,
    },
    {
      title: t('分配数量'),
      key: '_quantity',
      width: 120,
      fixed: 'right',
      render: (text: number, record, index) => (
        <InputNumber
          min={0}
          value={text}
          placeholder={t('请输入组盘数量')}
          onChange={(val) => handleTableChange(val as number, index, '_quantity')}
        ></InputNumber>
      ),
    },
  ];

  const ctrl: MwTableCtrlField = {
    width: 240,
    fixed: 'right',
    title: t('operation'),
    render: (_, subRecord: API.OutputAllocationItemInfoDTO) => {
      if (subRecord.isPickingFinish) {
        return (
          <>
            <MwButton
              disabled={!subRecord.locationCode}
              size="small"
              type="primary"
              onClick={() => handleInStockApply(subRecord)}
            >
              {t('回库')}
            </MwButton>
          </>
        );
      }
      return (
        <>
          <CarryTaskDialog
            summit={(targetLocation) => handleCarryTask(subRecord, targetLocation)}
            areaId={subRecord.areaId!}
          />
          <MwButton
            className="ml-2"
            size="small"
            type="primary"
            onClick={() => handleOutboundPicking(subRecord)}
          >
            {t('出库')}
          </MwButton>
        </>
      );
    },
  };

  return (
    <div className="p-3">
      <div className="text-base mb-2">
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => navigate('/shipmentBusiness')}>
            {t('发货')}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{t('分配明细')}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Descriptions title={null} column={4}>
        {materialDes.map(({ value, label }) => (
          <Descriptions.Item label={label} key={label}>
            {value}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <MwSearchTable
        title={t('已分配库存')}
        fields={allocatedTableFields}
        extraVisible={false}
        ctrl={ctrl}
        selectShowKey="containerCode"
        rowSelection={{
          getCheckboxProps: (record: any) => ({
            disabled: record.isPickingFinish,
          }),
        }}
        {...allocatedTableProps}
      >
        <MwButton type="primary" onClick={handleBatchCarryTask} loading={batchCarryTaskLoading}>
          {t('批量搬运')}
        </MwButton>
        <MwButton
          type="primary"
          onClick={handleCancelAllocated}
          disabled={isCancelAllocatedDisabled}
          loading={cancelAllocatedLoading}
        >
          {t('取消分配')}
        </MwButton>
      </MwSearchTable>
      <MwSearchTable
        title={t('可分配库存')}
        fields={inventoryTableFields}
        selectShowKey="containerCode"
        extraVisible={false}
        {...inventoryTableProps}
      >
        <MwButton type="primary" onClick={handleSuggestInventory} loading={SuggestInventoryLoading}>
          {t('系统推荐')}
        </MwButton>
        <MwButton
          type="primary"
          onClick={handleConfirmAllocated}
          disabled={isConfirmAllocatedDisabled}
          loading={confirmAllocatedLoading}
        >
          {t('确认分配')}
        </MwButton>
      </MwSearchTable>
    </div>
  );
}
