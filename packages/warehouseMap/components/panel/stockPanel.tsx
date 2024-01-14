import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { get } from 'apis';
import { useRequest, useInterval } from 'ahooks';

export default (props) => {
  const { boxStyle, refresh } = props;
  const [config, setConfig] = useState<any>({ xAxis: [], series: [] });
  const [option, setOption] = useState<any>({});
  const [step, setStep] = useState({ start: 0, end: 2 });
  const { data, run } = useRequest(() => get('/api/Summary/GetMaterialInventory'), {
    manual: true,
  });

  useEffect(() => {
    let xAxis: any = [],
      series: any = [];
    data?.resultData.forEach((item: any, index: number) => {
      xAxis.push(item.materialName);
      series.push(item.quantity);
    });
    setConfig({ xAxis, series });
    setOption(options);
  }, [data]);

  useEffect(() => {
    run();
  }, [refresh]);

  useEffect(() => {
    console.log('options', options);
  }, []);

  useInterval(() => {
    if (config.xAxis.length > 3) {
      const { start, end } = step;
      if (config.series.length - 1 === end) {
        setStep({
          start: 0,
          end: 2,
        });
      } else {
        setStep({
          start: start + 1,
          end: end + 1,
        });
      }
    }
  }, 5000);

  const options = {
    title: {
      text: '实时库存管理',
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
        data: config.xAxis || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          formatter: function (value) {
            var text = value;
            if (text.length > 4) {
              return text.substring(0, 4) + '...';
            } else {
              return text;
            }
          },
        },
      },
    ],
    dataZoom: [
      {
        xAxisIndex: 0, //这里是从X轴的0刻度开始
        show: false, //是否显示滑动条，不影响使用
        type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        startValue: step.start || 0, // 从头开始。
        endValue: step.end || 2, // 一次性展示5个。
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
        name: '库存',
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
      <ReactECharts option={options} style={boxStyle}></ReactECharts>
    </div>
  );
};
