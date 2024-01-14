import { DatePicker, Form, InputNumber, message, Radio, Select } from 'antd';
import { GetLocationDetailById, postApiMaterialGetPageData, postApiReceiptHeaderGetPageData, postPadInboundBinding } from 'apis';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks';
import { last, pick } from 'lodash';
import { MwDialog } from 'multiway';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { reset } from 'store';
import { findParentIds, getFieldBasedInterface } from 'utils';
import {
    SCANNER_DASHBOARD_BIND_CONTAINER, SCANNER_DASHBOARD_BIND_LOCATION, SCANNER_DASHBOARD_BIND_MATERIAL, SCANNER_DASHBOARD_BIND_RECEIPT
} from '@/common/constants';
import useEnumOptions, { OptionItem } from '@/common/hooks/useEnumOptions';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
import ScannerCascader from '@/components/ScannerCascader';
import ScannerSelect from '@/components/ScannerSelect';

const dateFormat = 'YYYY/MM/DD';

import type { API } from 'apis';
import useContainerCodeOptions from '@/common/hooks/useContainerCodeOptions';
interface IProps {
  locationId: string;
  refresh: () => void;
}

interface IContainer {
  containerId: string;
  containerTypeId: string;
}

interface FormFields extends Omit<API.PadCombineInfoDTO, 'locationCode' | 'receivingDate'> {
  locationCode: string[];
  receivingDate: dayjs.Dayjs;
}

const getField = getFieldBasedInterface<FormFields>();

function BindingDialog({ locationId, refresh }: IProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm<FormFields>();
  const { locationCodeOptions:locationOptions, load  } = useLocationCodeOptions('itemValue', false);
  const { containerCodeOptions, load: loadContainer } = useContainerCodeOptions(false)
  const [materialOptions, setMaterialOptions] = useState<OptionItem[]>([]);
  const [receiptOptions, setReceiptOptions] = useState<OptionItem[]>([]);
  const [carryStatus, setCarryStatus] = useState(1);
  const [container, setContainer] = useState<IContainer>({ containerId: '', containerTypeId: '' });
  const { options: qualityStatusOptions, run } = useEnumOptions(
    'EnumQualityStatus',
    'itemId',
    true
  );

  const isEmptyStatus = useMemo(() => carryStatus === 0, [carryStatus]);

  const containerOptions = useMemo(() => {
    const fn = isEmptyStatus
      ? (opt) => opt?.dataItem?.carryStatus === 0
      : (opt) => opt?.dataItem?.carryStatus !== 1;
    return containerCodeOptions.filter(fn);
  }, [containerCodeOptions, isEmptyStatus]);

  const setCode = (code: any) => {
    const values = findParentIds(locationOptions, code);
    if (values) {
      form.setFieldValue('locationCode', values);
    } else {
      form.setFieldValue('locationCode', [code]);
    }
  };

  const onOpen = async () => {
    setVisible(true);
    // @ts-ignore
    await load();
    loadContainer();
    run();
    postApiMaterialGetPageData({ pageIndex: 1, pageSize: 100 }).then(
      (res: API.OutputMaterialInfoDTOPageResultR) => {
        const options: OptionItem[] = (res.resultData?.pageData ?? [])?.map((material) => ({
          ...material,
          value: material.materialCode!,
          label: `${material.materialCode!}(${material.materialName!})`,
        }));
        setMaterialOptions(options);
      }
    );
    postApiReceiptHeaderGetPageData({
      pageIndex: 1,
      pageSize: 100,
      query: { receiptStatusList: [2, 3] },
    }).then((res: API.OutputReceiptHeaderInfoDTOPageResultR) => {
      const options: OptionItem[] = (res.resultData?.pageData ?? [])?.map((receipt) => ({
        ...receipt,
        value: receipt.receiptCode!,
        label: receipt.receiptCode!,
      }));
      setReceiptOptions(options);
    });
    const res = await GetLocationDetailById({ id: locationId });
    form.resetFields();
    form.setFieldValue('locationCode', [res.resultData.areaId, res.resultData.locationCode]);
  };

  const onConfirm = async () => {
    const values = await form.validateFields(
      isEmptyStatus
        ? [getField('locationCode'), getField('carryStatus'), getField('containerCode')]
        : undefined
    );
    const body: API.PadCombineInfoDTO = {
      ...pick(values, [
        getField('containerCode'),
        getField('materialCode'),
        getField('receiptCode'),
        getField('quantity'),
        getField('carryStatus'),
        getField('qualityStatus'),
      ]),
      locationCode: last(values.locationCode),
      receivingDate: values.receivingDate?.format(dateFormat),
      ...container,
    };
    await postPadInboundBinding(body);
    message.success('绑盘成功');
    form.resetFields();
    dispatch(reset());
    setVisible(false);
    refresh();
  };

  useScannerCodeEffect(SCANNER_DASHBOARD_BIND_CONTAINER, (code) => {
    form.setFieldValue('containerCode', code);
  });

  useScannerCodeEffect(SCANNER_DASHBOARD_BIND_LOCATION, setCode);

  return (
    <>
      <div onClick={onOpen}>{t('binding')}</div>

      <MwDialog
        centered
        title={t('绑盘')}
        visible={visible}
        onClose={() => setVisible(false)}
        bodyStyle={{ maxHeight: 300, overflow: 'auto' }}
        onConfirm={onConfirm}
        cancelVisible={false}
        confirmText={t('提交')}
      >
        <Form
          form={form}
          layout="vertical"
          name="basic"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          initialValues={{
            carryStatus: 1,
            receivingDate: dayjs(),
            qualityStatus: 2,
          }}
        >
          <Form.Item label={t('载货状态')} name={getField('carryStatus')}>
            <Radio.Group
              onChange={(e) => {
                setCarryStatus(e.target.value);
              }}
            >
              <Radio.Button value={1}>{t('满托')}</Radio.Button>
              <Radio.Button value={2}>{t('半满')}</Radio.Button>
              <Radio.Button value={0}>{t('空托')}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={t('组盘位置')}
            name="locationCode"
            rules={[{ required: true, message: t('必填') }]}
          >
            <ScannerCascader
              options={locationOptions}
              placeholder={t('默认选中库位编号，可以改，也可以扫码')}
              scannerKey={SCANNER_DASHBOARD_BIND_LOCATION}
            />
          </Form.Item>

          <Form.Item label={t('容器编号')} name="containerCode">
            <ScannerSelect
              onChange={(value, option) => {
                setContainer({
                  containerTypeId: option?.dataItem?.containerTypeId,
                  containerId: option?.itemId,
                });
              }}
              options={containerOptions}
              placeholder={t('请输入容器编号或扫码')}
              scannerKey={SCANNER_DASHBOARD_BIND_CONTAINER}
            />
          </Form.Item>

          <Form.Item
            label={t('收货单号')}
            name={getField('receiptCode')}
            rules={[{ required: true, message: t('必填') }]}
            hidden={isEmptyStatus}
          >
            <ScannerSelect
              options={receiptOptions}
              placeholder={t('请选择收货单号')}
              scannerKey={SCANNER_DASHBOARD_BIND_RECEIPT}
            />
          </Form.Item>

          <Form.Item
            label={t('质量状态')}
            name={getField('qualityStatus')}
            rules={[{ required: true, message: t('必填') }]}
            hidden={isEmptyStatus}
          >
            <Select options={qualityStatusOptions} placeholder="请选择质量状态" />
          </Form.Item>

          <Form.Item
            label={t('物料编号')}
            name={getField('materialCode')}
            rules={[{ required: true, message: t('必填') }]}
            hidden={isEmptyStatus}
          >
            <ScannerSelect
              options={materialOptions}
              placeholder={t('请选择物料编号或扫码')}
              scannerKey={SCANNER_DASHBOARD_BIND_MATERIAL}
            />
          </Form.Item>

          <Form.Item
            label={t('收货日期')}
            name={getField('receivingDate')}
            className="w-full"
            hidden={isEmptyStatus}
          >
            <DatePicker
              className="w-full"
              picker="date"
              format={dateFormat}
              placeholder={t('请选择收货日期')}
            />
          </Form.Item>
          <Form.Item
            label={t('收货数量')}
            name={getField('quantity')}
            rules={[{ required: true, message: t('必填') }]}
            className="w-full"
            hidden={isEmptyStatus}
          >
            <InputNumber placeholder={t('请输入收货数量')} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </MwDialog>
    </>
  );
}

export default memo(BindingDialog);
