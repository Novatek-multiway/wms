// import { KonvaNodeComponent, Group, GroupConfig } from "react-konva"
// import { Rect } from 'react-konva/ReactKonvaCore';
import Konva from 'konva';

// var test:

interface ICommonProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string | number;
  text: string;
}

interface IAreaProps {
  group: Konva.GroupConfig;
  rect: Konva.RectConfig;
  text: Konva.TextConfig;
  id: string | number;
}

interface IBarrierProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string | number;
}

interface ILocationItem extends API.OutputLocationTileDTO {
  rect: Konva.RectConfig;
  group: Konva.GroupConfig;
  rowText: Konva.TextConfig | null;
  colText: Konva.TextConfig | null;
}

type ILocation = ILocationItem | false;

interface IshelfMatrix extends API.OutputAreaTileDTO {
  locationMatrix: ILocation[][];
  matrixGroup: Konva.GroupConfig;
}
