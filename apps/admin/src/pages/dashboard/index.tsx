import { useDebounceFn, useSize, useWebSocket } from 'ahooks';
import { Divider, FloatButton, message as msg, Switch, Tree, notification } from 'antd';
import {
  Get2DTileData,
  GetLayerNavigation,
  GetSummary,
  SetLocationFull,
  GetRowUnbinding,
  GetEmptyTrayOutApply,
} from 'apis';
import cx from 'classnames';
import { shallowEqual, useAppDispatch, useAppSelector } from 'hooks';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { animated, useSpring } from 'react-spring';
import { reset } from 'store';
import useEnumOptions, { OptionItem } from '@/common/hooks/useEnumOptions';
import ProgressBar from '@/components/ProgressBar';
import { AppstoreOutlined, AimOutlined } from '@ant-design/icons';
import BindingDialog from './components/BindingDialog';
// import EmptyTrayOutApplyDialog from './components/EmptyTrayOutApplyDialog';
import InStockApplyDialog from './components/InStockApplyDialog';
import LayerStage, { ILayerRef } from './components/LayerStage';
import LocationDetailDialog from './components/LocationDetailDialog';
import MoveContainerDialog from './components/MoveContainerDialog';
import BindingEmptyDialog from './components/BindingEmpty';
// import UnbindingDialog from './components/UnbindingDialog';
import { locationStatusMap } from './constants';
import styles from './style.module.scss';

import type { API } from 'apis';
import UnbindingModal from './components/UnbindingModal';
import BindingEmpty from './components/BindingEmpty';
// import CombineEmptyTrayDialog from './components/CombineEmptyTrayDialog';
// import OutStockApplyDialog from './components/OutStockApplyDialog';

const CLIENT = 'pad';
const timer = new Date().getTime();

export default function DashBoard() {
  const { t } = useTranslation();
  const [summary, setSummary] = useState<API.WarehouseSummaryDTO>();
  const [layerNavigation, setLayerNavigation] = useState<API.LayerNavigationDTO[]>([]);
  const [toDTitleData, setToDTitleData] = useState<API.OutputLayerTileDTO[]>([]);
  const [activeStatus, setActiveStatus] = useState<boolean[]>(new Array(12).fill(false));
  const [defatulOpenKeys, setDefatulOpenKeys] = useState<string[]>([]);
  const [statusVisible, setStatusVisible] = useState(true);
  const [navigatorVisible, setNavigatorVisible] = useState(false);
  const [shouldDisplayText, setShouldDisplayText] = useState(false);
  const [konvaTitle, setKonvaTitle] = useState<string>(t('总览-1层') as string);

  const layerRef = useRef<ILayerRef>(null);

  const { run: runSummary } = useDebounceFn(
    () => {
      GetSummary().then((res: API.WarehouseSummaryDTOR) => {
        setSummary(res.resultData);
      });
    },
    { wait: 100 }
  );

  const { run: run2D } = useDebounceFn(
    () => {
      Get2DTileData({ layer: 1 }).then((res: API.OutputLayerTileDTOListR) => {
        setToDTitleData(res?.resultData ?? []);
      });
    },
    { wait: 100 }
  );

  const APIList = new Map([
    ['SummaryNotify', runSummary],
    ['WarehouseMapNotify', run2D],
  ]);

  useWebSocket(`ws://${import.meta.env.VITE_APP_BASE_API}/notify?client=${CLIENT}&key=${timer}`, {
    onMessage(message, instance) {
      const data = message?.data ?? '{}';
      const new_data = JSON.parse(data);
      const msgList = JSON.parse(new_data.Message);

      notification.destroy();
      if (msgList.length > 0) {
        msgList.forEach((item: any) => {
          item.ErrorMessage &&
            notification.error({
              message: '车辆ID：' + item.Id,
              description: item.ErrorMessage,
              duration: null,
            });
        });
      }
      const messageType = new_data.MessageType as 'SummaryNotify' | 'WarehouseMapNotify';
      if (APIList.has(messageType)) {
        APIList.get(messageType)?.();
      }
    },
  });

  const statusAnimation = useSpring({
    left: statusVisible ? 0 : -500,
  });

  const treeAnimation = useSpring({
    right: navigatorVisible ? 0 : -200,
  });

  const activeStatusList = useMemo(
    () =>
      activeStatus.reduce<number[]>((acc, cur, index) => {
        if (cur) {
          acc.push(index);
        }
        return acc;
      }, []),
    [activeStatus]
  );

  const dispatch = useAppDispatch();

  const { options: locationStatusOptions } = useEnumOptions(
    'Enum3DLocationStatus',
    'itemId',
    false
  );

  const handleStatusClick = ({ value }: OptionItem) => {
    const statusList = activeStatus.map((d, index) => (index === value ? !d : d));
    setActiveStatus(statusList);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const size = useSize(containerRef);

  const { locationId, operationPosition, visibleOperation } = useAppSelector(
    (state) => ({
      locationId: state.dashboard.locationId,
      operationPosition: state.dashboard.operationPosition,
      visibleOperation: state.dashboard.visibleOperation,
    }),
    shallowEqual
  );

  const initData = async () => {
    const [summaryRes, layerNavigationRes, toDTileDataRes] = await Promise.all([
      GetSummary() as Promise<API.WarehouseSummaryDTOR>,
      GetLayerNavigation() as Promise<API.LayerNavigationDTOListR>,
      Get2DTileData({ layer: 1 }) as Promise<API.OutputLayerTileDTOListR>,
    ]);

    setToDTitleData(toDTileDataRes?.resultData ?? []);
    setSummary(summaryRes.resultData);
    const navigations = (layerNavigationRes?.resultData ?? [])?.map((navi) => ({
      ...navi,
      selectable: false,
      key: navi.id,
    }));
    const keys = navigations.map((navi) => navi.id!);
    setDefatulOpenKeys(keys);
    setLayerNavigation(navigations);
  };

  useEffect(() => {
    initData();
    dispatch(reset());
    const main = document.getElementsByClassName('ant-layout-content')?.[0];
    // @ts-ignore
    if (main && main.style) {
      // @ts-ignore
      main.style.padding = '0';
    }
    return () => {
      // @ts-ignore
      if (main && main.style) {
        // @ts-ignore
        main.style.padding = undefined;
      }
    };
  }, []);

  const handleSelect = async (selectedKeys: any, { selected, selectedNodes, node, event }: any) => {
    if (!isEmpty(selectedKeys)) {
      const { layer, areaId, displayName } = selectedNodes[0] as API.LayerNavigationDTO;
      const areaName = layerNavigation?.find((navi) => navi.areaId === areaId)?.displayName;
      setKonvaTitle(`${areaName}-${displayName}`);
      const data = { layer, areaId };
      if (areaId == '0') {
        delete data[areaId];
      }
      const res = await Get2DTileData(data);
      setToDTitleData(res.resultData);
    }
  };

  return (
    <div className={cx([styles.dashboard, 'overflow-hidden', 'relative', 'h-[calc(100vh-56px)]'])}>
      {locationId && (
        <ul
          className={cx([
            styles.popover,
            { 'opacity-0': !visibleOperation, 'z-0': !visibleOperation },
          ])}
          style={{ ...operationPosition }}
        >
          <li className={styles.operationItem}>
            <LocationDetailDialog locationId={locationId} />
          </li>
          <li className={styles.operationItem}>
            <InStockApplyDialog locationId={locationId} refresh={initData} />
          </li>
          {/* <li className={styles.operationItem}>
            <EmptyTrayOutApplyDialog locationId={locationId} refresh={initData} />
          </li> */}
          {/* <li className={styles.operationItem}>
            <BindingDialog locationId={locationId} refresh={initData} />
          </li> */}
          <li
            className={styles.operationItem}
            onClick={() => {
              SetLocationFull({ id: locationId }).then((res) => {
                const { resultData } = res;
                resultData && msg.success(t('锁定成功'));
                run2D();
              });
            }}
          >
            {t('锁定')}
          </li>
          <li className={styles.operationItem}>
            {/* <UnbindingDialog locationId={locationId} refresh={initData} /> */}
            <UnbindingModal locationId={locationId} refresh={initData} />
          </li>
          <li className={styles.operationItem}>
            <MoveContainerDialog locationId={locationId} refresh={initData} />
          </li>
          <li className={styles.operationItem}>
            <BindingEmptyDialog locationId={locationId} refresh={initData} />
          </li>
          <li
            className={styles.operationItem}
            onClick={() => {
              GetRowUnbinding({ locationId: locationId }).then((res) => {
                const { resultData } = res;
                resultData && msg.success(t('解绑成功'));
                run2D();
              });
            }}
          >
            {t('一键解绑')}
          </li>
          <li
            className={styles.operationItem}
            onClick={() => {
              GetEmptyTrayOutApply({ locationId }).then((res) => {
                const { resultData } = res;
                resultData && msg.success(t('呼叫成功'));
                run2D();
              });
            }}
          >
            {t('呼叫空托')}
          </li>
          {/* <li className={styles.operationItem}>
            <CombineEmptyTrayDialog locationId={locationId} refresh={initData} />
          </li> */}
          {/* <li className={styles.operationItem}>
            <OutStockApplyDialog locationId={locationId} refresh={initData} />
          </li> */}
        </ul>
      )}
      <animated.div className="w-32 fixed top-10 right-0 z-50" style={treeAnimation}>
        <Tree
          showLine
          fieldNames={{
            title: 'displayName',
            key: 'id',
            children: 'subItemList',
          }}
          treeData={layerNavigation}
          onSelect={handleSelect}
          expandedKeys={defatulOpenKeys}
        />
      </animated.div>
      <div className="warehouse-map-container" ref={containerRef}>
        <LayerStage
          ref={layerRef}
          konvaTitle={konvaTitle}
          canvasData={toDTitleData[0]}
          size={size!}
          activeStatusList={activeStatusList}
          shouldDisplayText={shouldDisplayText}
        />
      </div>

      {/* <animated.div className={styles.statusRadioGroup} style={statusAnimation}>
        {locationStatusOptions.map((status) => (
          <div
            className={cx([styles.status, activeStatus?.[status.value] ? styles.active : ''])}
            onClick={() => {
              handleStatusClick(status);
            }}
            key={status.value}
          >
            <div
              className="w-3 h-2 rounded-sm mr-1 transition-colors"
              style={{
                backgroundColor: locationStatusMap?.[status.value].color,
              }}
            ></div>
            <div className="transition-colors">{status.label}</div>
          </div>
        ))}
        <div className="flex items-center">
          <span>{t('库位位置信息')}</span>
          <Switch
            checked={shouldDisplayText}
            onChange={setShouldDisplayText}
            checkedChildren={t('显示')}
            unCheckedChildren={t('隐藏')}
          />
        </div>
      </animated.div> */}

      <div className={styles.summary}>
        <ProgressBar
          left={summary?.emptyLocationTotal}
          right={summary?.fullLocationTotal}
          label={t('location')}
        />
        <Divider type="vertical" className="bg-teal-400" />
        <ProgressBar
          left={summary?.emptyContainerTotal}
          right={summary?.fullContainerTotal}
          label={t('container')}
        />
        <Divider type="vertical" className="bg-teal-400" />
        <div>
          {t('totalMa')}: {summary?.materialInventoryTotal}
        </div>
      </div>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<AppstoreOutlined />}
      >
        <FloatButton
          description={t('status')}
          onClick={() => setStatusVisible(!statusVisible)}
          type={statusVisible ? 'primary' : 'default'}
        />
        <FloatButton
          description={t('navi')}
          onClick={() => setNavigatorVisible(!navigatorVisible)}
          type={navigatorVisible ? 'primary' : 'default'}
        />
        <FloatButton icon={<AimOutlined />} onClick={() => layerRef.current?.toCenter()} />
      </FloatButton.Group>
    </div>
  );
}
