import {
  Breadcrumb,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from 'antd';
import {
  getApiContainerGetContainerSelectItem,
  getApiSysConfigGetSysReceivingTypeSetting,
  postPadInboundCombine,
} from 'apis';
import dayjs from 'dayjs';
import { shallowEqual, useAppDispatch, useAppSelector } from 'hooks';
import { pick } from 'lodash';
import {
  MwButton,
  MwSearchTable,
  MwSearchTableField,
  useOptions,
} from 'multiway';
import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { setInboundSelections } from 'store';
import { findParentIds, getFieldBasedInterface } from 'utils';
import { SCANNER_STORAGE_CONTAINER, SCANNER_STORAGE_LOCATIONCODE } from '@/common/constants';
import useEnumOptions from '@/common/hooks/useEnumOptions';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
import ScannerCascader from '@/components/ScannerCascader';
import ScannerSelect from '@/components/ScannerSelect';
import { ITable } from '@/typing';

import type { DefaultOptionType } from 'antd/es/cascader';
import type { API } from 'apis';
type EP = Omit<API.ReceiptCombineInfoDTO, 'combineItemList' | 'locationCode'>;
interface FormFields extends EP {
  locationCode: string[];
  receivingDate: dayjs.Dayjs;
}

const dateFormat = 'YYYY/MM/DD';

const getField = getFieldBasedInterface<FormFields>();

export default function StorageCombine() {
  const { t } = useTranslation();
  const CARRY_STATUS_OPTIONS = [
    { label: t('满'), value: 1 },
    { label: t('半满'), value: 2 },
  ];
  const navigate = useNavigate();
  const tableRef = useRef<ITable<API.OutputReceiptLineInfoDTO>>(null);
  const dispatch = useAppDispatch();

  const [form] = Form.useForm<FormFields>();
  const [containerData, setContainerData] = useState<{
    containerTypeId: string;
    containerId: string;
  }>();
  const [loading, setLoading] = useState(false);

  const { inboundSelections } = useAppSelector(
    (state) => ({
      inboundSelections: state.inbound.inboundSelections,
    }),
    shallowEqual
  );

  const { options: qualityStatusOptions } = useEnumOptions('EnumQualityStatus', 'itemId', false);
  const { options: receiptStatusOptions } = useEnumOptions('EnumReceiptStatus', 'itemId', false);
  const { options: containerCodeOptions } = useOptions(getApiContainerGetContainerSelectItem, {
    path: ['resultData'],
    keepOrigin: true,
    transform: {
      label: 'itemName',
      value: 'itemValue',
    },
  });

  const { locationCodeOptions } = useLocationCodeOptions();

  const handleTableChange = (
    value: number | string,
    index: number,
    field: keyof API.OutputReceiptLineInfoDTO
  ) => {
    const datasource = tableRef.current?.getTableData?.() ?? [];
    const newDatasource = datasource.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    tableRef?.current?.setTableData(newDatasource);
  };

  const handleBack = () => {
    dispatch(setInboundSelections([]));
    navigate('/receivingBusiness');
  };

  const fields: Array<MwSearchTableField> = [
    {
      title: t('收货单号'),
      key: 'receiptCode',
      width: 200,
      render: (text: string, record: API.OutputReceiptLineInfoDTO) =>
        `${text} - ${record.receiptLineNumber}`,
    },
    {
      title: t('收货状态'),
      key: 'receiptStatus',
      width: 120,
      options: receiptStatusOptions,
    },
    {
      title: t('物料编号'),
      key: 'materialCode',
      width: 160,
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
      width: 90,
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
    {
      title: t('组盘数量'),
      key: 'quantity',
      width: 150,
      fixed: 'right',
      render: (text: number, record: API.OutputReceiptLineInfoDTO, index) => (
        <InputNumber
          controls
          value={text}
          placeholder={t('请输入组盘数量')}
          min={1}
          onChange={(val) => handleTableChange(val as number, index, 'quantity')}
        ></InputNumber>
      ),
    },
    {
      title: t('materialId'),
      key: 'materialUID',
      width: 150,
      fixed: 'right',
      render: (text: number, record: API.OutputReceiptLineInfoDTO, index) => (
        <Input
          value={text}
          disabled={!record.hasMaterialSign}
          placeholder={t('materialIdPlaceholder')}
          onChange={(ev) => handleTableChange(ev.target.value, index, 'materialUID')}
        ></Input>
      ),
    },
  ];

  const onSummit = async () => {
    try {
      const data = tableRef.current?.getTableData();
      const values = await form.validateFields();
      setLoading(true);
      const res = await getApiSysConfigGetSysReceivingTypeSetting();
      const body: API.ReceiptCombineInfoDTO = {
        combineOption: res?.resultData?.receivingBusinessType,
        ...containerData,
        ...pick(values, ['carryStatus', 'containerCode']),
        locationCode: values.locationCode[1],
        combineItemList: data?.map((d) => ({
          ...d,
          materialItemDescription: '',
          receivingDate: values.receivingDate?.format(dateFormat),
          receiptLineId: d.id,
          materialUID: d.hasMaterialSign ? d.materialUID : ''
        })),
      };
      await postPadInboundCombine(body);
      message.success(t('创建组盘任务成功！'));
      form.resetFields();
      handleBack();
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  const handleContainerChange = (value: string, record: API.SelectItem) => {
    setContainerData({
      containerId: record?.itemId ?? '',
      containerTypeId: record?.dataItem?.containerTypeId ?? '',
    });
  };

  const setCode = (code: any) => {
    const values = findParentIds(locationCodeOptions, code);
    if (values) {
      form.setFieldValue('locationCode', values);
    } else {
      form.setFieldValue('locationCode', [code]);
    }
  };

  useScannerCodeEffect(SCANNER_STORAGE_LOCATIONCODE, setCode);

  useScannerCodeEffect(SCANNER_STORAGE_CONTAINER, (code) => {
    form.setFieldValue(getField('containerCode'), code);
  });

  return (
    <div className="p-3">
      <div className="text-base mb-2">
        <Breadcrumb>
          <Breadcrumb.Item onClick={handleBack}>{t('收货')}</Breadcrumb.Item>
          <Breadcrumb.Item>{t('收货组盘')}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <>
        <Form
          className="w-full"
          form={form}
          name="basic"
          autoComplete="off"
          initialValues={{ receivingDate: dayjs() }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name={getField('locationCode')}
                label={t('组盘位置')}
                rules={[{ required: true }]}
              >
                <ScannerCascader
                  options={locationCodeOptions}
                  // showSearch={{ filter }}
                  placeholder={t('请选择组盘位置')}
                  scannerKey={SCANNER_STORAGE_LOCATIONCODE}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={getField('containerCode')}
                label={t('容器编号')}
                rules={[{ required: true }]}
                className="w-full"
              >
                <ScannerSelect
                  onChange={handleContainerChange}
                  placeholder={t('请选择容器编号')}
                  options={containerCodeOptions}
                  showSearch
                  // filterOption={(input, option) =>
                  //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  // }
                  scannerKey={SCANNER_STORAGE_CONTAINER}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name={getField('carryStatus')}
                label={t('载货状态')}
                rules={[{ required: true }]}
              >
                <Select options={CARRY_STATUS_OPTIONS} placeholder={t('请选择载货状态')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t('收货日期')} name={getField('receivingDate')} className="w-full">
                <DatePicker className="w-full" picker="date" format={dateFormat} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
      <MwSearchTable
        ref={tableRef}
        data={inboundSelections}
        fields={fields}
        rowKey="id"
        scrollX={800}
        editMode="col"
        extraVisible={false}
      >
        <MwButton type="primary" onClick={onSummit} loading={loading}>
          {t('提交')}
        </MwButton>
      </MwSearchTable>
    </div>
  );
}
