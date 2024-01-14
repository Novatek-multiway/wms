import { useRef, useEffect, useState, useContext, useMemo } from 'react';
import { Button, Dropdown, FloatButton, Switch } from 'antd';
import {
  ColumnHeightOutlined,
  SettingOutlined,
  RedoOutlined,
  CodeSandboxOutlined,
} from '@ant-design/icons';
import * as THREE from 'three';
import {
  WarehouseMap3d,
  DashboardTitle,
  StockPanel,
  CapacityPanel,
  TaskPanel,
  BoundPanel,
  Legend,
} from 'warehousemap';
import useWindowSize from './hooks/useWindowSize';
import { AuthContext, useAppDispatch } from 'hooks';
import { useAsyncEffect, useWebSocket, useDebounceFn } from 'ahooks';
import md5 from 'md5';
import { useSpring, animated } from 'react-spring';
import './app.css';

const timer = new Date().getTime();
export default () => {
  const [isLogin, setIsLogin] = useState(false);
  const [checked, setChecked] = useState(true);
  const [expand, setExpand] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [refreshAll, setRefreshAll] = useState(false);
  const [refresh3d, setRefresh3d] = useState(false);
  const [windowSize] = useWindowSize();
  const { signIn, setDistToken } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  // 定义动画属性
  const rightAnimation = useSpring({
    right: expand ? '20px' : '-300px',
    config: { precision: 0.01 },
  });

  const leftAnimation = useSpring({
    left: expand ? '20px' : '-300px',
    config: { precision: 0.01 },
  });
  const centerAnimation = useSpring({
    bottom: expand ? '20px' : '-200px',
    config: { precision: 0.01 },
  });

  const { readyState, sendMessage, latestMessage, disconnect, connect } = useWebSocket(
    `ws://120.79.8.215:7228/notify?client=client2&key=${timer}`
  );

  const { run } = useDebounceFn(
    (params: any) => {
      refreshFn(params);
    },
    {
      wait: 100,
    }
  );

  const { run: run3d } = useDebounceFn(
    (params: any) => {
      refreshFn3d(params);
    },
    {
      wait: 100,
    }
  );

  const isBigScreen = useMemo(() => windowSize.width > 1440, [windowSize.width]);

  useEffect(() => {
    const data = latestMessage?.data ?? '{}';
    const new_data = JSON.parse(data);

    new_data.MessageType === 'SummaryNotify' && run(new_data);
    new_data.MessageType === 'WarehouseMapNotify' && run3d(new_data);
  }, [latestMessage, readyState]);

  const panelStyle = useMemo(() => {
    let height, width, top;
    height = width = 300 * windowSize.scale + 'px';
    top = windowSize.scale * 100 + 'px';
    return { height, width, top };
  }, [windowSize]);

  const boxStyle = useMemo(() => {
    return { height: panelStyle.height, width: panelStyle.width };
  }, [panelStyle]);

  useAsyncEffect(async () => {
    const data = {
      userName: 'admin',
      password: md5('123456'),
    };
    // await signIn(dispatch, data);
    await setDistToken(dispatch);
    setIsLogin(true);
  }, []);

  useEffect(() => {
    console.log('windowSize', windowSize);
    // 1300就得出滚动条，不然G
  }, [windowSize]);

  const refreshFn = (fnList: any[]) => {
    // 直接刷新全部，后续可以根据fnlist列表来指定
    setRefreshAll(!refreshAll);
  };

  const refreshFn3d = (params: any) => {
    setRefresh3d(!refresh3d);
  };

  return (
    // <AuthContext.Provider value={{ signIn }}>
    <AuthContext.Provider value={{ setDistToken }}>
      <Legend isEmpty={isEmpty} />
      {/* 先写到这，后面搬迁到组件去 */}
      {isLogin && (
        <div className="h-full relative overflow-hidden">
          <DashboardTitle refresh={refreshAll}></DashboardTitle>
          <animated.div
            style={{
              ...leftAnimation,
            }}
            className="left-bottom-box"
          >
            <StockPanel refresh={refreshAll}></StockPanel>
          </animated.div>
          <animated.div
            style={{
              ...rightAnimation,
            }}
            className="right-bottom-box"
          >
            <BoundPanel refresh={refreshAll}></BoundPanel>
          </animated.div>
          {/* 底部中间的位置 */}

          <animated.div style={{ ...centerAnimation }} className="center-bottom-box">
            <CapacityPanel refresh={refreshAll} isBigScreen={isBigScreen}>
              <TaskPanel refresh={refreshAll}></TaskPanel>
            </CapacityPanel>
          </animated.div>

          {/* 拆出来兼容小屏 */}
          {!isBigScreen && (
            <animated.div
              style={{
                ...leftAnimation,
              }}
              className="left-center-box"
            >
              <CapacityPanel.Left
                refresh={refreshAll}
                isBigScreen={isBigScreen}
              ></CapacityPanel.Left>
            </animated.div>
          )}

          {!isBigScreen && (
            <animated.div
              style={{
                ...rightAnimation,
              }}
              className="right-center-box"
            >
              <CapacityPanel.Right
                refresh={refreshAll}
                isBigScreen={isBigScreen}
              ></CapacityPanel.Right>
            </animated.div>
          )}

          <FloatButton.Group
            trigger="hover"
            // type="primary"
            style={{ right: 24, bottom: expand ? 310 : 20 }}
            icon={<SettingOutlined />}
          >
            <FloatButton
              type={isEmpty ? 'primary' : undefined}
              icon={<CodeSandboxOutlined />}
              tooltip={isEmpty ? '隐藏空库位' : '展示空库位'}
              onClick={() => {
                setIsEmpty(!isEmpty);
              }}
            />

            <FloatButton
              type={checked ? 'primary' : undefined}
              icon={<RedoOutlined />}
              tooltip={checked ? '禁止3D旋转' : '开启3D旋转'}
              onClick={() => {
                setChecked(!checked);
              }}
            />
            <FloatButton
              type={expand ? 'primary' : undefined}
              icon={<ColumnHeightOutlined />}
              tooltip={expand ? '收起面板' : '展开面板'}
              onClick={() => {
                setExpand(!expand);
              }}
            />
          </FloatButton.Group>
          <div className="w-full h-full absolute left-0 top-0">
            <WarehouseMap3d rotation={checked} refresh={refresh3d}></WarehouseMap3d>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
