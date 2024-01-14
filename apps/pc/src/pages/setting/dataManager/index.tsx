import { useTranslation } from "react-i18next";
import { Tabs, Popconfirm, Button, Card, message } from "antd";
import type { TabsProps } from "antd";
import { WmsClearData } from "./services";

export default function Setting() {
	const { t } = useTranslation();
	const handleClear = async () => {
		try {
			await WmsClearData();
			message.success(t("清除成功！"));
		} catch (e) {
			message.error(t("清除成功！"));
		}
	};
	const items: TabsProps["items"] = [
		{
			key: "dataManagement",
			label: t("数据管理"),
			children: (
				<Popconfirm placement="topLeft" title={t("确认清除？")} okText={t("是")} cancelText={t("否")} onConfirm={handleClear}>
					<Button>{t("清除数据")}</Button>
				</Popconfirm>
			)
		}
	];

	return (
		<>
			<Card>
				<Tabs defaultActiveKey="dataManagement" items={items} tabPosition="left"></Tabs>
			</Card>
		</>
	);
}
