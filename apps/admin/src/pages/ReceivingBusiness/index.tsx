import { useTranslation } from 'react-i18next';
import { Input, Radio, RadioChangeEvent } from 'antd';
import { postPadInboundGetFinishPageData, postPadInboundGetUnfinishPageData } from 'apis';
import { useAppDispatch } from 'hooks';
import { isEmpty } from 'lodash';
import {
  MwButton,
  MwSearchTable,
  MwSearchTableField,
  MwTableCtrlField,
  setDefaultDataFilter,
} from 'multiway';
import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setInboundSelections } from 'store';
import { getFieldBasedInterface } from 'utils';
import useEnumOptions from '@/common/hooks/useEnumOptions';
import useStatusOptions from '@/common/hooks/useStatusOptions';
import { ITable } from '@/typing';

import type { API } from 'apis';
import ScannerInput from '@/components/ScannerInput';
import { SCANNER_RECEIVING_CODE } from '@/common/constants';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
const { Search } = Input;

const getField = getFieldBasedInterface<API.OutputReceiptLineInfoDTO>();

function ReceivingBusiness() {
  const { t } = useTranslation();
  setDefaultDataFilter((res: API.PadReceiptLineInfoDTOPageResultR) => {
    return {
      content: res?.resultData?.pageData ?? 0,
      totalCount: res?.resultData?.totalCount ?? 0,
      ...res,
    };
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [taskCode, setTaskCode] = useState('');

  const tableRef = useRef<ITable<API.OutputReceiptLineInfoDTO>>(null);

  const { options: qualityStatusOptions } = useEnumOptions('EnumQualityStatus', 'itemId', false);

  const { options: receiptStatusOptions, statusEnum } = useStatusOptions(
    'EnumReceiptStatus',
    'itemId',
    false
  );

  const api = (res: any) => {
    const {
      pagination: { current, pageSize },
    } = res;
    const data: API.QueryReceiptLineInfoPageingParameter = {
      pageIndex: current,
      pageSize,
      query: {
        receiptCode: taskCode,
      },
    };
    const service = isFinish ? postPadInboundGetFinishPageData : postPadInboundGetUnfinishPageData;
    return service(data);
  };

  const handleSelectionChange = (selections: API.OutputReceiptLineInfoDTO[], values: string[]) => {
    setIsDisabled(isEmpty(values));
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setIsFinish(e.target.value);
    tableRef?.current?.refresh();
  };

  useScannerCodeEffect(SCANNER_RECEIVING_CODE, (code) =>
    handleInputChange({ target: { value: code } })
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskCode(e.target.value);
    tableRef?.current?.refresh();
  };

  const handleNavigate = (selections: API.OutputReceiptLineInfoDTO[]) => {
    dispatch(setInboundSelections(selections.map((item) => ({ ...item, quantity: 0 }))));
    navigate('/storageCombine');
  };

  const fields: Array<MwSearchTableField> = [
    {
      title: t('收货单号'),
      key: 'receiptCode',
      width: 180,
      fixed: 'left',
      render: (text: string, record: API.OutputReceiptLineInfoDTO) =>
        `${text} - ${record.receiptLineNumber}`,
    },
    {
      title: t('收货状态'),
      key: 'receiptStatus',
      width: 120,
      options: receiptStatusOptions,
      valueEnum: statusEnum,
      renderType: 'status',
    },
    {
      title: t('物料编号'),
      key: 'materialCode',
      width: 180,
      render: (text: string, record: API.OutputReceiptLineInfoDTO) =>
        `${text}(${record.materialName})`,
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
      title: t('单位'),
      key: 'packagingName',
      width: 100,
    },
    {
      title: t('质量状态'),
      key: 'qualityStatus',
      width: 100,
      options: qualityStatusOptions,
    },
    {
      title: t('应收数量'),
      key: 'receivableQuantity',
      width: 100,
    },
    {
      title: t('已收数量'),
      key: 'receivedQuantity',
      width: 100,
    },
  ];

  const ctrl: MwTableCtrlField = {
    width: 150,
    fixed: 'right',
    title: t('operation'),
    render: (_, record: API.OutputReceiptLineInfoDTO) => (
      // <MwCtrl>
      <MwButton
        size="small"
        type="primary"
        onClick={() => {
          handleNavigate([record]);
        }}
      >
        {t('收货组盘')}
      </MwButton>
      // </MwCtrl>
    ),
  };

  return (
    <MwSearchTable
      ref={tableRef}
      api={api}
      fields={fields}
      rowKey="id"
      scrollX={1000}
      ctrl={isFinish ? undefined : ctrl}
      selectionType={isFinish ? undefined : 'checkbox'}
      selectShowKey={getField('id')}
      onSelectionChange={handleSelectionChange}
      extraVisible={false}
      title={
        <>
          <Radio.Group value={isFinish} buttonStyle="solid" onChange={handleRadioChange}>
            <Radio.Button value={false}>{t('未完成')}</Radio.Button>
            <Radio.Button value={true}>{t('已完成')}</Radio.Button>
          </Radio.Group>
          <ScannerInput
            value={taskCode}
            placeholder={t('请输入收货单号或扫码')}
            onChange={handleInputChange}
            scannerKey={SCANNER_RECEIVING_CODE}
          />
        </>
      }
    >
      {!isFinish && (
        <MwButton
          disabled={isDisabled}
          type="primary"
          onClick={() => handleNavigate(tableRef?.current?.getSelection?.() ?? [])}
        >
          {t('收货组盘')}
        </MwButton>
      )}
    </MwSearchTable>
  );
}

export default ReceivingBusiness;
