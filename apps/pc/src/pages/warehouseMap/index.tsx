import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { observer } from "mobx-react-lite";
import CameraController from "./components/cameraController";
import * as THREE from "three";
import Lights from "./components/lights";
import initCamera from "./components/camera";
import Floor from "./components/floor";
import CustomArea from "./components/area";
import Shelf from "./components/shelf";
import Location from "./components/location";
import Tunnel from "./components/tunnel";
import { getCanvasMain, getCanvasArea, getCustomArea, getEnum3DLocationStatus } from "./services";
import { useStore } from "@/store/index";
import "./style.less";
import Ground from "./components/ground";
import { useDebounceFn } from "ahooks";

interface ILayoutInfo {
	canvasId: string;
	baseWidth: number;
	center: THREE.Vector2;
	floorData: THREE.Vector2[];
}

interface IShelf {
	numX: number;
	numY: number;
	numZ: number;
	position: THREE.Vector3;
}
interface ILocationItem {
	state: number;
	position: THREE.Vector3;
	[props: string]: any;
}

interface ITunnel {
	linePointsList: THREE.Vector3[][];
	tunnelNamePoints: THREE.Vector3;
	tunnelName: string;
}

interface ICustomArea {
	points: THREE.Vector3[];
	areaName?: string;
}

function WarehouseMap() {
	const contentRef = useRef();
	const [layoutInfo, setLayoutInfo] = useState<ILayoutInfo | undefined>(undefined);
	const [customArea, setCustomArea] = useState<ICustomArea[] | undefined>(undefined);
	const [shelfs, setShelfs] = useState<IShelf[] | undefined>(undefined);
	const [locations, setLocations] = useState<ILocationItem[] | undefined>(undefined);
	const [tunnels, setTunnels] = useState<ITunnel[] | undefined>(undefined);
	const { warehouseMap, configStore } = useStore();
	const { mapWidth, floorPadding, areaYaxis, shelfYaxis, shelfConfig, locationConfig } = warehouseMap;
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

	// useFrame(() => {
	// 	contentRef.current.rotateY(0.001)
	// })

	async function initLayout() {
		const res = await getCanvasMain();
		const {
			resultData: { xaxisLength, yaxisLength, id }
		} = res;
		const baseWidth = Math.ceil(mapWidth / Math.max(xaxisLength, yaxisLength));
		const xWidth = baseWidth * xaxisLength;
		const yWidth = baseWidth * yaxisLength;
		const center = new THREE.Vector2(Math.floor(xWidth / 2), Math.floor(yWidth / 2));
		const floorData: THREE.Vector2[] = [
			new THREE.Vector2(-center.x - floorPadding, -center.y - floorPadding),
			new THREE.Vector2(center.x + floorPadding, -center.y - floorPadding),
			new THREE.Vector2(center.x + floorPadding, center.y + floorPadding),
			new THREE.Vector2(-center.x - floorPadding, center.y + floorPadding)
		];
		warehouseMap.initConfigByLayout(baseWidth);
		setLayoutInfo({ center, baseWidth, floorData, canvasId: id });
	}

	async function initArea() {
		const res = await getCustomArea();
		const { resultData } = res;
		const customArea = resultData.map(item => {
			const { fromXaxis, toXaxis, fromYaxis, toYaxis, name } = item;
			const { baseWidth, center } = layoutInfo!;
			const formX = fromXaxis * baseWidth - center.x;
			const toX = (toXaxis + 1) * baseWidth - center.x;
			const fromY = fromYaxis * baseWidth - center.y;
			const toY = (toYaxis + 1) * baseWidth - center.y;
			const areaItem: ICustomArea = {
				points: [
					new THREE.Vector3(formX, areaYaxis, fromY),
					new THREE.Vector3(toX, areaYaxis, fromY),
					new THREE.Vector3(toX, areaYaxis, toY),
					new THREE.Vector3(formX, areaYaxis, toY),
					new THREE.Vector3(formX, areaYaxis, fromY)
				],
				areaName: name
			};
			return areaItem;
		});
		setCustomArea(customArea);
	}

	async function initShelfs() {
		const res = await getCanvasArea(layoutInfo!.canvasId);
		const { resultData } = res;
		const resShelfs: IShelf[] = [];
		const resLocations: ILocationItem[] = [];
		const tunnels: ITunnel[] = [];
		resultData.forEach(canvasArea => {
			const { baseWidth, center } = layoutInfo!;
			const { fromXaxis, toXaxis, fromYaxis, toYaxis, locationList, canvasAreaType, tunnelName } = canvasArea;
			if (canvasAreaType === 1) {
				const numX = toXaxis - fromXaxis + 1;
				const numZ = 1;
				const shelfNum = toYaxis - fromYaxis + 1;
				const shelfList: IShelf[] = new Array(shelfNum);
				const shelfX = fromXaxis * baseWidth - center.x;
				for (let i = 0, len = shelfList.length; i < len; i++) {
					const shelfZ = (fromYaxis + i) * baseWidth - center.y;
					shelfList[i] = { numX, numZ, numY: 1, position: new THREE.Vector3(shelfX, shelfYaxis, shelfZ) };
				}
				const locations: ILocationItem[] = [];
				locationList?.forEach(loc => {
					const { xaxis, yaxis, zaxis, locationStatus } = loc;
					const locX = shelfX + (xaxis - fromXaxis + 0.5) * shelfConfig.binLength;
					const locY =
						shelfConfig.bottomHeight +
						shelfConfig.holderHeight +
						shelfConfig.binHeight * (zaxis - 1) +
						Math.ceil(locationConfig.height / 2);
					const locZ = yaxis * baseWidth - center.y + shelfConfig.binWidth / 2;
					locations.push({ ...loc, position: new THREE.Vector3(locX, locY, locZ), state: locationStatus });
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
					points1 = [new THREE.Vector3(leftTopX, areaYaxis, leftTopY), new THREE.Vector3(leftTopX, areaYaxis, rightBottomY)];
					points2 = [
						new THREE.Vector3(rightBottomX, areaYaxis, leftTopY),
						new THREE.Vector3(rightBottomX, areaYaxis, rightBottomY)
					];
				} else {
					points1 = [new THREE.Vector3(leftTopX, areaYaxis, leftTopY), new THREE.Vector3(rightBottomX, areaYaxis, leftTopY)];
					points2 = [
						new THREE.Vector3(leftTopX, areaYaxis, rightBottomY),
						new THREE.Vector3(rightBottomX, areaYaxis, rightBottomY)
					];
				}
				tunnelName &&
					tunnels.push({
						tunnelNamePoints: new THREE.Vector3(centerX, areaYaxis, centerY),
						tunnelName,
						linePointsList: [points1, points2]
					});
			}
		});
		setShelfs(resShelfs);
		setLocations(resLocations);
		setTunnels(tunnels);
	}

	const { run: run3D } = useDebounceFn(initShelfs, { wait: 100 });

	useEffect(() => {
		if (configStore.webSocketIns) {
			configStore.webSocketIns.onmessage = message => {
				const data = message?.data ?? "{}";
				const new_data = JSON.parse(data);
				const messageType = new_data.MessageType as "SummaryNotify" | "WarehouseMapNotify";
				messageType === "WarehouseMapNotify" && run3D();
			};
		}
	}, []);

	return (
		<group ref={contentRef}>
			<Ground />
			{layoutInfo && <Floor points={layoutInfo.floorData} />}
			{customArea && customArea.map((area, index) => <CustomArea key={index} points={area.points} areaName={area.areaName} />)}
			{shelfs && shelfs.map((shelf, index) => <Shelf {...shelf} key={index} />)}
			{locations && <Location locationList={locations} />}
			{tunnels && tunnels.map((tunnel, index) => <Tunnel key={index} {...tunnel} />)}
		</group>
	);
}

function CanvasWrap() {
	return (
		<Canvas camera={initCamera()}>
			<color attach="background" args={["#edf0f7"]} />
			<CameraController />
			<fog attach="fog" args={["#edf0f7", 100, 10000]} />
			<Lights />
			<WarehouseMap />
		</Canvas>
	);
}

export default observer(CanvasWrap);
