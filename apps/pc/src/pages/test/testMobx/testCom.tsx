import { useTranslation } from "react-i18next";
import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";

import { ThreeStoreContext } from "./store";
import { Card } from "antd";

interface IProps {}

function TestMobx() {
	const { t } = useTranslation();
	const store = useContext(ThreeStoreContext);
	return (
		<Card title={t("值组件")}>
			<h1>{t("这是组件Store值")}</h1>
			<div>TestMobx: {String(store.threeStore.visible)}</div>
		</Card>
	);
}

export default observer(TestMobx);
