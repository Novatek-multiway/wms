import "./index.less";
import PanelGroup from "./components/PanelGroup";
import RunTask from "./components/runTask";
import Quality from "./components/quality";
import WorkStation from "./components/workStation";
import { Col, Row } from "antd";
import TotalStorage from "./components/storage/totalStorage";
import AreaStorage from "./components/storage/areaStorage";
import TrendChart from "./components/trendChart";
const Dashboard = () => {
	return (
		<div className="app-container">
			<PanelGroup />
			<RunTask></RunTask>
			<TrendChart />
			<Row className=" mt-4 " gutter={16}>
				<Col span={7} sm={24} lg={7}>
					<Quality />
				</Col>
				<Col span={17} sm={24} lg={17}>
					<WorkStation />
				</Col>
			</Row>
			<Row className=" mt-4 " gutter={16}>
				<Col xs={24} lg={12} span={12}>
					<TotalStorage />
				</Col>
				<Col xs={24} lg={12} span={12}>
					<AreaStorage />
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
