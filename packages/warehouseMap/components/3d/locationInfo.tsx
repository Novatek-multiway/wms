import { useEffect, useState } from 'react';
import { Card } from 'antd';
// import { getLocationInfo } from "../services";
import { getApiCanvas3DGetLocationDetailById } from 'apis';
const locationStateHash: Record<string, string> = {
  1: '任务空闲',
  2: '入库锁定',
  3: '出库锁定',
  4: '取空异常',
  5: '占位异常',
  6: '维修',
};
const locationQualityHash: Record<string, string> = {
  1: '待检',
  2: '合格',
  3: '不合格',
};
const stockInTypeHash: Record<string, string> = {
  1: '自动生成入库任务',
  2: '等待信号触发',
  3: '等待人工添加搬运任务',
};

const positionTypeHash: Record<string, string> = {
  1: '库位',
  2: '工位',
  3: '车载位',
};

interface ILocationInfo {
  id: string;
}
function LocationInfo({ id }: ILocationInfo) {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<Record<string, any> | undefined>(undefined);
  useEffect(() => {
    initLocationInfo();
  }, []);
  async function initLocationInfo() {
    try {
      setLoading(true);
      const res = await getApiCanvas3DGetLocationDetailById({ id });
      setInfo(res.resultData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="location-info-wrap" loading={loading}>
      {info && (
        <>
          {!info.workbenchCode ? (
            <>
              <p>货位编号: {info.customCode}</p>
              <p>位置类型: {positionTypeHash?.[info.positionType] ?? ''}</p>
              <p>报警状态: {info.isAlarm ? '报警' : '无报警'}</p>
              <p>库位状态: {locationStateHash[info.locationStatus] || ''}</p>
              <p>空满状态: {info.isFull ? '满' : '空'}</p>
              <p>允许入库: {info.allowStockIn ? '✔' : '✖'}</p>
              <p>允许出库: {info.allowStockOut ? '✔' : '✖'}</p>
              <p>是否盘点中: {info.isStocktaking ? '✔' : '✖'}</p>
            </>
          ) : (
            <>
              <p>工作台编号: {info.workbenchCode}</p>
              <p>工作台名称: {info.workbenchName}</p>
              <p>容器编号: {info.containerCode}</p>
              <p>位置编号: {info.locationCode}</p>
              <p>入库模式: {stockInTypeHash[info.locationStatus] || ''}</p>
              <p>允许组盘: {info.allowCombine ? '允许' : '不允许'}</p>
            </>
          )}
          {info.inventoryList &&
            info.inventoryList.map((inventory: Record<string, any>) => (
              <ul className="inventory-list" key={inventory.materialCode}>
                <li>
                  <p>容器编号: {inventory.containerCode}</p>
                  <p>
                    物料编码: {inventory.materialCode}({inventory.materialName})
                  </p>
                  <p>物料规格: {inventory.materialSize}</p>
                  <p>批次号: {inventory.batchNumber}</p>
                  <p>质量状态: {locationQualityHash[inventory.qualityStatus] || '未知'}</p>
                  <p>库存数量: {inventory.currentQuantity}</p>
                  <p>有效期（天）: {inventory.expiresDays}</p>
                  <p>收货日期: {inventory.receivingDate}</p>
                </li>
              </ul>
            ))}
        </>
      )}
    </Card>
  );
}

export default LocationInfo;
