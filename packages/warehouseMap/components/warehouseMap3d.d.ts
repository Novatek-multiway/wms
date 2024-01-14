import * as THREE from 'three';

export interface IWarehouse3dProps {
  layoutInfo: ILayoutInfo | undefined;
}

export interface ILayoutInfo {
  canvasId: number | string;
  baseWidth: number;
  center: THREE.Vector2;
  floorData: THREE.Vector2[];
}

export interface IShelf {
  numX: number;
  numY: number;
  numZ: number;
  position: THREE.Vector3;
}
export interface ILocationItem {
  state: number;
  position: THREE.Vector3;
  [props: string]: any;
}

export interface ITunnel {
  linePointsList: THREE.Vector3[][];
  tunnelNamePoints: THREE.Vector3;
  tunnelName: string;
}

export interface ICustomArea {
  points: THREE.Vector3[];
  areaName?: string;
}
