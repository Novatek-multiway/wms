import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Card } from "antd";
import * as echarts from "echarts/core";
import { GetDailyWorkbenchTaskSummary } from "../../services";
import { useTranslation } from "react-i18next";

function geneOption(xData: string[], seriesData: Record<string, any>[]) {
	return {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
				textStyle: {
					color: "#fff"
				}
			}
		},
		grid: {
			borderWidth: 0,
			top: "5%",
			bottom: "15%",
			left: "5%",
			right: "3%",
			textStyle: {
				color: "#fff"
			}
		},
		calculable: true,
		xAxis: [
			{
				type: "category",
				axisLine: {
					lineStyle: {
						color: "rgba(193, 207, 220, 1)",
						width: 1
					}
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					interval: 0,
					textStyle: {
						color: "rgba(0, 0, 0, 0.72)",
						fontSize: 12
					}
				},
				splitLine: {
					show: false
				},
				splitArea: {
					show: false
				},
				data: xData
			}
		],

		yAxis: [
			{
				type: "value",
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: "rgba(0, 0, 0, 0.72)",
						fontSize: 12
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: "rgba(193, 207, 220, 1)",
						type: "dashed"
					}
				}
			}
		],

		series: seriesData
	};
}

const WorkStation = () => {
	const [loading, setLoading] = useState(false);
	const [option, setOption] = useState<any>(undefined);
	const { t } = useTranslation();
	useEffect(() => {
		initData();
	}, []);
	async function initData() {
		try {
			setLoading(true);
			const res = await GetDailyWorkbenchTaskSummary();
			const { resultData } = res;
			const xData: string[] = [];
			const fromTaskTotalList: number[] = [];
			const toTaskTotalList: number[] = [];
			resultData.forEach(item => {
				xData.push(item.workbenchName);
				fromTaskTotalList.push(item.fromTaskTotal);
				toTaskTotalList.push(item.toTaskTotal);
			});
			setOption(
				geneOption(xData, [
					{
						name: t("入库任务数"),
						type: "bar",
						data: fromTaskTotalList
					},
					{
						name: t("出库任务数"),
						type: "bar",
						data: toTaskTotalList
					}
				])
			);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}
	return (
		<Card title={t("home.Today_Workstation_Tasks")} className="" hoverable loading={loading}>
			{option && <ReactECharts className=" !h-40 w-full" option={option} />}
		</Card>
	);
};

export default WorkStation;
