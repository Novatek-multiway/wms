import { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { GetSummary } from 'apis';
import { useRequest } from 'ahooks';
import { getOptions } from '../capacityPanel';
// 库容管理的图表
const Left = (props) => {
  const { info: props_info, refresh, isBigScreen } = props;
  const [locationConfig, setLocationConfig] = useState<any>({ xAxis: [], series: [], isBigScreen });
  const { data: info, run } = useRequest(GetSummary, { manual: true });

  const options = useMemo(() => getOptions(locationConfig), [locationConfig, isBigScreen]);

  useEffect(() => {
    const locationXaxis = ['空库位', '满库位'];
    const response = info || props_info;

    const locationSeries = [
      {
        value: response?.resultData?.emptyLocationTotal,
        name: '空库位',
      },
      {
        value: response?.resultData?.fullLocationTotal,
        name: '满库位',
      },
    ];

    setLocationConfig({ xAxis: locationXaxis, series: locationSeries, isBigScreen });
  }, [info, props_info, isBigScreen]);

  useEffect(() => {
    !isBigScreen && !props_info && run();
  }, [refresh, isBigScreen]);

  return <ReactECharts option={options} style={props.style}></ReactECharts>;
};

export default Left;
