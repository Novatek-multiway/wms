import { useEffect, useState } from 'react';
import { ScrollBoard } from '@jiaminghi/data-view-react';
import { postPadCarryTaskGetUnfinishPageData } from 'apis';
import { useRequest } from 'ahooks';
import { runInAction } from 'mobx';
import useStatusOptions from '../../hooks/useStatusOptions';

export default (props) => {
  const { boxStyle, refresh } = props;
  const { data, run } = useRequest(
    () =>
      postPadCarryTaskGetUnfinishPageData({
        pageIndex: 1,
        pageSize: 100000,
      }),
    { manual: true }
  );

  const { options: taskStatusOptions, statusEnum } = useStatusOptions(
    'EnumTaskStatus',
    'itemId',
    false
  );

  const [list, setList] = useState([]);

  useEffect(() => {
    console.log('taskStatusOptions', taskStatusOptions, statusEnum);
  }, [taskStatusOptions]);

  useEffect(() => {
    if (!data) return;
    const { resultData } = data;
    const { pageData } = resultData;
    const ary = [];
    pageData?.forEach((item: any) => {
      ary.push([
        item.taskCode,
        item.containerCode,
        statusEnum[item.taskStatus]?.text,
        item.fromCustomCode,
        item.toCustomCode,
        item.createTime,
      ]);
    });
    setList(ary);
  }, [data]);

  useEffect(() => {
    run();
  }, [refresh]);

  const config = {
    header: ['任务编号', '托盘', '任务状态', '起始位置', '目标位置', '创建时间'],
    data: list || [
      ['1', '2023-06-01 12:00:00', '入库', 'A1', 'b12c3'],
      ['2', '2023-06-01 12:00:00', '出库', 'A2', 'b12c3'],
      ['3', '2023-06-01 12:00:00', '入库', 'A3', 'b12c3'],
      ['4', '2023-06-01 12:00:00', '出库', 'A4', 'b12c3'],
      ['5', '2023-06-01 12:00:00', '入库', 'A5', 'b12c3'],
      ['6', '2023-06-01 12:00:00', '出库', 'A6', 'b12c3'],
      ['7', '2023-06-01 12:00:00', '入库', 'A7', 'b12c3'],
      ['8', '2023-06-01 12:00:00', '出库', 'A8', 'b12c3'],
      ['9', '2023-06-01 12:00:00', '出库', 'A8', 'b12c3'],
    ],
    headerBGC: '#00fff138',
    oddRowBGC: '#00000017',
    evenRowBGC: '#ededed13',
    headerHeight: 28,
    rowNum: 5,
    align: ['center', 'center', 'center', 'center', 'center', 'center'],
    columnWidth: [130, 70, 80, 80, 80],
  };
  return (
    <ScrollBoard config={config} style={{ width: '100%', height: '200px', fontSize: '12px' }} />
  );
};
