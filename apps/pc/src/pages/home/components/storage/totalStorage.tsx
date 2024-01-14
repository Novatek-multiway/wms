import { useState, useEffect } from "react";
import { Card } from "antd";
import { GetCurrentLocationSummary } from "../../services";
import StoragePie from "./storagePie";
import { useTranslation } from "react-i18next";

interface IStorageData {
	locationTotal: number;
	emptyLocationTotal: number;
	emptyLocationRatio: number;
	fullContainerLocationTotal: number;
	fullContainerLocationRatio: number;
	emptyContainerLocationTotal: number;
	emptyContainerLocationRatio: number;
}
function TotalStorage() {
	const [loading, setLoading] = useState(false);
	const [storageData, setStorageData] = useState<IStorageData | undefined>(undefined);
	const { t } = useTranslation();
	useEffect(() => {
		initData();
	}, []);
	async function initData() {
		try {
			setLoading(true);
			const res = await GetCurrentLocationSummary();
			const { resultData } = res;
			setStorageData({ ...resultData });
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}
	return (
		<Card title={t("home.Total_storage_capacity")} className="" hoverable loading={loading}>
			{storageData && <StoragePie title={t("home.Total_storage_capacity")} data={storageData} />}
		</Card>
	);
}

export default TotalStorage;
