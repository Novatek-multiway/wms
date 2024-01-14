import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { get } from 'apis';
import { useRequest } from 'ahooks';

export default (props) => {
  const { boxStyle, refresh } = props;
  const [config, setConfig] = useState<any>({ xAxis: [], series: [] });
  const { data, run } = useRequest(() => get('/api/Daily/GetDailyJournalSummary'), {
    manual: true,
  });

  useEffect(() => {
    const series = [];
    series[0] = data?.resultData?.outboundQuantity ?? 0;
    series[1] = data?.resultData?.inboundQuantity ?? 0;
    series[2] = data?.resultData?.profitQuantity ?? 0;
    series[3] = data?.resultData?.lossQuantity ?? 0;
    setConfig({ ...config, series });
  }, [data]);

  useEffect(() => {
    run();
  }, [refresh]);

  const option = {
    title: {
      text: `出入库管理`,
      textStyle: {
        color: 'white',
        fontStyle: 'normal',
        fontSize: 16,
      },
      left: 10,
      top: 10,
    },
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: '5%',
      right: '7%',
      bottom: '7%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['出库', '入库', '盘盈', '盘亏'],
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'white',
            width: 0,
            type: 'solid',
          },
        },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: 'rgba(255,255,255, .7)',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: 'rgba(255,255,255, .7)',
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#a9a8a8',
          },
        },
      },
    ],
    series: [
      {
        name: '数量',
        type: 'bar',
        barWidth: '40px',
        data: config.series || [10, 52, 200, 334, 390, 330, 220],
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: {
                //数值样式
                color: 'white',
                fontSize: 15,
              },
            },
          },
        },
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={option} style={boxStyle}></ReactECharts>
    </div>
  );
};
