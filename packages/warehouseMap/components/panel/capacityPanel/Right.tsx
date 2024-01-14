import { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { GetSummary } from 'apis';
import { useRequest } from 'ahooks';
import { getOptions } from '../capacityPanel';
// 库容管理的图表
const Right = (props) => {
  const { info: props_info, refresh, isBigScreen } = props;
  const [containerConfig, setContainerConfig] = useState<any>({
    xAxis: [],
    series: [],
    isBigScreen,
  });
  const { data: info, run } = useRequest(GetSummary, { manual: true });

  const options = useMemo(() => getOptions(containerConfig), [containerConfig, isBigScreen]);

  useEffect(() => {
    const containerXaxis = ['空托盘', '满托盘'];
    const response = info || props_info;

    const containerSeries = [
      {
        value: response?.resultData?.emptyContainerTotal,
        name: '空托盘',
      },
      {
        value: response?.resultData?.fullContainerTotal,
        name: '满托盘',
      },
    ];
    setContainerConfig({ xAxis: containerXaxis, series: containerSeries, isBigScreen });
  }, [info, props_info, isBigScreen]);

  useEffect(() => {
    !isBigScreen && !props_info && run();
  }, [refresh, isBigScreen]);

  return <ReactECharts option={options} style={props.style}></ReactECharts>;
};

export default Right;
