import React from "react";
import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next";

interface IStorage {
	title?: string;
	data: IStorageData;
}
interface IStorageData {
	locationTotal: number;
	emptyLocationTotal: number;
	emptyLocationRatio: number;
	fullContainerLocationTotal: number;
	fullContainerLocationRatio: number;
	emptyContainerLocationTotal: number;
	emptyContainerLocationRatio: number;
}

const Storage = ({ data }: IStorage) => {
	const { t } = useTranslation();
	const option = {
		title: {
			left: "center"
		},
		tooltip: {
			trigger: "item"
		},
		legend: {
			orient: "vertical",
			left: "left"
		},
		series: [
			{
				name: t("总库容"),
				type: "pie",
				radius: ["40%", "70%"],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: "#fff",
					borderWidth: 2
				},
				label: {
					show: false,
					position: "center"
				},
				emphasis: {
					label: {
						show: false,
						fontSize: 20,
						fontWeight: "bold"
					}
				},
				labelLine: {
					show: true
				},
				data: [
					{ value: data.emptyLocationTotal, name: t("home.Number_empty_slots") + data.emptyLocationRatio + "%" },
					{ value: data.fullContainerLocationTotal, name: t("home.Number_full_pallets") + data.fullContainerLocationRatio + "%" },
					{
						value: data.emptyContainerLocationTotal,
						name: t("home.Number_empty_cargo_space") + data.emptyContainerLocationRatio + "%"
					}
				]
			}
		]
	};
	return <ReactECharts option={option} />;
};

export default Storage;
