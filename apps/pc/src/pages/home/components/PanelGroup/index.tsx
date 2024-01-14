import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import CountUp from "react-countup";
import { IconFont } from "@/components/Icon";
import "./index.less";
import { GetCurrentInventorySummary } from "../../services";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const chartList = [
	{
		type: t("home.Current_number_tasks"),
		icon: "wms-renwu",
		key: "taskTotal",
		color: "#40c9c6"
	},
	{
		type: t("home.Full_pallet_quantity"),
		icon: "wms-tuopantray17",
		key: "fullContainerTotal",
		color: "#36a3f7"
	},
	{
		type: t("home.Number_empty_pallets"),
		icon: "wms-tuopantray17",
		key: "emptyContainerTotal",
		color: "#f4516c"
	},
	{
		type: t("home.Number_alarms_today"),
		icon: "wms-weiwangguanicon-defuben-",
		key: "", // TODO
		color: "#f6ab40"
	}
];

interface IPanelGroupData {
	taskTotal: number;
	fullContainerTotal: number;
	emptyContainerTotal: number;
}

type PanelGroupType = keyof IPanelGroupData;

const PanelGroup = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [pannelGroupData, setPannelGroupData] = useState<IPanelGroupData | undefined>(undefined);
	useEffect(() => {
		initData();
	}, []);
	async function initData() {
		try {
			setLoading(true);
			const res = await GetCurrentInventorySummary();
			setPannelGroupData({ ...res.resultData });
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}
	return (
		<div className="panel-group-container">
			<Row gutter={40} className="panel-group">
				{chartList.map((chart, i) => (
					<Col key={i} lg={6} sm={12} xs={12} className="card-panel-col">
						<div className="card-panel">
							<div className="card-panel-icon-wrapper">
								<IconFont style={{ fontSize: 55, color: chart.color }} type={chart.icon}></IconFont>
								{/* <Icon className={chart.type} style={{ fontSize: 55, color: chart.color }} type={chart.icon} /> */}
							</div>
							<div className="card-panel-description">
								<p className="card-panel-text">{chart.type}</p>
								<CountUp
									end={(pannelGroupData && pannelGroupData[chart.key as PanelGroupType]) || chart.num}
									start={0}
									className="card-panel-num"
								/>
							</div>
						</div>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default PanelGroup;
