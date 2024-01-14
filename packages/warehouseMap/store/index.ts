import React from 'react';
import WarehouseMap from './warehouseMap.Store';

class RootStore {
  public warehouseMap: WarehouseMap;

  constructor() {
    this.warehouseMap = new WarehouseMap();
  }
}

// 实例化根store
const context = React.createContext(new RootStore());
export const useStore = () => React.useContext(context);
