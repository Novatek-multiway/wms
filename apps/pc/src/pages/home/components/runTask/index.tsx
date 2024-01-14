import React, { useState, useEffect } from "react";
import { Card } from "antd";
import "./style/index.less";
import CountUp from "react-countup";
import { GetDailyTaskSummary } from "../../services";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store";
interface IRunTaskData {
	inTotal: number;
	outTotal: number;
	crossTotal: number;
	moveTotal: number;
	cancelTotal: number;
}

const RunTask = () => {
	const { t } = useTranslation(); // 国际化
	const [loading, setLoading] = useState(false);
	const [runTaskData, setRunTaskData] = useState<IRunTaskData | undefined>(undefined);
	useEffect(() => {
		initData();
	}, []);
	async function initData() {
		try {
			setLoading(true);
			const res = await GetDailyTaskSummary();
			setRunTaskData({ ...res.resultData });
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}
	const { configStore } = useStore();
	return (
		<Card title={t("home.Today_task_data")} className="!mb-4" hoverable loading={loading}>
			<div className=" flex ">
				<div className="row">
					<div className="title">{t("home.Storage_task")}</div>
					<div className="sub" style={{ color: configStore.theme.primaryColor }}>
						<CountUp end={runTaskData?.inTotal || 0} start={0} className="card-panel-num" />
					</div>
				</div>
				<div className="row">
					<div className="title">{t("home.Outbound_task")}</div>
					<div className="sub">
						<CountUp end={runTaskData?.outTotal || 0} start={0} className="card-panel-num" />
					</div>
				</div>
				<div className="row">
					<div className="title">{t("home.Cross_docking_tasks")}</div>
					<div className="sub">
						<CountUp end={runTaskData?.crossTotal || 0} start={0} className="card-panel-num" />
					</div>
				</div>
				<div className="row">
					<div className="title">{t("home.Transfer_task")}</div>
					<div className="sub">
						<CountUp end={runTaskData?.moveTotal || 0} start={0} className="card-panel-num" />
					</div>
				</div>
				<div className="row">
					<div className="title">{t("home.Cancel_task")}</div>
					<div className="sub">
						<CountUp end={runTaskData?.cancelTotal || 0} start={0} className="card-panel-num" />
					</div>
				</div>
			</div>
		</Card>
	);
};
export default RunTask;
