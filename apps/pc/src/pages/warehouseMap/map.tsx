import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import SwitchMenu from "./components/switchMenu";
// import WarehouseMap2D from "../warehouseMap2D";
import WarehouseMap2D from "../warehouseMap2DNew";
import WarehouseMap3D from "./index";
import Legend from "./components/legend";
import { getEnum3DLocationStatus } from "./services";
import { IlocationStatusItem, allLocationStatus } from "@/store/warehouseMap.Store";
import { useStore } from "@/store/index";

function MapContainer(props: any) {
	const [type, setType] = useState<"3d" | "2d">("3d");
	const { warehouseMap } = useStore();

	useEffect(() => {
		initLocationStatus();
	}, []);

	async function initLocationStatus() {
		const res = await getEnum3DLocationStatus();
		const list = res.resultData.reduce((acc, cur) => {
			acc[cur.itemId] = {
				status: cur.itemName,
				color: allLocationStatus[cur.itemId].color
			};
			return acc;
		}, {} as Record<string, IlocationStatusItem>);
		warehouseMap.initLocationStatus(list);
	}
	return (
		<>
			<Legend />
			<SwitchMenu type={type} handleChange={setType} />
			{type === "3d" ? <WarehouseMap3D /> : <WarehouseMap2D />}
		</>
	);
}

export default observer(MapContainer);
