import { FC, useEffect } from "react";
import RouterConfig from "@/router/index";
import { useStore } from "@/store/index";
import { observer } from "mobx-react-lite";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "@/store/tabStore";
import { store as tabsStore } from "@/store/systemTabs";
// 国际化配置
import { ConfigProvider } from "antd";
import "moment/locale/zh-cn";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import jaJP from "antd/lib/locale/ja_JP";
import koKR from "antd/lib/locale/ko_KR";

import { useTranslation } from "react-i18next";

const m = {
	en_US: enUS,
	zh_CN: zhCN,
	ja_JP: jaJP,
	ko_KR: koKR
};

const App: FC = () => {
	const { configStore } = useStore();
	const { t } = useTranslation();
	ConfigProvider.config({
		// ui主题配置
		theme: configStore.theme
	});
	useEffect(() => {
		document.title = t("home.Title");
	}, []);
	return (
		<ReduxProvider store={{ ...store, ...tabsStore }}>
			<PersistGate loading={null} persistor={persistor}>
				<ConfigProvider locale={m?.[configStore.locale] ?? koKR}>
					<RouterConfig />
				</ConfigProvider>
			</PersistGate>
		</ReduxProvider>
	);
};

export default observer(App);
