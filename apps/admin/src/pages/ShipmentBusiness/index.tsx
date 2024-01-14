import { useTranslation } from 'react-i18next';
import { Input, Radio, RadioChangeEvent, Space } from 'antd';
import {
  getPadCarryTaskMove,
  postPadOutboundGetFinishPageData,
  postPadOutboundGetUnfinishPageData,
} from 'apis';
import {
  MwAction,
  MwButton,
  MwDialogFormField,
  MwSearchTable,
  MwSearchTableField,
  setDefaultDataFilter,
  MwTableCtrlField,
  MwCtrl,
} from 'multiway';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { getFieldBasedInterface } from 'utils';
import useStatusOptions from '@/common/hooks/useStatusOptions';
import { ScanOutlined } from '@ant-design/icons';
import useEnumOptions from '@/common/hooks/useEnumOptions';

import type { API } from 'apis';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks';
import { setInvoiceRecord } from 'store';
import ScannerInput from '@/components/ScannerInput';
import { SCANNER_SHIPMENT_CODE } from '@/common/constants';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
const { Search } = Input;

const getField = getFieldBasedInterface<API.OutputInvoiceLineDTO>();

function ShipmentBusiness() {
  const { t } = useTranslation();
  setDefaultDataFilter((res: API.PadInvoiceLineDTOPageResultR) => {
    return {
      content: res?.resultData?.pageData ?? 0,
      totalCount: res?.resultData?.totalCount ?? 0,
      ...res,
    };
  });
  const [isFinish, setIsFinish] = useState(false);
  const [taskCode, setTaskCode] = useState('');
  const tableRef = useRef<any>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { options: invoiceStatusOptions, statusEnum } = useStatusOptions(
    'EnumInvoiceStatus',
    'itemId',
    false
  );

  const { options: qualityStatusOptions } = useEnumOptions('EnumQualityStatus', 'itemId', false);

  const api = (res: any) => {
    const {
      pagination: { current, pageSize },
    } = res;
    const data: API.QueryInvoiceLineInfoPageingParameter = {
      pageIndex: current,
      pageSize,
      query: {
        invoiceCode: taskCode,
      },
    };
    const service = isFinish
      ? postPadOutboundGetFinishPageData
      : postPadOutboundGetUnfinishPageData;
    return service(data);
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setIsFinish(e.target.value);
    tableRef?.current.refresh();
  };

  useScannerCodeEffect(SCANNER_SHIPMENT_CODE, (code) =>
    handleInputChange({ target: { value: code } })
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskCode(e.target.value);
    tableRef?.current.refresh();
  };

  const handleAllocationDetails = (record: API.OutputInvoiceLineDTO) => {
    dispatch(setInvoiceRecord(record));
    navigate(`/allocationDetails/${record.id}`);
  };

  const fields: Array<MwSearchTableField> = [
    {
      title: t('发货单号'),
      key: getField('invoiceCode'),
      width: 180,
      fixed: 'left',
      render: (text: string, record: API.OutputInvoiceLineDTO) =>
        `${text} - ${record.invoiceLineNumber}`,
    },
    {
      title: t('单行状态'),
      key: getField('invoiceLineStatus'),
      width: 120,
      options: invoiceStatusOptions,
      valueEnum: statusEnum,
      renderType: 'status',
    },
    {
      title: t('出库区域'),
      key: 'outboundAreaCode',
      width: 150,
      render: (text: string, record: API.OutputInvoiceLineDTO) =>
        `${text}(${record.outboundAreaName})`,
    },
    {
      title: t('物料编号'),
      key: 'materialCode',
      width: 160,
      render: (text: string, record: API.OutputInvoiceLineDTO) => `${text}(${record.materialName})`,
    },
    {
      title: t('物料规格'),
      key: 'materialSize',
      width: 150,
    },
    {
      title: t('物料类型'),
      key: 'materialTypeName',
      width: 150,
    },
    {
      title: t('质量状态'),
      key: 'qualityStatus',
      width: 100,
      options: qualityStatusOptions,
    },
    {
      title: t('批次号'),
      key: 'batchNumber',
      width: 150,
    },
    {
      title: t('应发数量'),
      key: 'quantity',
      width: 100,
    },
    {
      title: t('已发数量'),
      key: 'outboundQuantity',
      width: 100,
    },
  ];

  const otherFields: Array<MwDialogFormField> = [
    {
      title: t('起始位置'),
      key: 'fromLocation',
      dialog: {
        required: true,
        span: 24,
      },
      width: 200,
    },
    {
      title: t('目标位置'),
      key: 'toLocation',
      dialog: {
        required: true,
        span: 24,
      },
      width: 200,
    },
    {
      title: t('搬运方式'),
      key: 'isAutoCarry',
      type: 'radio-group',
      options: [
        { value: true, label: t('自动搬运') },
        { value: false, label: t('手动搬运') },
      ],

      dialog: {
        required: true,
        defaultValue: true,
        span: 24,
      },
    },
  ];

  const ctrl: MwTableCtrlField = {
    width: 120,
    fixed: 'right',
    title: t('operation'),
    render: (_, record: API.OutputInvoiceLineDTO) => (
      <>
        {[2, 5].includes(record.invoiceLineStatus!) && (
          <MwButton
            size="small"
            type="primary"
            onClick={() => {
              handleAllocationDetails(record);
            }}
          >
            {t('分配明细')}
          </MwButton>
        )}
      </>
    ),
  };

  return (
    <MwSearchTable
      ref={tableRef}
      api={api}
      fields={fields}
      rowKey="id"
      extraVisible={false}
      scrollX={1000}
      title={
        <>
          <Radio.Group value={isFinish} buttonStyle="solid" onChange={handleRadioChange}>
            <Radio.Button value={false}>{t('未完成')}</Radio.Button>
            <Radio.Button value={true}>{t('已完成')}</Radio.Button>
          </Radio.Group>
          <ScannerInput
            value={taskCode}
            placeholder={t('输入发货单号，可以扫码')}
            onChange={handleInputChange}
            scannerKey={SCANNER_SHIPMENT_CODE}
          />
        </>
      }
      ctrl={isFinish ? undefined : ctrl}
      dialogFormExtend={{
        fields: [...fields, ...otherFields],
        addApi: getPadCarryTaskMove,
        width: '50%',
        span: 12,
        dialogOnly: true,
      }}
    >
      {
        !isFinish && (
          <MwButton type="primary" onClick={() => navigate('/outboundPicking')}>
            {t('拣选出库')}
          </MwButton>
        )
      }
    </MwSearchTable>
  );
}

export default ShipmentBusiness;
