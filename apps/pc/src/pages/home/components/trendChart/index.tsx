import { useState, useEffect } from "react";
import { Card } from "antd";
import { GetReportInventoryDailyInOutList, GetReportLocationDailyList } from "../../services";
import OnOffChart from "../onOffChart";
import { useTranslation } from "react-i18next";

function TrendChart() {
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState<string>("app");
	const [trendData, SetTrendData] = useState<any>(undefined);
	const { t } = useTranslation(); // 国际化
	const tab = [
		{
			key: "app",
			tab: t("home.Monthly_chart")
		},
		{
			key: "project",
			tab: t("home.Monthly_storage_chart")
		}
	];

	useEffect(() => {
		initData();
	}, []);
	async function initData() {
		try {
			setLoading(true);
			const appData = await GetReportInventoryDailyInOutList({
				reportDateFrom: getFirstDay(),
				reportDateTo: getLastDay()
			});
			const projectData = await GetReportLocationDailyList({ reportDateFrom: getFirstDay(), reportDateTo: getLastDay() });

			const data = {
				app: {
					xAxisData: appData.resultData.map(item => item.reportDate.split(" ")[0]),
					seriesData: [
						{
							name: t("home.Total_number_storage"),
							data: appData.resultData.map(item => item.inTotal)
						},
						{
							name: t("home.Total_number_warehouse"),
							data: appData.resultData.map(item => item.outTotal)
						}
					]
				},
				project: {
					xAxisData: projectData.resultData.map(item => item.reportDate.split(" ")[0]),
					seriesData: [
						{
							name: t("空库位总数"),
							data: projectData.resultData.map(item => item.emptyLocationTotal)
						},
						{
							name: t("放空容器的库位总数"),
							data: projectData.resultData.map(item => item.emptyContainerLocationTotal)
						},
						{
							name: t("放物料的库位总数"),
							data: projectData.resultData.map(item => item.fullContainerLocationTotal)
						}
					]
				}
			};
			SetTrendData(data);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}
	function getFirstDay() {
		const y = new Date().getFullYear(); //获取年份
		let m: string | number = new Date().getMonth() + 1; //获取月份
		m = m < 10 ? "0" + m : m; //月份补 0
		return `${y}-${m}-01`;
	}
	function getLastDay() {
		const y = new Date().getFullYear(); //获取年份
		let m: string | number = new Date().getMonth() + 1; //获取月份
		let d: string | number = new Date(y, m, 0).getDate(); //获取当月最后一日
		m = m < 10 ? "0" + m : m; //月份补 0
		d = d < 10 ? "0" + d : d; //日数补 0
		return `${y}-${m}-${d}`;
	}
	return (
		<Card
			loading={loading}
			className=" !h-55"
			hoverable
			style={{ width: "100%" }}
			tabList={tab}
			activeTabKey={activeTab}
			onTabChange={key => {
				setActiveTab(key);
			}}
		>
			{activeTab && trendData && (
				<OnOffChart xAxisData={trendData[activeTab!].xAxisData} seriesData={trendData[activeTab!].seriesData} />
			)}
		</Card>
	);
}

export default TrendChart;
