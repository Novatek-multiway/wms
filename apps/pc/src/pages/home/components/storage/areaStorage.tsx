import { useState, useEffect } from "react";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import { GetAreaLocationSummary } from "../../services";
import StoragePie from "./storagePie";

interface IStorageData {
	locationTotal: number;
	emptyLocationTotal: number;
	emptyLocationRatio: number;
	fullContainerLocationTotal: number;
	fullContainerLocationRatio: number;
	emptyContainerLocationTotal: number;
	emptyContainerLocationRatio: number;
}

function AreaStorage() {
	const [loading, setLoading] = useState(false);
	const [tab, setTab] = useState<any>([]);
	const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
	const [storageData, setStorageData] = useState<Record<string, IStorageData> | undefined>(undefined);
	const { t } = useTranslation();
	useEffect(() => {
		initData();
	}, []);
	async function initData() {
		try {
			setLoading(true);
			const res = await GetAreaLocationSummary();
			const { resultData } = res;
			const tabList: Record<string, string>[] = [];
			const storageData: Record<string, IStorageData> = {};
			resultData.forEach(item => {
				tabList.push({ key: item.areaId, tab: `${item.areaCode}(${item.areaName})` });
				storageData[item.areaId] = { ...item };
			});
			setTab(tabList);
			setActiveTab(tabList[0].key);
			setStorageData(storageData);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
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
			{activeTab && storageData && <StoragePie title={t("区域库容")} data={storageData[activeTab!]} />}
		</Card>
	);
}

export default AreaStorage;
