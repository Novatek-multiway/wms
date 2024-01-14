import { useTranslation } from "react-i18next";
import { Button, Card } from "antd";
import React, { useContext } from "react";
import { ThreeStoreContext } from "./store";

function Handle() {
	const { t } = useTranslation();
	const store = useContext(ThreeStoreContext);
	return (
		<Card title={t("操作组件")}>
			<h1></h1>
			<p>
				{t("不响应：")}
				{String(store.threeStore.visible)}
			</p>
			<Button onClick={() => store.threeStore.setVisible(true)}>true</Button>
			<Button onClick={() => store.threeStore.setVisible(false)}>false</Button>
		</Card>
	);
}

export default Handle;
