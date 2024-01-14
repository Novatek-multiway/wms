import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetCurrentInventoryQualitySummary } from '../../services';

function geneOption(lengendData: string[], seriesData: Record<string, any>[]) {
	return {
		tooltip: {
			trigger: "item"
		},
		color: ["#06CDCE", "#3B6AEE", "#FFD50C"],
		legend: {
			right: "0",
			top: "middle",
			data: lengendData,
			orient: "vertical",
			itemGap: 20,
			itemWidth: 26,
			itemHeight: 4,
			textStyle: {
				color: "#000"
			}
		},
		series: [
			{
				name: t("质量数据"),
				type: "pie",
				radius: "80%",
				labelLine: {
					show: false
				},
				center: ["25%", "50%"],
				label: {
					show: false
				},
				data: seriesData,
				itemStyle: {
					normal: {
						borderWidth: 3,
						borderColor: "#1A1C25"
					}
				}
			}
		]
	};
}
const Quality = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [option, setPption] = useState<any>(undefined);
	useEffect(() => {
		initData();
	}, []);
	async function initData() {
		try {
			setLoading(true);
			const res = await GetCurrentInventoryQualitySummary();
			const { resultData } = res;
			const lengendData = [
				`${t("home.Total_Goods")} ${resultData?.qualifiedRatio}%`,
				`${t("home.Total_defective_products")} ${resultData?.unqualifiedRatio}%`,
				`${t("home.Total_pending_inspection")} ${resultData?.unCheckedRatio}%`
			];

			const seriesData = [
				{ value: resultData?.qualifiedTotal, name: lengendData[0] },
				{ value: resultData?.unqualifiedTotal, name: lengendData[1] },
				{ value: resultData?.unCheckedTotal, name: lengendData[2] }
			];

			setPption(geneOption(lengendData, seriesData));
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}
	return (
		<Card title={t("home.Current_Quality_Data")} className="" hoverable loading={loading}>
			{option && <ReactECharts className=" !h-40" option={option} />}
		</Card>
	);
};

export default Quality;
