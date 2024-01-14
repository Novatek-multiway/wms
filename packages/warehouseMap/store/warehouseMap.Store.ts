import { makeAutoObservable } from 'mobx';

export interface IlocationStatusItem {
  status: string;
  color: string;
}

export const allLocationStatus: Record<string, IlocationStatusItem> = {
  1: {
    status: '报警',
    color: '#DC143C',
  },
  2: {
    status: '取空异常',
    color: '#00BFFF',
  },
  3: {
    status: '占位异常',
    color: '#DB7093',
  },
  4: {
    status: '维修',
    color: '#DA70D6',
  },
  5: {
    status: '空库位入库锁定',
    color: '#D8BFD8',
  },
  6: {
    status: '满库位空托托盘出库锁定',
    color: '#DDA0DD',
  },
  7: {
    status: '满库位满托盘出库锁定',
    color: '#EE82EE',
  },
  8: {
    status: '满库位满托盘',
    color: '#800080',
  },
  9: {
    status: '满库位空托托盘',
    color: '#FF00FF',
  },
  10: {
    status: '空库位',
    color: '#fff',
  },
};

// 仓库配置
class WarehouseMapStore {
  constructor() {
    makeAutoObservable(this);
  }
  mapWidth = 1000;
  floorPadding = 100;
  floorDepth = 1;
  areaYaxis = this.floorDepth + 1;
  shelfYaxis = this.floorDepth + 1;
  shelfConfig = {
    binLength: 50, // 库位长度
    binWidth: 50, // 库位宽度
    binHeight: 55, // 库位高
    holderHeight: 2, // 托盘高度
    bottomHeight: 20, // 货架底层高度
    rackLength: 3, // 支架的长度
    rackWidth: 3, // 支架的宽度
    intervalRackNum: 4, //间隔多少库位有一个主支架
    shelfMatColor: 0x175ec0,
  };
  locationConfig = {
    length: 43, // 货位长度
    width: 46, // 货位宽度
    height: 50, // 货位高度
    locationStatus: allLocationStatus,
  };
  locationFilter: number[] = [];
  initConfigByLayout(baseWidth: number) {
    this.shelfConfig = {
      ...this.shelfConfig,
      binLength: Math.floor(baseWidth * 0.86),
      binWidth: Math.floor(baseWidth * 0.86),
      binHeight: baseWidth,
    };
    this.locationConfig = {
      ...this.locationConfig,
      length: Math.floor(baseWidth * 0.8),
      width: Math.floor(baseWidth * 0.8),
      height: Math.floor(baseWidth * 0.8),
    };
  }
  changeLocationFilter(select: number[]) {
    this.locationFilter = select;
  }
  initLocationStatus(data: Record<string, IlocationStatusItem>) {
    console.log('data=====>', data);
    this.locationConfig = {
      ...this.locationConfig,
      locationStatus: data,
    };
  }
}

export default WarehouseMapStore;
