import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { message } from "antd";
import { GetCanvasMain, GetCanvasArea, GetCustomArea } from "./services";
import "./index.less";
import ShelfDialog from "./components/shelfDialog";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/index";

interface IlayoutInfo {
	title: string;
	xaxisLength: number;
	yaxisLength: number;
	baseLength: number;
}
export type CanvasAreaType = 1 | 2 | 3;
interface IcanvasAreaItem {
	areaWidth: number;
	areaHeight: number;
	top: number;
	left: number;
	areaType: CanvasAreaType;
	tunnelName: string;
	canvasId: string;
	isColumn: boolean;
	shelfList: Record<string, any>[];
}

interface IcanvasAreaDataItem {
	fromXaxis: number;
	toXaxis: number;
	fromYaxis: number;
	toYaxis: number;
	canvasAreaType: CanvasAreaType;
	tunnelName: string;
	canvasId: string;
	locationList: IcanvasAreaLocationDataItem[];
	isColumn: boolean;
}

interface IcanvasAreaLocationDataItem {
	locationRow: number;
	locationColumn: number;
	canvasRow: number;
	canvasColumn: number;
	state: 1;
	xaxis: 8;
	yaxis: 5;
}

interface ICanvasMainData {
	canvasCode: string;
	xaxisLength: number;
	yaxisLength: number;
	[prop: string]: any;
}

interface ICustomAreaItem {
	areaName: string;
	customWidth: number;
	customHeight: number;
	top: number;
	left: number;
}

interface ICustomAreaDataItem {
	fromXaxis: number;
	toXaxis: number;
	fromYaxis: number;
	toYaxis: number;
	areaName: string;
	name: string;
}

function WarehouseMap2D() {
	const { t } = useTranslation();
	const { warehouseMap } = useStore();
	const {
		locationConfig: { locationStatus },
		locationFilter
	} = warehouseMap;
	const closeDialog = () => {
		setShelfDialogProps(state => ({ ...state, visible: false }));
	};
	const [layoutInfo, setLayoutInfo] = useState<IlayoutInfo>({
		title: "",
		xaxisLength: 0,
		yaxisLength: 0,
		baseLength: 0
	});
	const [canvasArea, setCanvasArea] = useState<IcanvasAreaItem[]>([]);
	const [customArea, setCustomArea] = useState<ICustomAreaItem[]>([]);
	const [shelfDialogProps, setShelfDialogProps] = useState({
		colIndex: -1,
		shelItem: {},
		visible: false,
		close: closeDialog
	});

	useEffect(() => {
		initLayout();
	}, []);

	useEffect(() => {
		if (layoutInfo.baseLength) {
			initCanvasArea();
			initCustomArea();
		}
	}, [layoutInfo]);

	async function initLayout() {
		try {
			const res = await GetCanvasMain<ICanvasMainData>();
			if (res.statusCode != 200) return message.error(t("生成失败！"));
			const wrapDomWidth = document.getElementById("warehouse-map-container")!.offsetWidth;
			const { canvasCode, xaxisLength, yaxisLength } = res.resultData;
			const baseLength = Math.floor(wrapDomWidth / xaxisLength) < 35 ? 35 : Math.floor(wrapDomWidth / xaxisLength);
			setLayoutInfo({
				title: canvasCode,
				xaxisLength,
				yaxisLength,
				baseLength
			});
		} catch (e) {
			message.error(t("生成失败！"));
		}
	}

	async function initCanvasArea() {
		try {
			const res = await GetCanvasArea<IcanvasAreaDataItem[]>();
			if (res.statusCode != 200) return message.error(t("生成失败！"));
			const { resultData } = res;
			const list = resultData.map(area => {
				const {
					fromXaxis,
					toXaxis,
					fromYaxis,
					toYaxis,
					canvasAreaType,
					tunnelName,
					canvasId,
					locationList = [],
					isColumn = false
				} = area;
				const { baseLength } = layoutInfo;
				const areaWidth = (toXaxis - fromXaxis + 1) * baseLength;
				const areaHeight = (toYaxis - fromYaxis + 1) * baseLength;
				const top = fromYaxis * baseLength;
				const left = fromXaxis * baseLength;
				const resArea: IcanvasAreaItem = {
					areaWidth,
					areaHeight,
					top,
					left,
					areaType: canvasAreaType,
					tunnelName,
					canvasId,
					isColumn,
					shelfList: []
				};
				if (canvasAreaType == 1) {
					if (isColumn) {
						const shelfList = new Array(toXaxis - fromXaxis + 2);
						for (let i = 0, len = shelfList.length; i < len; i++)
							shelfList[i] = new Array(toYaxis - fromYaxis + 2).fill({ type: "text" });
						locationList.forEach(location => {
							const { xaxis, yaxis } = location;
							shelfList[xaxis - fromXaxis + 1][yaxis - fromYaxis + 1] = { ...location };
						});
						for (let i = 1; i < shelfList.length; i++) {
							shelfList[i][0].canvasRow = shelfList[i][1].canvasRow;
						}
						resArea.shelfList = shelfList;
					} else {
						const shelfList = new Array(toYaxis - fromYaxis + 2);
						for (let i = 0, len = shelfList.length; i < len; i++)
							shelfList[i] = new Array(toXaxis - fromXaxis + 2).fill({ type: "text" });
						locationList.forEach(location => {
							const { xaxis, yaxis } = location;
							shelfList[yaxis - fromYaxis + 1][xaxis - fromXaxis + 1] = { ...location };
						});
						for (let i = 1; i < shelfList.length; i++) {
							shelfList[i][0].canvasRow = shelfList[i][1].canvasRow;
						}
						resArea.shelfList = shelfList;
					}
				}
				return resArea;
			});
			setCanvasArea(list);
		} catch (e) {
			message.error(t("生成失败！"));
		}
	}

	async function initCustomArea() {
		try {
			const res = await GetCustomArea<ICustomAreaDataItem[]>();
			const { baseLength } = layoutInfo;
			const list = res.resultData.map(area => {
				const { fromXaxis, toXaxis, fromYaxis, toYaxis, areaName, name } = area;
				const customWidth = (toXaxis - fromXaxis + 1) * baseLength;
				const customHeight = (toYaxis - fromYaxis + 1) * baseLength;
				const top = fromYaxis * baseLength;
				const left = fromXaxis * baseLength;
				return {
					areaName: areaName || name,
					customWidth,
					customHeight,
					top,
					left
				};
			});
			setCustomArea(list);
		} catch (e) {
			message.error(t("生成失败！"));
		}
	}

	const handleShelfClick = (shelItem: Record<string, any>, colIndex: number) => {
		if (!shelItem.canvasRow) return;
		setShelfDialogProps(state => ({
			...state,
			visible: true,
			shelItem,
			colIndex
		}));
	};

	return (
		<div id="warehouse-map-container">
			<p className="map-title">{layoutInfo.title}</p>
			<div
				className="map-wrap"
				style={{
					width: layoutInfo.xaxisLength * layoutInfo.baseLength + "px",
					height: layoutInfo.yaxisLength * layoutInfo.baseLength + "px"
				}}
			>
				{/* 用户区域 */}
				{customArea.map(customAreaItem => (
					<ul
						className="custom-area"
						key={customAreaItem.areaName}
						style={{
							width: customAreaItem.customWidth + "px",
							height: customAreaItem.customHeight + "px",
							top: customAreaItem.top + "px",
							left: customAreaItem.left + "px"
						}}
					>
						<p className="custom-area-name">{customAreaItem.areaName}</p>
					</ul>
				))}

				{/* 画布区域 */}
				{canvasArea.map(canvasAreaItem => (
					<ul
						className="canvas-area"
						style={{
							width: canvasAreaItem.areaWidth + "px",
							height: canvasAreaItem.areaHeight + "px",
							top: canvasAreaItem.top + "px",
							left: canvasAreaItem.left + "px",
							transform: canvasAreaItem.isColumn && canvasAreaItem.areaType == 1 ? "rotate(90deg)" : ""
						}}
					>
						{/* 巷道 */}
						{canvasAreaItem.areaType == 2 && (
							<div
								className="roadway"
								style={{
									background: `linear-gradient(${
										canvasAreaItem.areaWidth > canvasAreaItem.areaHeight ? "180deg" : "90deg"
									}, #ffff00b9, #ffff00b9 3px, #787d822d 3px, #787d822d calc(100% - 3px), #ffff00b9 calc(100% - 3px), #ffff00b9)`
								}}
							>
								{canvasAreaItem.tunnelName}
							</div>
						)}

						{/* 障碍物 */}
						{canvasAreaItem.areaType == 3 && canvasAreaItem.areaHeight / layoutInfo.baseLength < 2 && (
							<div className="barrier"></div>
						)}

						{/* 货架 */}
						{canvasAreaItem.areaType == 1 &&
							canvasAreaItem.shelfList.map((row, rowIndex) => (
								<li className={["shelf", rowIndex ? "" : "shelf-text-wrap"].join(" ")}>
									{row.map((col: Record<string, any>, colIndex: number) => (
										<>
											{rowIndex === 0 ? (
												<span
													className="shelf-text shelf-text-col"
													style={{ width: layoutInfo.baseLength - 8 + "px", visibility: colIndex === 0 ? "hidden" : "visible" }}
												>
													{canvasAreaItem.shelfList[1][colIndex].canvasColumn}
													{t("列")}
												</span>
											) : colIndex === 0 ? (
												<span
													className="shelf-text shelf-text-row"
													style={{ width: layoutInfo.baseLength - 8 + "px", display: col.canvasRow ? "inline-block" : "none" }}
												>
													{col.canvasRow}
													{t("排")}
												</span>
											) : (
												<span
													className="shelf-item"
													onClick={() => handleShelfClick(col, colIndex)}
													style={{
														width: layoutInfo.baseLength - 8 + "px",
														height: layoutInfo.baseLength - 22 + "px",
														background: locationStatus[col.state]?.color,
														visibility:
															!locationFilter.length ||
															col.locationList
																?.map((locationItem: Record<string, any>) => locationItem.locationStatus)
																.some((status: number) => locationFilter.includes(status))
																? "visible"
																: "hidden"
													}}
												></span>
											)}
										</>
									))}
								</li>
							))}
					</ul>
				))}
			</div>
			<ShelfDialog {...shelfDialogProps} />
		</div>
	);
}

export default observer(WarehouseMap2D);
