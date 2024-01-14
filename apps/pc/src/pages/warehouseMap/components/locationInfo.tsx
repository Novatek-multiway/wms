import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Card } from "antd";
import { getLocationInfo } from "../services";
const locationStateHash: Record<string, string> = {
	1: t("任务空闲"),
	2: t("入库锁定"),
	3: t("出库锁定"),
	4: t("取空异常"),
	5: t("占位异常"),
	6: t("维修")
};
const locationQualityHash: Record<string, string> = {
	1: t("待检"),
	2: t("合格"),
	3: t("不合格")
};
const stockInTypeHash: Record<string, string> = {
	1: t("自动生成入库任务"),
	2: t("等待信号触发"),
	3: t("等待人工添加搬运任务")
};

const positionTypeHash: Record<string, string> = {
	1: t("库位"),
	2: t("工位"),
	3: t("车载位")
};

interface ILocationInfo {
	id: string;
}
function LocationInfo({ id }: ILocationInfo) {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [info, setInfo] = useState<Record<string, any> | undefined>(undefined);
	useEffect(() => {
		initLocationInfo();
	}, []);
	async function initLocationInfo() {
		try {
			setLoading(true);
			const res = await getLocationInfo(id);
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
							<p>
								{t("货位编号")}：
								{info.customCode}
							</p>
							<p>
								{t("位置类型")}：
								{positionTypeHash?.[info.positionType] ?? ""}
							</p>
							<p>
								{t("报警状态")}：
								{info.isAlarm ? t("报警") : t("无报警")}
							</p>
							<p>
								{t("库位状态")}：
								{locationStateHash[info.locationStatus] || ""}
							</p>
							<p>
								{t("空满状态")}：
								{info.isFull ? t("满") : t("空")}
							</p>
							<p>
								{t("允许入库")}：
								{info.allowStockIn ? "✔" : "✖"}
							</p>
							<p>
								{t("允许出库")}：
								{info.allowStockOut ? "✔" : "✖"}
							</p>
							<p>
								{t("是否盘点中")}：
								{info.isStocktaking ? "✔" : "✖"}
							</p>
						</>
					) : (
						<>
							<p>
								{t("工作台编号")}：
								{info.workbenchCode}
							</p>
							<p>
								{t("工作台名称")}：
								{info.workbenchName}
							</p>
							<p>
								{t("容器编号")}：
								{info.containerCode}
							</p>
							<p>
								{t("位置编号")}：
								{info.locationCode}
							</p>
							<p>
								{t("入库模式")}：
								{stockInTypeHash[info.locationStatus] || ""}
							</p>
							<p>
								{t("允许组盘")}：
								{info.allowCombine ? t("允许") : t("不允许")}
							</p>
						</>
					)}

					{info.inventoryList &&
						info.inventoryList.map((inventory: Record<string, any>) => (
							<ul className="inventory-list" key={inventory.materialCode + inventory.containerCode}>
								<li>
									<p>
										{t("容器编号")}：
										{inventory.containerCode}
									</p>
									<p>
										{t("物料编码")}：
										{inventory.materialCode}({inventory.materialName})
									</p>
									<p>
										{t("物料规格")}：
										{inventory.materialSize}
									</p>
									<p>
										{t("批次号")}：
										{inventory.batchNumber}
									</p>
									<p>
										{t("质量状态")}：
										{locationQualityHash[inventory.qualityStatus] || t("未知")}
									</p>
									<p>
										{t("库存数量")}：
										{inventory.currentQuantity}
									</p>
									<p>
										{t("有效期（天）")}：
										{inventory.expiresDays}
									</p>
									<p>
										{t("收货日期")}：
										{inventory.receivingDate}
									</p>
								</li>
							</ul>
						))}
				</>
			)}
		</Card>
	);
}

export default LocationInfo;
