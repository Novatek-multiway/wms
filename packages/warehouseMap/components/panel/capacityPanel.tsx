import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { GetSummary } from 'apis';
import { useRequest } from 'ahooks';
import Left from './capacityPanel/Left';
import Right from './capacityPanel/Right';

export const getOptions = (config: any) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      bottom: !config.isBigScreen ? 20 : 0,
      left: 'center',
      data: config.xAxis || ['空库位', '满库位'],
      textStyle: {
        color: 'white',
      },
    },

    series: [
      {
        name: '数量',
        type: 'pie',
        radius: '40%',
        center: !config.isBigScreen ? ['50%', '45%'] : ['50%', '50%'],
        selectedMode: 'single',
        data: config.series || [
          { value: 634, name: '空库位' },
          { value: 735, name: '满库位' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        itemStyle: {
          normal: {
            color: function (color) {
              const colorLit = ['#49cc90', '#fc8251'];
              return colorLit[color.dataIndex];
            },
          },
        },
        labelLine: {
          show: true,
        },
        label: {
          normal: {
            formatter: '{b} : {c} ({d}%)',
            show: true,
            textStyle: {
              color: 'white',
            },
          },
        },
      },
    ],
  };
};

// 库容管理的图表
const CapacityPanel = (props) => {
  const { refresh, isBigScreen } = props;
  const { data: info, run } = useRequest(GetSummary, { manual: true });

  useEffect(() => {
    isBigScreen && run();
  }, [refresh]);

  return (
    <div style={{ width: '100%', display: 'flex', overflow: 'hidden' }}>
      <div style={{ flex: '1 1 auto', paddingBottom: '20px', width: 0 }}>
        {isBigScreen && (
          <Left
            info={info}
            style={{ width: '100%', height: '180px' }}
            isBigScreen={isBigScreen}
          ></Left>
        )}
      </div>

      <div style={{ width: isBigScreen ? '620px' : '100%' }}>{props.children}</div>

      <div style={{ flex: '1 1 auto', width: 0 }}>
        {isBigScreen && (
          <Right
            info={info}
            style={{ width: '100%', height: '180px' }}
            isBigScreen={isBigScreen}
          ></Right>
        )}
      </div>
    </div>
  );
};
CapacityPanel.Left = ({ isBigScreen, refresh }) => (
  <Left refresh={refresh} isBigScreen={isBigScreen}></Left>
);
CapacityPanel.Right = ({ isBigScreen, refresh }) => (
  <Right refresh={refresh} isBigScreen={isBigScreen}></Right>
);
export default CapacityPanel;
