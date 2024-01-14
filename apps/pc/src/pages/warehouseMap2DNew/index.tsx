import { useTranslation } from "react-i18next";
import { useSize, useDebounceFn } from "ahooks";
import { useEffect, useRef, useState } from "react";
import { Get2DTileData, GetLayerNavigation } from "./services/index";
import useCanvasData from "./hooks/useCanvasData";
import { LayerStage } from "ui";
import { useStore } from "@/store/index";
import { observer } from "mobx-react-lite";
import { Tree, notification, Switch } from "antd";
import { animated, useSpring } from "react-spring";
import { isEmpty, last } from "lodash";
import LocationInfo from "../warehouseMap/components/locationInfo";
import { getLocationInfo } from "../warehouseMap/services";
import "./index.less";

function WarehouseMap2D() {
	const { t } = useTranslation();
	const { warehouseMap, configStore } = useStore();
	const containerRef = useRef(null);
	const size = useSize(containerRef);
	const [toDTitleData, setToDTitleData] = useState<any[]>([]);
	const [layerNavigation, setLayerNavigation] = useState<any[]>([]);
	const [defatulOpenKeys, setDefatulOpenKeys] = useState<string[]>([]);
	const [locationId, setLocationId] = useState<string>();
	const [shouldDisplayText, setShouldDisplayText] = useState(false);
	const [konvaTitle, setKonvaTitle] = useState(t("总览-1层"));

	const props = useCanvasData({
		canvasData: toDTitleData[0],
		size,
		activeStatusList: warehouseMap.locationFilter,
		locationId,
		shouldDisplayText
	});

	const [navigatorVisible, setNavigatorVisible] = useState(false);

	const treeAnimation = useSpring({
		right: navigatorVisible ? 0 : -200
	});

	const { run: run2D } = useDebounceFn(
		() => {
			Get2DTileData({ layer: 1 }).then(res => {
				setToDTitleData(res?.resultData ?? []);
			});
		},
		{ wait: 100 }
	);

	const initData = async () => {
		const [layerNavigationRes, toDTileDataRes] = await Promise.all([GetLayerNavigation(), Get2DTileData({ layer: 1 })]);
		setToDTitleData(toDTileDataRes?.resultData ?? []);
		const navigations = (layerNavigationRes?.resultData ?? [])?.map(navi => ({
			...navi,
			selectable: false,
			key: navi.id
		}));
		setLayerNavigation(navigations);
		const keys = navigations.map(navi => navi.id!);
		setDefatulOpenKeys(keys);
	};

	const handleSelect = async (selectedKeys: any, { selected, selectedNodes, node, event }: any) => {
		if (!isEmpty(selectedKeys)) {
			const { layer, areaId, displayName } = selectedNodes[0];
			const areaName = layerNavigation?.find(navi => navi.areaId === areaId)?.displayName;
			setKonvaTitle(`${areaName}-${displayName}`);
			const data = { layer, areaId };
			if (areaId == "0") {
				delete data[areaId];
			}
			const res = await Get2DTileData(data);
			setToDTitleData(res.resultData);
		}
	};

	const onLocation = async e => {
		notification.destroy();
		setNavigatorVisible(false);
		const newLocationId = last(e.target.attrs?.name?.split("location-rect-")) as string;
		setLocationId(newLocationId);
		const res = await getLocationInfo(newLocationId);
		const { canvasRow = 0, canvasColumn = 0, mainXaxis = 0, mainYaxis, locationLayer = 1 } = res.resultData;
		const message = t("{{canvasRow}}排{{canvasColumn}}列{{locationLayer}}层 ({{mainXaxis}},{{mainYaxis}})", {
			canvasRow,
			canvasColumn,
			locationLayer,
			mainXaxis,
			mainYaxis
		});
		notification.open({
			message,
			description: <LocationInfo id={newLocationId} />,
			duration: 0,
			onClose: () => {}
		});
	};

	const onLocationOutside = () => {
		notification.destroy();
		setLocationId(undefined);
	};

	useEffect(() => {
		initData();
	}, []);

	useEffect(() => {
		if (configStore.webSocketIns) {
			configStore.webSocketIns.onmessage = message => {
				const data = message?.data ?? "{}";
				const new_data = JSON.parse(data);
				const messageType = new_data.MessageType as "SummaryNotify" | "WarehouseMapNotify";
				messageType === "WarehouseMapNotify" && run2D();
			};
		}
	}, []);

	return (
		<>
			<div id="warehouse-map-container" className="w-full relative" ref={containerRef}>
				<LayerStage
					{...props}
					konvaTitle={konvaTitle}
					onClickOutSide={onLocationOutside}
					onClickLocation={onLocation}
					onTapLocation={onLocation}
					scaleX={1}
					scaleY={1}
				/>

				<div
					className="navi"
					onClick={() => {
						setNavigatorVisible(!navigatorVisible);
						notification.destroy();
					}}
				>
					{t("导航")}
				</div>
				<animated.div className="w-40 fixed top-28 right-0 z-50 bg-white" style={treeAnimation}>
					<Tree
						showLine
						fieldNames={{
							title: "displayName",
							key: "id",
							children: "subItemList"
						}}
						treeData={layerNavigation}
						onSelect={handleSelect}
						expandedKeys={defatulOpenKeys}
					/>

					<div className="my-1 flex items-center">
						<span>{t("库位位置信息")}</span>
						<Switch
							checked={shouldDisplayText}
							onChange={setShouldDisplayText}
							checkedChildren={t("显示")}
							unCheckedChildren={t("隐藏")}
						/>
					</div>
				</animated.div>
			</div>
		</>
	);
}

export default observer(WarehouseMap2D);
