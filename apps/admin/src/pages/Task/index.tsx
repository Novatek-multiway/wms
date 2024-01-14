import { useTranslation } from 'react-i18next';
import { message, Radio, RadioChangeEvent, Form } from 'antd';
import {
  getPadCarryTaskCancel,
  getPadCarryTaskMove,
  postPadCarryTaskGetFinishPageData,
  postPadCarryTaskGetUnfinishPageData,
  postPadCarryTaskManualFinish,
} from 'apis';
import { last, pick } from 'lodash';
import {
  MwButton,
  MwSearchTable,
  MwSearchTableField,
  MwTableCtrlField,
  setDefaultDataFilter,
  MwDialog,
} from 'multiway';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SCANNER_TASK_FROM, SCANNER_TASK_TASKCODE, SCANNER_TASK_TO } from '@/common/constants';
import useLocationCodeOptions from '@/common/hooks/useLocationCodeOptions';
import useStatusOptions from '@/common/hooks/useStatusOptions';
import ScannerInput from '@/components/ScannerInput';
import { ITable } from '@/typing';

import type { API } from 'apis';
import useScannerCodeEffect from '@/common/hooks/useScannerCodeEffect';
import ScannerCascader from '@/components/ScannerCascader';
import { getFieldBasedInterface } from 'utils';
interface FormFields extends Omit<API.getPadCarryTaskMoveParams, 'fromLocation' | 'toLocation'> {
  fromLocation: string[];
  toLocation: string[];
}

const getField = getFieldBasedInterface<FormFields>();

function Task() {
  const { t } = useTranslation();
  setDefaultDataFilter((res: API.OutputTaskInfoDTOPageResultR) => {
    return {
      content: res?.resultData?.pageData ?? 0,
      totalCount: res?.resultData?.totalCount ?? 0,
      ...res,
    };
  });
  const [isFinish, setIsFinish] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isManuly, setIsManuly] = useState(false);
  const [record, setRecord] = useState<API.OutputTaskInfoDTO>();
  const [taskCode, setTaskCode] = useState('');
  const tableRef = useRef<ITable<API.OutputTaskInfoDTO>>(null);
  const [form] = Form.useForm<FormFields>();

  useScannerCodeEffect(SCANNER_TASK_TASKCODE, (code) => {
    setTaskCode(code);
    tableRef.current?.refresh();
  });

  const api = (res: any) => {
    const {
      pagination: { current, pageSize },
    } = res;
    const data: API.QueryTaskInfoPageingParameter = {
      pageIndex: current,
      pageSize,
      query: {
        taskCode,
      },
    };
    const service = isFinish
      ? postPadCarryTaskGetFinishPageData
      : postPadCarryTaskGetUnfinishPageData;
    return service(data);
  };

  const { options: taskStatusOptions, statusEnum } = useStatusOptions(
    'EnumTaskStatus',
    'itemId',
    false
  );
  const { locationCodeOptions, load } = useLocationCodeOptions();

  const handleRadioChange = (e: RadioChangeEvent) => {
    setIsFinish(e.target.value);
    tableRef?.current?.refresh();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskCode(e.target.value);
    tableRef?.current?.refresh();
  };

  const handleTaskCancel = async (record: API.OutputTaskInfoDTO) => {
    await getPadCarryTaskCancel({ taskId: record.id });
    message.success(t('取消任务成功'));
    tableRef.current?.refresh();
  };

  const handleManualFinish = async (record: API.OutputTaskInfoDTO) => {
    load();
    setIsManuly(true);
    const { fromAreaId, fromPositionCode, toAreaId, toPositionCode, taskExecuteType, id } = record;
    setRecord(record);
    form.resetFields();
    form.setFieldValue(getField('fromLocation'), [fromAreaId, fromPositionCode]);
    form.setFieldValue(getField('toLocation'), [toAreaId, toPositionCode]);
    form.setFieldValue(getField('isAutoCarry'), taskExecuteType === 1);
    setVisible(true);
  };

  const ctrl: MwTableCtrlField = {
    //  width: 180,
    fixed: 'right',
    title: t('operation'),
    render: (_, record: API.OutputTaskInfoDTO) => (
      <>
        <MwButton
          type="primary"
          size="small"
          onClick={() => {
            handleManualFinish(record);
          }}
        >
          {t('手动完成')}
        </MwButton>
        <MwButton
          type="primary"
          size="small"
          className="ml-1"
          onClick={() => {
            handleTaskCancel(record);
          }}
        >
          {t('取消')}
        </MwButton>
      </>
    ),
  };

  const fields: Array<MwSearchTableField> = [
    {
      title: t('任务编号'),
      key: 'taskCode',
      //  width: 150,
    },
    {
      title: t('托盘'),
      key: 'containerCode',
      //  width: 200,
    },
    {
      title: t('任务状态'),
      key: 'taskStatus',
      options: taskStatusOptions,
      //  width: 100,
      valueEnum: statusEnum,
      renderType: 'status',
    },
    {
      title: t('起始位置'),
      key: 'fromCustomCode',
      //  width: 200,
    },
    {
      title: t('目标位置'),
      key: 'toCustomCode',
      //  width: 200,
    },
    {
      title: t('创建时间'),
      key: 'createTime',
      //  width: 200,
    },
  ];

  const onConfirm = async () => {
    const values = await form.validateFields();
    if (isManuly) {
      const body: API.ManualFinishTaskDTO = {
        id: record?.id,
        targetLocation: last(values.toLocation),
      };
      await postPadCarryTaskManualFinish(body);
    } else {
      const body: API.getPadCarryTaskMoveParams = {
        ...pick(values, ['isAutoCarry']),
        fromLocation: last(values.fromLocation),
        toLocation: last(values.toLocation),
      };
      await getPadCarryTaskMove(body);
    }
    form.resetFields();
    setVisible(false);
    message.success(t('操作成功'));
    tableRef.current?.refresh();
  };

  return (
    <>
      <MwSearchTable
        ref={tableRef}
        api={api}
        fields={fields}
        scrollX={1000}
        extraVisible={false}
        rowKey="id"
        title={
          <>
            <Radio.Group value={isFinish} buttonStyle="solid" onChange={handleRadioChange}>
              <Radio.Button value={false}>{t('未完成')}</Radio.Button>
              <Radio.Button value={true}>{t('已完成/取消')}</Radio.Button>
            </Radio.Group>
            <ScannerInput
              scannerKey={SCANNER_TASK_TASKCODE}
              value={taskCode}
              placeholder={t('请输入任务编号，可以扫码')}
              onChange={handleInputChange}
            />
          </>
        }
        ctrl={isFinish ? undefined : ctrl}
      >
        <MwButton
          type="primary"
          onClick={() => {
            setVisible(true);
            load();
          }}
        >
          {t('创建搬运任务')}
        </MwButton>
      </MwSearchTable>
      <MwDialog
        centered
        title={t('点到点搬运')}
        visible={visible}
        onClose={() => {
          setVisible(false);
          setIsManuly(false);
        }}
        bodyStyle={{ maxHeight: 500, overflow: 'auto' }}
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
          initialValues={{ isAutoCarry: true }}
        >
          <Form.Item
            label={t('起始位置')}
            name="fromLocation"
            rules={[{ required: true, message: t('必填') }]}
          >
            <ScannerCascader
              disabled={isManuly}
              options={locationCodeOptions}
              placeholder={t('默认选中库位编号，可以改，也可以扫码')}
              scannerKey={SCANNER_TASK_FROM}
            />
          </Form.Item>
          <Form.Item label={t('目标位置')} name="toLocation">
            <ScannerCascader
              options={locationCodeOptions}
              placeholder={t('请选择目标位置')}
              scannerKey={SCANNER_TASK_TO}
            />
          </Form.Item>
          <Form.Item label={t('自动搬运')} name="isAutoCarry">
            <Radio.Group disabled={isManuly}>
              <Radio value={true}>{t('自动搬运')}</Radio>
              <Radio value={false}>{t('手动搬运')}</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </MwDialog>
    </>
  );
}

export default Task;
