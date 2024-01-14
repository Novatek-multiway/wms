import { Breadcrumb, InputNumber, message } from 'antd';
import {
  getPadOutboundGetContainerInventory,
  getPadOutboundInStockApply,
  postPadOutboundOutboundPicking,
} from 'apis';
import { isEmpty, last } from 'lodash';
import { MwButton, MwSearchTable, MwSearchTableField, setDefaultDataFilter } from 'multiway';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { SCANNER_PICKING_LOCATIONCODE, SCANNER_PICKING_RECEIPTCODE } from '@/common/constants';
import useEnumOptions from '@/common/hooks/useEnumOptions';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';
import ScannerCascader from '@/components/ScannerCascader';
import ScannerInput from '@/components/ScannerInput';
import { ITable } from '@/typing';

import type { API } from 'apis';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
import { findParentIds } from 'utils';
interface IQuery {
  areaId: string;
  invoiceCode: string;
  locationCode: string;
}

export default function OutboundPicking() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo<IQuery>(
    // @ts-ignore
    () => Object.fromEntries(new URLSearchParams(location.search).entries()) as IQuery,
    [location]
  );

  const [invoiceCode, setInvoiceCode] = useState('');
  const [locationCodes, setLocationCodes] = useState<string[]>([]);

  const { locationCodeOptions } = useLocationCodeOptions();
  const { options: qualityStatusOptions } = useEnumOptions('EnumQualityStatus', 'itemId', false);

  const [isOutBoundPickingDisabled, setIsOutBoundPickingDisabled] = useState(true);
  const [isOutBoundPickingLoading, setIsOutBoundPickingLoading] = useState(false);

  const tableRef = useRef<ITable<API.PickingContanierInventoryDTO>>(null);

  setDefaultDataFilter((res: any) => {
    // return 的对象需要包含以下两条数据
    return {
      // 表格列表的数据
      content: res.resultData,
      // 数据总共 n 条
      totalCount: res.resultData.length,
      ...res,
    };
  });

  const api = () => {
    //  locationCode为必填参数，还未填写时直接返空
    if (locationCodes?.length) {
      const params: API.getPadOutboundGetContainerInventoryParams = {
        locationCode: last(locationCodes),
        invoiceCode,
      };
      return getPadOutboundGetContainerInventory(params);
    }
    return Promise.resolve({ resultData: [] });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInvoiceCode(e.target.value);
    tableRef?.current?.refresh();
  };

  const handleCasderChange = (value: string[]) => {
    setLocationCodes(value);
    tableRef?.current?.refresh();
  };

  //  通过ref获取到的selections里的数据不是实时的。
  const getSelections = () => {
    const selections = tableRef.current?.getSelection()?.map((item) => item.outboundRequirementId!);
    if (!selections) return [];
    const idToRecord = tableRef?.current
      ?.getTableData?.()
      .reduce<Record<number, API.PickingContanierInventoryDTO>>((acc, cur) => {
        acc[cur.outboundRequirementId!] = cur;
        return acc;
      }, {});
    if (!idToRecord) return [];
    return selections?.map((sel) => idToRecord[sel]);
  };

  // 出库
  const handleOutboundPicking = async () => {
    const selections = getSelections();
    if (isEmpty(selections)) return;
    setIsOutBoundPickingLoading(true);
    await postPadOutboundOutboundPicking(selections).finally(() =>
      setIsOutBoundPickingLoading(false)
    );
    message.success(t('出库成功'));
    tableRef?.current?.clearSelection();
    tableRef.current?.refresh();
  };

  // 回库
  const handleInStockApply = async () => {
    if (isEmpty(locationCodes)) return;
    const fromLocationCode: string = last(locationCodes) as string;
    await getPadOutboundInStockApply({ fromLocationCode });
    message.success(t('回库成功'));
    tableRef?.current?.clearSelection();
  };

  const handleTableChange = (value: string | number, index: number, field: string) => {
    const currentData = tableRef?.current?.getTableData();
    const newTableData = currentData?.map((item: API.PickingContanierInventoryDTO, idx: number) => {
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

  const handleSelectionChange = (
    selections: API.PickingContanierInventoryDTO[],
    values: string[]
  ) => {
    setIsOutBoundPickingDisabled(isEmpty(values));
  };

  const fields: Array<MwSearchTableField> = [
    {
      title: t('容器编号'),
      key: 'containerCode',
      width: 120,
      fixed: 'left',
    },
    {
      title: t('物料编号'),
      key: 'materialCode',
      width: 180,
      render: (text: string, record: API.PickingContanierInventoryDTO) =>
        `${text}(${record.materialName})`,
    },
    {
      title: t('规格'),
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
      title: t('批次号'),
      key: 'batchNumber',
      width: 120,
    },
    {
      title: t('分配数量'),
      key: 'allotQuantity',
      width: 120,
    },
    {
      title: t('已出数量'),
      key: 'outboundQuantity',
      width: 120,
    },
    {
      title: t('当前库存'),
      key: 'inventoryQuantity',
      width: 120,
    },

    {
      title: t('出库需求编号'),
      key: 'outboundRequirementCode',
      width: 150,
    },
    {
      title: t('发货单号'),
      key: 'invoiceCode',
      width: 180,
      render: (text: string, record) =>
        text && record?.invoiceLineNumber ? `${text}-${record.invoiceLineNumber}` : '',
    },
    {
      title: t('拣选数量'),
      key: 'pickingQuantity',
      width: 180,
      fixed: 'right',
      render: (text: number, record, index) => (
        <InputNumber
          min={0}
          value={text}
          placeholder={t('请输入组盘数量')}
          onChange={(val) => handleTableChange(val as number, index, 'pickingQuantity')}
        />
      ),
    },
  ];

  useEffect(() => {
    if (queryParams.areaId && queryParams.locationCode) {
      setLocationCodes([queryParams.areaId, queryParams.locationCode]);
      setInvoiceCode(queryParams?.invoiceCode ?? '');
      tableRef.current?.refresh();
    }
  }, [queryParams]);

  useScannerCodeEffect(SCANNER_PICKING_RECEIPTCODE, (code) => {
    handleInputChange({ target: { value: code } });
  });

  useScannerCodeEffect(SCANNER_PICKING_LOCATIONCODE, (code) => {
    const values = findParentIds(locationCodeOptions, code);
    if (values) {
      handleCasderChange(values);
    } else {
      handleCasderChange([code]);
    }
  });

  return (
    <div>
      <Breadcrumb className="p-2">
        <Breadcrumb.Item onClick={() => navigate('/shipmentBusiness')}>{t('发货')}</Breadcrumb.Item>
        <Breadcrumb.Item>{t('拣选出库')}</Breadcrumb.Item>
      </Breadcrumb>
      <MwSearchTable
        api={api}
        extraVisible={false}
        fields={fields}
        scrollX={1300}
        rowKey={'outboundRequirementId'}
        ref={tableRef}
        selectionType="checkbox"
        selectShowKey="outboundRequirementId"
        onSelectionChange={handleSelectionChange}
        rowSelection={{
          getCheckboxProps: (record: any) => ({
            disabled: !record.isAllot,
          }),
        }}
        title={
          <>
            <ScannerCascader
              options={locationCodeOptions}
              value={locationCodes}
              placeholder={t('请选择出库位置')}
              onChange={handleCasderChange}
              scannerKey={SCANNER_PICKING_LOCATIONCODE}
            />
            <ScannerInput
              value={invoiceCode}
              placeholder={t('请输入收货单号或扫码')}
              onChange={handleInputChange}
              scannerKey={SCANNER_PICKING_RECEIPTCODE}
            />
          </>
        }
      >
        <MwButton onClick={handleInStockApply}>{t('回库')}</MwButton>
        <MwButton
          type="primary"
          loading={isOutBoundPickingLoading}
          disabled={isOutBoundPickingDisabled}
          onClick={handleOutboundPicking}
        >
          {t('出库')}
        </MwButton>
      </MwSearchTable>
    </div>
  );
}
