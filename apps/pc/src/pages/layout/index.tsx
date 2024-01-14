import React, { useState, Suspense, useEffect, Component, useRef } from "react";
import { Outlet, useNavigate, useLocation, useOutlet } from "react-router-dom";
import { useStore } from "@/store/index";
import { observer } from "mobx-react-lite";
import { Layout, Drawer } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SiderMenu from "./sider/index";
import HeaderNav from "./header/index";
import Tabs from "./components/Tabs";
import logoMini from "@/assets/imgs/logo.png";
import { useTranslation } from "react-i18next";

import { fetchDictApi } from "@/http";

import { getKeyName, isAuthorized } from "@/assets/js/publicFunc";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { selectCollapsed, selectMenuMode, setReducerCollapsed } from "@/store/slicers/appSlice";

import { useWebSocket } from "ahooks";
import { KeepAlive } from "react-activation";
import "@/multiway/config.tsx";
import "./index.module.less";

const { Header, Content, Sider } = Layout;

import "@/multiway";
import TabPanes from "@/components/tabPanes";
import { getToken } from "@/utils/token";

const noNewTab = ["/login"]; // 不需要新建 tab的页面

const CLIENT = 'pc'
const timer = new Date().getTime();

interface PanesItemProps {
	title: string;
	content: Component;
	key: string;
	closable: boolean;
	path: string;
}
function LayoutConfig() {
	const { configStore } = useStore();
	const token = getToken('AuthenticationToken');
	const { pathname, search } = useLocation();
	const pathRef: RefType = useRef<string>("");
	const outlet = useOutlet();
	const uri = pathname + search;
	const { t } = useTranslation(); // 国际化
	const [panesItem, setPanesItem] = useState<PanesItemProps>({
		title: "",
		content: null,
		key: "",
		closable: false,
		path: ""
	});
	const [tabActiveKey, setTabActiveKey] = useState<string>("home");
	const navigate = useNavigate(); // 路由跳转
	const dispatch = useAppDispatch();
	const [collapsed, setCollapsed] = useState(false); // 菜单栏收起状态
	const [visible, setVisible] = useState(false); // Drawer状态
	const [width, setWidth] = useState(window.innerWidth); // 窗口宽度
	const { webSocketIns, readyState } = useWebSocket(`ws://120.79.8.215:7228/notify?client=${CLIENT}&key=${timer}`);
	const toggle = () => {
		if (width > 650) setCollapsed(!collapsed);
		configStore.setCollapsed(String(!collapsed));
		setVisible(true);
	};

	// 关闭drawer
	const onClose = () => {
		setVisible(false);
	};

	// 返回首页
	const backHome = () => {
		configStore.crumbItem();
		navigate("/", { replace: true });
	};

	// 获取窗口宽度
	window.onresize = () => {
		setWidth(window.innerWidth);
	};
	useEffect(() => {
		width < 650 ? setCollapsed(true) : setCollapsed(false);
	}, [width]);

	const getDict = async () => {
		if (configStore.dictList) return;
		const res = await fetchDictApi("");
		if (res.code === 200) {
			const dictList = res.data;

			configStore.setDicts(dictList);
		}
	};

	//处理tab
	useEffect(() => {
		if (!collapsed) {
			// 已折叠时,不修改为折叠. 小屏幕依然根据窗体宽度自动折叠.
			dispatch(setReducerCollapsed(document.body.clientWidth <= 1366));
		}

		// 未登录
		if (!token && pathname !== "/login") {
			navigate({ pathname: "/login" });
			return;
		}

		const { tabKey, title, component: Content } = getKeyName(pathname);
		// 新tab已存在或不需要新建tab，return
		if (pathname === pathRef.current || noNewTab.includes(pathname)) {
			setTabActiveKey(tabKey);
			return;
		}

		// 记录新的路径，用于下次更新比较
		const newPath = search ? pathname + search : pathname;
		pathRef.current = newPath;
		setPanesItem({
			title: t(title),
			content: Content,
			key: tabKey,
			closable: tabKey !== "home",
			path: newPath
		});
		setTabActiveKey(tabKey);
	}, [history, pathname, search, token, dispatch, collapsed]);

	/**
	 * 监听地址变化改变菜单选中
	 */
	useEffect(() => {
		const { tabKey, title } = getKeyName(pathname);
		configStore.switchMenuItem({ key: tabKey, label: t(title), isParent: true });
	}, [pathname]);

	useEffect(() => {
		if (readyState === 1) {
			configStore.setWebSocketIns(webSocketIns!);
		}
	}, [readyState]);

	return (
		<Layout className="h-full select-none">
			{/* 侧边栏适配移动端 */}
			{width < 650 ? (
				<Drawer placement="left" width="80%" open={visible} onClose={onClose} closable={false} bodyStyle={{ padding: 0 }}>
					<Sider collapsedWidth={0} theme={configStore.themeStyle} trigger={null} className="cs-aside !w-full h-full !max-w-none">
						<SiderMenu setVisible={setVisible} />
					</Sider>
				</Drawer>
			) : (
				<Sider
					width="230"
					theme={configStore.themeStyle}
					trigger={null}
					collapsible
					collapsed={collapsed}
					className="cs-aside"
					style={{ overflow: "auto" }}
				>
					<SiderMenu collapsed={collapsed} />
				</Sider>
			)}
			<Layout>
				<Header className="flex items-center shadow-box !p-0 !text-white ">
					{width < 650 ? (
						<span className="w-24 h-full text-center cursor-pointer px-5 py-2" onClick={backHome}>
							<img className="w-full h-full" src={logoMini} alt="" />
						</span>
					) : (
						""
					)}
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className:
							"!flex items-center h-full py-0 px-6 cursor-pointer transition-color duration-300 text-gray-500 mr-2.5 text-base hover:bg-gray-100",
						onClick: toggle
					})}
					<HeaderNav width={width} />
				</Header>

				<Content
					style={{
						margin: width < 650 ? 4 : 16,
						minHeight: 280,
						overflow: "auto",
						position: "relative"
					}}
				>
					{/* {configStore.multyTab && <Tabs />}
					<Suspense>
						{configStore.multyTab ? (
							<KeepAlive id={uri} name={uri}>
								{ outlet }
							</KeepAlive>
						) : (
							<Outlet />
						)}
					</Suspense> */}
					<Suspense>
						<Outlet />
					</Suspense>
				</Content>
			</Layout>
		</Layout>
	);
}

export default observer(LayoutConfig);
