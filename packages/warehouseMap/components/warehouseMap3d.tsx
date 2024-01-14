import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';

import initCamera from './3d/camera';
import CameraController from './3d/cameraController';
import Lights from './3d/lights';
import Floor from './3d/floor';
import Ground from './3d/ground';
import CustomArea from './3d/area';
import Shelf from './3d/shelf';
import Location from './3d/location';
import Tunnel from './3d/tunnel';

import * as IW from './warehouseMap3d.d';
import { useStore } from '../store/index';

import { useUpdateEffect } from 'ahooks';
import {
  getApiCanvas3DGetMain,
  getApiCanvas3DGetCustomAreaList,
  getApiCanvas3DGetAreaList,
} from 'apis';

// 这个props的类型和注释要写完整,现在先不写
function WarehouseMap3d(props) {
  const [layoutInfo, setLayoutInfo] = useState<IW.ILayoutInfo | undefined>(undefined);
  const [customArea, setCustomArea] = useState<IW.ICustomArea[] | undefined>(undefined);
  const [shelfs, setShelfs] = useState<IW.IShelf[] | undefined>(undefined);
  const [locations, setLocations] = useState<IW.ILocationItem[] | undefined>(undefined);
  const [tunnels, setTunnels] = useState<IW.ITunnel[] | undefined>(undefined);

  const contentRef = useRef();
  const { warehouseMap } = useStore();
  const { mapWidth, floorPadding, areaYaxis, shelfYaxis, shelfConfig, locationConfig } =
    warehouseMap;

  const { rotation = true, refresh } = props;

  useEffect(() => {
    initLayout();
  }, []);

  useEffect(() => {
    function initBuilding() {
      initArea();
      initShelfs();
    }
    layoutInfo && initBuilding();
  }, [layoutInfo]);

  useUpdateEffect(() => {
    // 重新请求3d仓库中的货物
    initShelfs();
  }, [refresh]);

  async function initLayout() {
    const res = await getApiCanvas3DGetMain();
    const {
      resultData: { xaxisLength, yaxisLength, id },
    } = res;
    const baseWidth = Math.ceil(mapWidth / Math.max(xaxisLength, yaxisLength));
    const xWidth = baseWidth * xaxisLength;
    const yWidth = baseWidth * yaxisLength;
    const center = new THREE.Vector2(Math.floor(xWidth / 2), Math.floor(yWidth / 2));
    const floorData: THREE.Vector2[] = [
      new THREE.Vector2(-center.x - floorPadding, -center.y - floorPadding),
      new THREE.Vector2(center.x + floorPadding, -center.y - floorPadding),
      new THREE.Vector2(center.x + floorPadding, center.y + floorPadding),
      new THREE.Vector2(-center.x - floorPadding, center.y + floorPadding),
    ];
    warehouseMap.initConfigByLayout(baseWidth);
    setLayoutInfo({ center, baseWidth, floorData, canvasId: id });
  }

  async function initArea() {
    const res = await getApiCanvas3DGetCustomAreaList();
    const { resultData } = res;
    const customArea = resultData.map((item) => {
      const { fromXaxis, toXaxis, fromYaxis, toYaxis, name } = item;
      const { baseWidth, center } = layoutInfo!;
      const formX = fromXaxis * baseWidth - center.x;
      const toX = (toXaxis + 1) * baseWidth - center.x;
      const fromY = fromYaxis * baseWidth - center.y;
      const toY = (toYaxis + 1) * baseWidth - center.y;
      const areaItem: IW.ICustomArea = {
        points: [
          new THREE.Vector3(formX, areaYaxis, fromY),
          new THREE.Vector3(toX, areaYaxis, fromY),
          new THREE.Vector3(toX, areaYaxis, toY),
          new THREE.Vector3(formX, areaYaxis, toY),
          new THREE.Vector3(formX, areaYaxis, fromY),
        ],
        areaName: name,
      };
      return areaItem;
    });
    setCustomArea(customArea);
  }

  // 这个方法是匹配货物的
  async function initShelfs() {
    const res = await getApiCanvas3DGetAreaList({ canvasId: layoutInfo!.canvasId });
    const { resultData } = res;
    const resShelfs: IW.IShelf[] = [];
    const resLocations: IW.ILocationItem[] = [];
    const tunnels: IW.ITunnel[] = [];
    resultData.forEach((canvasArea) => {
      const { baseWidth, center } = layoutInfo!;
      const { fromXaxis, toXaxis, fromYaxis, toYaxis, locationList, canvasAreaType, tunnelName } =
        canvasArea;
      if (canvasAreaType === 1) {
        const numX = toXaxis - fromXaxis + 1;
        const numZ = 1;
        const shelfNum = toYaxis - fromYaxis + 1;
        const shelfList: IW.IShelf[] = new Array(shelfNum);
        const shelfX = fromXaxis * baseWidth - center.x;
        for (let i = 0, len = shelfList.length; i < len; i++) {
          const shelfZ = (fromYaxis + i) * baseWidth - center.y;
          shelfList[i] = {
            numX,
            numZ,
            numY: 1,
            position: new THREE.Vector3(shelfX, shelfYaxis, shelfZ),
          };
        }
        const locations: IW.ILocationItem[] = [];
        locationList?.forEach((loc) => {
          const { xaxis, yaxis, zaxis, locationStatus } = loc;
          const locX = shelfX + (xaxis - fromXaxis + 0.5) * shelfConfig.binLength;
          const locY =
            shelfConfig.bottomHeight +
            shelfConfig.holderHeight +
            shelfConfig.binHeight * (zaxis - 1) +
            Math.ceil(locationConfig.height / 2);
          const locZ = yaxis * baseWidth - center.y + shelfConfig.binWidth / 2;
          locations.push({
            ...loc,
            position: new THREE.Vector3(locX, locY, locZ),
            state: locationStatus,
          });
          if (shelfList[yaxis - fromYaxis].numY < zaxis) shelfList[yaxis - fromYaxis].numY = zaxis;
        });
        resShelfs.push(...shelfList);
        resLocations.push(...locations);
      } else if (canvasAreaType === 2) {
        const leftTopX = fromXaxis * baseWidth - center.x;
        const leftTopY = fromYaxis * baseWidth - center.y;
        const rightBottomX = (toXaxis + 1) * baseWidth - center.x;
        const rightBottomY = (toYaxis + 1) * baseWidth - center.y;
        const centerX = (leftTopX + rightBottomX) / 2;
        const centerY = (leftTopY + rightBottomY) / 2;
        let points1: THREE.Vector3[];
        let points2: THREE.Vector3[];
        if (rightBottomX - leftTopX < rightBottomY - leftTopY) {
          points1 = [
            new THREE.Vector3(leftTopX, areaYaxis, leftTopY),
            new THREE.Vector3(leftTopX, areaYaxis, rightBottomY),
          ];
          points2 = [
            new THREE.Vector3(rightBottomX, areaYaxis, leftTopY),
            new THREE.Vector3(rightBottomX, areaYaxis, rightBottomY),
          ];
        } else {
          points1 = [
            new THREE.Vector3(leftTopX, areaYaxis, leftTopY),
            new THREE.Vector3(rightBottomX, areaYaxis, leftTopY),
          ];
          points2 = [
            new THREE.Vector3(leftTopX, areaYaxis, rightBottomY),
            new THREE.Vector3(rightBottomX, areaYaxis, rightBottomY),
          ];
        }
        tunnelName &&
          tunnels.push({
            tunnelNamePoints: new THREE.Vector3(centerX, areaYaxis, centerY),
            tunnelName,
            linePointsList: [points1, points2],
          });
      }
    });
    setShelfs(resShelfs);
    setLocations(resLocations);
    setTunnels(tunnels);
  }

  const WarehouseMap = () => {
    useFrame(() => {
      rotation && contentRef.current.rotateY(0.001);
    });
    return (
      <group ref={contentRef}>
        <Ground />
        {layoutInfo && <Floor points={layoutInfo.floorData} />}
        {customArea &&
          customArea.map((area, index) => (
            <CustomArea key={index} points={area.points} areaName={area.areaName} />
          ))}
        {shelfs && shelfs.map((shelf, index) => <Shelf {...shelf} key={index} />)}
        {locations && <Location locationList={locations} />}
        {tunnels && tunnels.map((tunnel, index) => <Tunnel key={index} {...tunnel} />)}
      </group>
    );
  };

  return (
    <Canvas camera={initCamera()}>
      <color attach="background" args={['#393838']} />
      <CameraController />
      <fog attach="fog" args={['black', 100, 10000]} />
      <Lights />
      <WarehouseMap />
    </Canvas>
  );
}

export default observer(WarehouseMap3d);
