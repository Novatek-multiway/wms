import { useTranslation } from "react-i18next";
import React from "react";
import ReactECharts from "echarts-for-react";

interface IOnOffChart {
	xAxisData: string[];
	seriesData: ISeriesItem[];
}
interface ISeriesItem {
	name: string;
	data: number[];
	color?: any;
}

const xAxisColor = ["#5ab1ef", "#019680"];
const yAxisColor = ["rgba(255,255,255,0.2)", "rgba(226,226,226,0.2)"];

const OnOffChart = ({ xAxisData, seriesData }: IOnOffChart) => {
	const { t } = useTranslation();
	const option = {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				lineStyle: {
					width: 1,
					color: "#019680"
				}
			}
		},
		legend: {
			data: seriesData?.map(item => item.name) || [t("入库物料总数"), t("出库物料总数")]
		},
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: xAxisData,
			splitLine: {
				show: true,
				lineStyle: {
					width: 1,
					type: "solid",
					color: "rgba(226,226,226,0.5)"
				}
			},
			axisTick: {
				show: false
			}
		},
		yAxis: [
			{
				type: "value",
				splitArea: {
					show: true,
					areaStyle: {
						color: yAxisColor
					}
				}
			}
		],

		grid: { left: "1%", right: "1%", top: "10%", bottom: 0, containLabel: true },
		series: seriesData?.map((item, index) => ({
			name: item.name,
			smooth: true,
			data: item.data,
			type: "line",
			areaStyle: {},
			itemStyle: {
				color: item.color || xAxisColor[index]
			}
		}))
	};

	return <ReactECharts className=" !h-full " option={option} notMerge={true} />;
};

export default OnOffChart;
