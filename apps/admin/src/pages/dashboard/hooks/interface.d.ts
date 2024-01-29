import { API } from 'apis';
export declare namespace Konva {
  interface NodeConfig {
    height?: number;
    width?: number;
    x?: number;
    y?: number;
    name?: string;
    offsetX?: number;
    offsetY?: number;
    visible?: boolean;
  }
  interface GroupConfig extends NodeConfig {}

  interface RectConfig extends NodeConfig {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  }

  interface TextConfig extends NodeConfig {
    text: string;
    fill?: string;
    fontSize?: number;
    align?: string;
  }
}

export interface ICommonProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string | number;
  text: string;
}

export interface IAreaProps {
  group: Konva.GroupConfig;
  rect: Konva.RectConfig;
  text: Konva.TextConfig;
  id: string | number;
}

export interface IBarrierProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string | number;
}

export interface ILocationItem extends API.OutputLocationTileDTO {
  rect: Konva.RectConfig;
  group: Konva.GroupConfig;
  rowText: Konva.TextConfig | null;
  colText: Konva.TextConfig | null;
  locationText: Konva.TextConfig | null;
}

type ILocation = ILocationItem | false;

export interface IshelfMatrix extends API.OutputAreaTileDTO {
  locationMatrix: ILocation[][];
  matrixGroup: Konva.GroupConfig;
}
