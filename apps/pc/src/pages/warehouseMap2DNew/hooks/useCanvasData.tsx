// import Konva from 'konva';
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
// import { IAreaProps, IBarrierProps, ICommonProps, IshelfMatrix } from '../interface';
import { allLocationStatus as locationStatusMap } from "@/store/warehouseMap.Store";

// import type { API } from 'apis';

interface ISize {
	width: number;
	height: number;
}

interface IProps {
	canvasData: API.OutputLayerTileDTO;
	size: ISize;
	activeStatusList: number[];
	locationId?: string;
	shouldDisplayText: boolean;
}

const MIN_SIZE = 50;
const CALC_SZIE = 10;
const SCALE = 0.8;

function calcStageSize(containerSize: ISize, xaxisLength: number, yaxisLength: number) {
	const baseLength =
		Math.floor(containerSize.width / xaxisLength) < MIN_SIZE ? MIN_SIZE : Math.floor(containerSize.width / xaxisLength);
	return {
		stageWidth: baseLength * xaxisLength,
		stageHeight: baseLength * yaxisLength,
		baseLength
	};
}

function genCommonItem({ x, y, width, height, id, text }: ICommonProps): IAreaProps {
	return {
		group: {
			name: "group-" + id
		},
		rect: {
			name: "rect-" + id,
			x,
			y,
			width,
			height,
			strokeWidth: 3
		},
		text: {
			name: "text-" + id,
			x,
			y,
			text,
			width,
			fontSize: 24,
			align: "center"
		},
		id
	};
}

function genCustomAreaItem(common: ICommonProps): IAreaProps {
	const item = genCommonItem(common);
	item.text.fill = "#000";
	item.rect.stroke = "#ffffff";
	item.rect.fill = "#f0f2f5";
	return item;
}

function genRoadwayItem(common: ICommonProps): IAreaProps {
	const item = genCommonItem(common);
	item.text.fill = "#fff";
	item.rect.stroke = "#fbfb43";
	item.rect.fill = "#dbdde1";
	return item;
}

const defaultData = {
	customAreaList: [],
	roadwayList: [],
	barrierList: [],
	shelfList: [],
	stageSize: {
		width: 0,
		height: 0
		// x: 0,
		// y: 0,
		// offset: {
		//   x: 0,
		//   y: 0,
		// },
	}
};

function useCanvasData({ canvasData, size, activeStatusList, locationId, shouldDisplayText }: IProps) {
	const { t } = useTranslation();
	return useMemo(() => {
		if (!size) return defaultData;
		if (!canvasData) return defaultData;
		const { xaxisLength, yaxisLength, areaList, locationList } = canvasData;
		const { baseLength, stageWidth, stageHeight } = calcStageSize(size, xaxisLength!, yaxisLength!);
		const customAreaList: IAreaProps[] = [];
		const roadwayList: IAreaProps[] = [];
		const barrierList: IBarrierProps[] = [];
		const shelfListMap: Record<number, IshelfMatrix> = {};

		areaList?.forEach(area => {
			const { fromXaxis, toXaxis, fromYaxis, toYaxis, displayName, canvasAreaType, id, isColumn } = area;
			const x = fromXaxis! * baseLength;
			const y = fromYaxis! * baseLength;
			const width = (toXaxis! - fromXaxis! + 1) * baseLength;
			const height = (toYaxis! - fromYaxis! + 1) * baseLength;
			if (width < 0 || height < 0) return;
			if (canvasAreaType === 4) {
				const customAreaItem = genCustomAreaItem({
					x,
					y,
					width,
					height,
					id,
					text: displayName!
				});
				customAreaList.push(customAreaItem);
			} else if (canvasAreaType === 2) {
				if (!displayName) return;
				const roadwayItem = genRoadwayItem({
					x,
					y,
					width,
					height,
					id,
					text: displayName
				});
				roadwayList.push(roadwayItem);
			} else if (canvasAreaType === 3) {
				if (height / baseLength >= 2) return;
				const barrierItem: IBarrierProps = {
					x,
					y,
					width,
					height,
					id
				};
				barrierList.push(barrierItem);
			} else {
				const col = toXaxis! - fromXaxis! + 1,
					row = toYaxis! - fromYaxis! + 1;
				const locationMatrix = new Array(row).fill(0).map(i => new Array(col).fill(false));

				// let offsetX = 0,
				//   offsetY = 0;

				// if (isColumn) {
				//   offsetX = -(((baseLength * (1 - SCALE)) / 2) * col + (CALC_SZIE / 2) * col);
				//   offsetY = -(((baseLength * (1 - SCALE)) / 2) * row);
				// } else {
				//   offsetX = -(((baseLength * (1 - SCALE)) / 2) * col);
				//   offsetY = -(((baseLength * (1 - SCALE)) / 2) * row + (CALC_SZIE / 2) * row);
				// }

				const matrixGroup: Konva.GroupConfig = {
					x,
					y,
					// offsetX,
					// offsetY,
					width,
					height
					// scaleX: SCALE,
					// scaleY: SCALE,
				};
				shelfListMap[id!] = {
					...area,
					matrixGroup,
					locationMatrix
				};
			}
		});

		locationList?.forEach(location => {
			const { xaxis, yaxis, id, canvasColumn, canvasRow, canvasAreaId, isColumn, locationStatus } = location;
			const calcLen = baseLength - CALC_SZIE;
			const rect: Konva.RectConfig = {
				width: isColumn ? calcLen : baseLength,
				height: isColumn ? baseLength : calcLen,
				fill: locationId === id ? '#f87171' : locationStatusMap?.[locationStatus!]?.color,
				stroke: "#000000",
				strokeWidth: 1,
				name: "location-rect-" + id
			};
			const group: Konva.GroupConfig = {
				offsetX: 0,
				offsetY: 0,
				name: "location-group" + id,
				visible: isEmpty(activeStatusList) ? true : activeStatusList.includes(locationStatus!)
			};
			let rowText: null | Konva.TextConfig = null;
			let colText: null | Konva.TextConfig = null;

			if (canvasAreaId && shelfListMap?.[canvasAreaId]) {
				const { fromXaxis, fromYaxis } = shelfListMap[canvasAreaId];
				const m = yaxis! - fromYaxis!,
					n = xaxis! - fromXaxis!;
				rect.x = n * baseLength;
				rect.y = m * baseLength;
				if (m === 0) {
					colText = {
						text: t("{{canvasColumn}}列", { canvasColumn }),
						x: rect.x + 10, // 随缘调整
						y: rect.y - 20, // 随缘调整
						fill: "#020617",
						fontSize: 18,
						visible: shouldDisplayText
					};
				}
				if (n === 0) {
					rowText = {
						text: t("{{canvasRow}}排", { canvasRow }),
						x: rect.x - 40, // 随缘调整
						y: rect.y + 15, // 随缘调整
						fill: "#020617",
						fontSize: 18,
						visible: shouldDisplayText
					};
				}
				shelfListMap[canvasAreaId].locationMatrix[m][n] = {
					rect,
					group,
					rowText,
					colText,
					...location
				};
			}
		});

		const deviceWidth = window.innerWidth - 200;
    	const deviceHeight = window.innerHeight - 64;
    	const scale = Math.min(deviceWidth / stageWidth, deviceHeight / stageHeight);

    	const offsetX = (stageWidth * scale - deviceWidth) / 2 - 100;
    	const offsetY = (stageHeight * scale - deviceHeight) / 2;

		return {
			customAreaList,
			roadwayList,
			barrierList,
			shelfList: Object.values(shelfListMap),
			stageSize: {
				width: stageWidth,
				height: stageHeight,
				// x: 0,
				// y: 0,
				// offsetX,
				// offsetY,
				// scaleX: scale,
				// scaleY: scale
			}
		};
	}, [canvasData, size, activeStatusList, locationId, shouldDisplayText]);
}

export default useCanvasData;
