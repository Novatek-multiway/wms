import { useTranslation } from "react-i18next";
import { GetRowInfoByArea } from "../services";
import { Modal, message, Card } from "antd";
import { useState, useEffect } from "react";
import LocationTable from "./locationTable";
import { useStore } from "@/store/index";

interface Iprops {
	colIndex: number;
	shelItem: Record<string, any>;
	visible: boolean;
	close(): void;
}

function ShelfDialog(props: Iprops) {
	const { t } = useTranslation();
	const [shelfDialogData, setShelfDialogData] = useState<Record<string, any>>({
		loading: false,
		locationList: [],
		choosedLocation: {},
		choosedLocationData: []
	});
	const { warehouseMap } = useStore();
	const {
		locationConfig: { locationStatus },
		locationFilter
	} = warehouseMap;

	useEffect(() => {
		if (props.visible) initShelfData();
	}, [props.visible]);

	useEffect(() => {
		if (!Object.keys(shelfDialogData.choosedLocation).length) return;
		const keys = Object.keys(shelfDialogData.choosedLocation).filter(key => shelfDialogData.choosedLocation[key]);
		const list = keys.reduce((res, key) => {
			const [i, j] = key.split("-");
			const item = shelfDialogData.locationList[+i][+j];
			if (item?.type !== "not-exist") res.push(item);
			return res;
		}, [] as any[]);
		setShelfDialogData(state => ({ ...state, choosedLocationData: list }));
	}, [shelfDialogData.choosedLocation]);

	async function initShelfData() {
		try {
			setShelfDialogData(state => ({ ...state, loading: true }));
			const res = await GetRowInfoByArea<Record<string, any>>({ canvasRow: props.shelItem.canvasRow });
			const {
				resultData: { beginColumn, endColumn, locations = [] }
			} = res;
			locations.sort(
				(a: Record<string, any>, b: Record<string, any>) => a.locationLayer - b.locationLayer || a.canvasColumn - b.canvasColumn
			);
			const list: Record<string, any>[] = [];
			locations.forEach((item: Record<string, any>) => {
				const { locationLayer, canvasColumn } = item;
				// 兼容货位不存在的情况
				if (!list[locationLayer - 1])
					list[locationLayer - 1] = new Array(endColumn - beginColumn + 1).fill({ type: "not-exist" });
				list[locationLayer - 1][canvasColumn - beginColumn] = { ...item };
			});
			if (list.length) {
				// 货架底层柱子
				list.unshift(new Array(list[0].length).fill({ type: "base-rack" }));
				// 排信息
				list.forEach(item => {
					item.unshift({ type: "layer-info" });
				});
				// 列信息
				const colList = new Array(list[0].length).fill({ type: "col-info" });
				list.push(colList);
			}
			setShelfDialogData(state => ({ ...state, locationList: list }));
			const choosedLocationTemp: Record<string, boolean> = {};
			for (let i = 1, len = list.length - 1; i < len; i++) {
				if (!list[i]) continue; // 兼容数据不匹配的情况
				choosedLocationTemp[i + "-" + props.colIndex] = true;
			}
			setShelfDialogData(state => ({ ...state, choosedLocation: choosedLocationTemp }));
		} catch (e) {
			message.error(t("生成失败！"));
		} finally {
			setShelfDialogData(state => ({ ...state, loading: false }));
		}
	}

	const handleLocationClick = (locationItem: Record<string, any>, layerIndex: number, colIndex: number) => {
		if (locationItem.type === "not-exist" || !layerIndex) return;
		const key = layerIndex + "-" + colIndex;
		if (shelfDialogData.choosedLocation[key]) {
			setShelfDialogData(state => {
				const choosedLocationTemp = { ...state.choosedLocation };
				delete choosedLocationTemp[key];
				return { ...state, choosedLocation: choosedLocationTemp };
			});
		} else {
			setShelfDialogData(state => ({ ...state, choosedLocation: { ...state.choosedLocation, [key]: true } }));
		}
	};

	return (
		<Modal
			footer={false}
			width={1000}
			title={t("{{canvasRow}}排", { canvasRow: props.shelItem.canvasRow })}
			open={props.visible}
			onCancel={props.close}
		>
			<Card style={{ width: "100%" }} loading={shelfDialogData.loading} className="shelf-dialog-wrap">
				<ul className="shelf-wrap">
					{shelfDialogData.locationList.map((layer: Record<string, any>, layerIndex: number) => (
						<li>
							{layer.map((col: Record<string, any>, colIndex: number) => (
								<>
									{col && col.type === "col-info" ? (
										<span className="location-col" v-if="" style={{ visibility: colIndex > 0 ? "visible" : "hidden" }}>
											{shelfDialogData.locationList[1][colIndex].canvasColumn}
											{t("列")}
										</span>
									) : col && col.type === "layer-info" ? (
										<span className="location-layer" style={{ visibility: layerIndex > 0 ? "visible" : "hidden" }}>
											{layerIndex}
											{t("层")}
										</span>
									) : (
										<span
											className={[
												"location-item",
												col.type === "not-exist" ? "not-exist" : "",
												shelfDialogData.choosedLocation[layerIndex + "-" + colIndex] ? "active" : ""
											].join(" ")}
											style={{ background: locationStatus[col.state]?.color }}
											onClick={() => handleLocationClick(col, layerIndex, colIndex)}
										></span>
									)}
								</>
							))}
						</li>
					))}
				</ul>
				<LocationTable data={shelfDialogData.choosedLocationData} canvasType={props.shelItem.canvasType} />
			</Card>
		</Modal>
	);
}

export default ShelfDialog;
