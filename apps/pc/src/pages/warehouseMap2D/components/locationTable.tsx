import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Table } from "antd";
import { CanvasAreaType } from "../index";

interface Iprops {
	data: Record<string, any>[];
	canvasType: CanvasAreaType;
}

const locationStateHash = {
	1: t("任务空闲"),
	2: t("入库锁定"),
	3: t("出库锁定"),
	4: t("取空异常"),
	5: t("占位异常"),
	6: t("维修")
};
const locationQualityHash = {
	1: t("待检"),
	2: t("合格"),
	3: t("不合格")
};
const stockInTypeHash = {
	1: t("自动生成入库任务"),
	2: t("等待信号触发"),
	3: t("等待人工添加搬运任务")
};

const stationColumns = [
	{
		title: t("工作台编号"),
		dataIndex: "workbenchCode",
		key: "workbenchCode"
	},
	{
		title: t("工作台名称"),
		dataIndex: "workbenchName",
		key: "workbenchName"
	},
	{
		title: t("容器编号"),
		dataIndex: "containerCode",
		key: "containerCode"
	},
	{
		title: t("位置编号"),
		dataIndex: "locationCode",
		key: "locationCode"
	},
	{
		title: t("入库模式"),
		dataIndex: "stockInType",
		render: (text, row, index) => {
			return stockInTypeHash[text] || "-";
		},
		width: 190
	},
	{
		title: t("允许组盘"),
		dataIndex: "allowCombine",
		render: (text, row, index) => {
			return text ? t("允许") : t("不允许");
		}
	},
	{
		title: t("堆叠数量"),
		dataIndex: "emptyContainerCount",
		key: "emptyContainerCount",
		width: 160
	}
];

const shelfColumns = [
	{
		title: t("货位编号"),
		dataIndex: "locationCode",
		key: "locationCode",
		width: 200
	},
	{
		title: t("容器编号"),
		dataIndex: "containerCode",
		key: "containerCode",
		width: 160
	},
	{
		title: t("排-列-层"),
		dataIndex: "canvasRow",
		key: "canvasRow",
		render: (text, row, index) => {
			return row.canvasRow + "-" + row.canvasColumn + "-" + row.locationLayer;
		}
	},
	{
		title: t("报警状态"),
		dataIndex: "isAlarm",
		render: (text, row, index) => {
			return text ? t("报警") : t("正常");
		}
	},
	{
		title: t("库位状态"),
		dataIndex: "locationStatus",
		render: (text, row, index) => {
			return locationStateHash[text] || "";
		}
	},
	{
		title: t("货位类型"),
		width: 100,
		dataIndex: "locationTypeName",
		key: "locationTypeName"
	},
	{
		title: t("空满状态"),
		dataIndex: "isFull",
		width: 100,
		render: (text, row, index) => {
			return text ? t("满") : t("空");
		}
	},
	{
		title: t("允许组盘"),
		width: 100,
		dataIndex: "allowCombine",
		render: (text, row, index) => {
			return text ? t("允许") : t("不允许");
		}
	},
	{
		title: t("允许入库"),
		dataIndex: "allowStockIn",
		width: 100,
		render: (text, row, index) => {
			return text ? t("允许") : t("不允许");
		}
	},
	{
		title: t("允许出库"),
		dataIndex: "allowStockOut",
		width: 100,
		render: (text, row, index) => {
			return text ? t("允许") : t("不允许");
		}
	},
	{
		title: t("是否盘点中"),
		dataIndex: "isStocktaking",
		width: 150,
		render: (text, row, index) => {
			return text ? t("盘点中") : t("未盘点");
		}
	},
	{
		title: t("堆叠数量"),
		dataIndex: "emptyContainerCount",
		key: "emptyContainerCount",
		width: 160
	}
];

const innerColumns = [
	{
		title: t("物料编码"),
		dataIndex: "materialCode",
		key: "materialCode"
	},
	{
		title: t("物料名称"),
		dataIndex: "materialName",
		key: "materialName"
	},
	{
		title: t("批次号"),
		dataIndex: "batchNumber",
		key: "batchNumber"
	},
	{
		title: t("物料型号"),
		dataIndex: "materialModelName",
		key: "materialModelName"
	},
	{
		title: t("规格"),
		dataIndex: "materialSize",
		key: "materialSize"
	},
	{
		title: t("质量状态"),
		dataIndex: "qualityStatus",
		render: (text, row, index) => {
			return locationQualityHash[text] || t("未知");
		}
	},
	{
		title: t("库存数量"),
		dataIndex: "currentQuantity",
		key: "currentQuantity"
	},
	{
		title: t("有效期（天）"),
		dataIndex: "expiresDays",
		key: "expiresDays"
	}
];

function LocationTable(props: Iprops) {
	const getInnerTable = (record: Record<string, any>) => <Table columns={innerColumns} dataSource={record.inventoryList} />;

	return (
		<Table
			scroll={{ x: 1500 }}
			columns={props.canvasType === 3 ? stationColumns : shelfColumns}
			expandable={{
				expandedRowRender: getInnerTable,
				rowExpandable: record => record.inventoryList && record.inventoryList.length
			}}
			dataSource={props.data.filter(item => item)}
		/>
	);
}

export default LocationTable;
