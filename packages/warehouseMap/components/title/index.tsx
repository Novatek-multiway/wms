import { useEffect } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { get } from 'apis';
import { useRequest } from 'ahooks';

import './index.css';

export default (props) => {
  const { boxStyle, refresh } = props;
  const [windowSize] = useWindowSize();
  const { data, run } = useRequest(() => get('/api/Daily/GetCompletedTaskSummary'), {
    manual: true,
  });

  useEffect(() => {
    console.log('windowSize', windowSize);
  }, [windowSize]);

  useEffect(() => {
    console.log('title data', data);
  }, [data]);

  useEffect(() => {
    run();
  }, [refresh]);

  return (
    <div
      className="dashboard-bg z-10"
      style={{
        transform: `scale(${windowSize.scale})`,
        left: -windowSize.offset_left,
        top: -windowSize.offset_top,
      }}
    >
      <div className="dashboard-title">劢微仓库大屏管理中心</div>
      <div className="dashboard-left-tips">
        今日完成任务数: &nbsp;<span>{data?.resultData?.dailyTotal ?? 0}</span>
      </div>
      <div className="dashboard-right-tips">
        累计完成任务数: &nbsp;<span>{data?.resultData?.grandTotal ?? 0}</span>
      </div>
    </div>
  );
};
