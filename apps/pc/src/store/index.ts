import React from "react";
import ConfigStore from "./config.Store";
import BasicStore from "./basic.Store";
import WarehouseMap from "./warehouseMap.Store";
import GoodsStore from "./goods.store";

class RootStore {
	public configStore: ConfigStore;
	public basicStore: BasicStore;
	public warehouseMap: WarehouseMap;
	public goodsStore: GoodsStore;

	constructor() {
		this.configStore = new ConfigStore();
		this.basicStore = new BasicStore();
		this.warehouseMap = new WarehouseMap();
		this.goodsStore = new GoodsStore();
	}
}

// 实例化根store
const context = React.createContext(new RootStore());
export const useStore = () => React.useContext(context);
