import { Alert, Dropdown, Menu, Tabs } from 'antd';
import { t } from 'i18next';
import React, { Component, FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { getKeyName, getRoute, isAuthorized } from '@/assets/js/publicFunc';
import Home from '@/pages/home';
import { useStore } from '@/store/index';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import { selectReloadPath, selectTabs, setReloadPath, setTabs } from '@/store/slicers/tabSlice';
import { SyncOutlined } from '@ant-design/icons';
import Loading from '../loading';
import style from './TabPanes.module.less';

const { TabPane } = Tabs;

const initPane = [
	{
		title: t("首页"),
		key: "home",
		content: Home,
		closable: false,
		path: "/"
	}
];

interface Props {
	defaultActiveKey: string;
	panesItem: {
		title: string;
		content: Component;
		key: string;
		closable: boolean;
		path: string;
	};
	tabActiveKey: string;
}

// 多页签组件
const TabPanes: FC<Props> = props => {
	const { configStore } = useStore();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const reloadPath = useAppSelector(selectReloadPath);
	const curTab = useAppSelector(selectTabs);
	const [activeKey, setActiveKey] = useState<string>("");
	const [panes, setPanes] = useState<CommonObjectType[]>(initPane);
	const [isReload, setIsReload] = useState<boolean>(false);
	const [selectedPanel, setSelectedPanel] = useState<CommonObjectType>({});
	const pathRef: RefType = useRef<string>("");

	const { defaultActiveKey, panesItem, tabActiveKey } = props;

	// const history = useHistory();
	const navigate = useNavigate();
	const { pathname, search } = useLocation();

	const fullPath = pathname + search;

	// 记录当前打开的tab
	const storeTabs = useCallback(
		(ps): void => {
			const pathArr = ps.map(item => item.path);
			dispatch(setTabs(pathArr));
		},
		[dispatch]
	);

	// // 从本地存储中恢复已打开的tab列表
	// const resetTabs = useCallback((): void => {
	// 	const initPanes = curTab.reduce((prev: CommonObjectType[], next: string) => {
	// 		const { title, tabKey, component: Content } = getKeyName(next);
	// 		return [
	// 			...prev,
	// 			{
	// 				title,
	// 				key: tabKey,
	// 				content: Content,
	// 				closable: tabKey !== "home",
	// 				path: next
	// 			}
	// 		];
	// 	}, []);
	// 	const { tabKey } = getKeyName(pathname);
	// 	setPanes(initPanes);
	// 	setActiveKey(tabKey);
	// }, [curTab, pathname]);

	// // 初始化页面
	// useEffect(() => {
	// 	resetTabs();
	// }, [resetTabs]);

	// tab切换
	const onChange = (tabKey: string): void => {
		setActiveKey(tabKey);
	};

	// 移除tab
	const remove = (targetKey: string): void => {
		const delIndex = panes.findIndex((item: CommonObjectType) => item.key === targetKey);
		panes.splice(delIndex, 1);
		// 删除非当前tab
		if (targetKey !== activeKey) {
			const nextKey = activeKey;
			setPanes(panes);
			setActiveKey(nextKey);
			storeTabs(panes);
			return;
		}
		// 删除当前tab，地址往前推
		const nextPath = curTab[delIndex - 1];
		const { tabKey, title } = getKeyName(nextPath);
		// 如果当前tab关闭后，上一个tab无权限，就一起关掉
		// if (!isAuthorized(tabKey) && nextPath !== "/") {
		// if (nextPath !== "/") {
		// 	remove(tabKey);
		// 	navigate(curTab[delIndex - 2]);
		// } else {
		// 	navigate(nextPath);
		// }
		configStore.switchMenuItem({ key: tabKey, label: t(title) });
		navigate(nextPath);
		setPanes(panes);
		storeTabs(panes);
	};

	// tab新增删除操作
	const onEdit = (targetKey: string | any, action: string) => action === "remove" && remove(targetKey);

	// tab点击
	const onTabClick = (targetKey: string): void => {
		const { path } = panes.filter((item: CommonObjectType) => item.key === targetKey)[0];
		const { key, title } = getRoute(targetKey);
		configStore.switchMenuItem({ key, label: t(title) });
		// TODO 可能会有问题
		navigate(path);
	};

	// 刷新当前 tab
	const refreshTab = (): void => {
		setIsReload(true);
		setTimeout(() => {
			setIsReload(false);
		}, 1000);

		dispatch(setReloadPath(pathname + search));
		setTimeout(() => {
			dispatch(setReloadPath("null"));
		}, 500);
	};

	// 关闭其他或关闭所有
	const removeAll = async (isCloseAll?: boolean) => {
		const { path, key } = selectedPanel;
		navigate(isCloseAll ? "/" : path);

		const homePanel = [
			{
				title: t("首页"),
				key: "home",
				content: Home,
				closable: false,
				path: "/"
			}
		];

		const nowPanes = key !== "home" && !isCloseAll ? [...homePanel, selectedPanel] : homePanel;
		setPanes(nowPanes);
		setActiveKey(isCloseAll ? "home" : key);
		storeTabs(nowPanes);
	};

	useEffect(() => {
		const newPath = pathname + search;
		// 当前的路由和上一次的一样，return
		if (!panesItem.path || panesItem.path === pathRef.current) return;

		// 保存这次的路由地址
		pathRef.current = newPath;

		const index = panes.findIndex((_: CommonObjectType) => _.key === panesItem.key);
		// 无效的新tab，return
		if (!panesItem.key || (index > -1 && newPath === panes[index].path)) {
			setActiveKey(tabActiveKey);
			return;
		}

		// 新tab已存在，重新覆盖掉（解决带参数地址数据错乱问题）
		if (index > -1) {
			panes[index].path = newPath;
			setPanes(panes);
			setActiveKey(tabActiveKey);
			return;
		}

		// 添加新tab并保存起来
		panes.push(panesItem);
		setPanes(panes);
		setActiveKey(tabActiveKey);
		storeTabs(panes);
	}, [panes, panesItem, pathname, search, storeTabs, tabActiveKey]);

	const isDisabled = () => selectedPanel.key === "home";
	// tab右击菜单
	const menu = (
		<Menu>
			<Menu.Item key="1" onClick={() => refreshTab()} disabled={selectedPanel.path !== fullPath}>
				{t("刷新")}
			</Menu.Item>
			<Menu.Item
				key="2"
				onClick={e => {
					e.domEvent.stopPropagation();
					remove(selectedPanel.key);
				}}
				disabled={isDisabled()}
			>
				{t("关闭")}
			</Menu.Item>
			<Menu.Item
				key="3"
				onClick={e => {
					e.domEvent.stopPropagation();
					removeAll();
				}}
			>
				{t("关闭其他")}
			</Menu.Item>
			<Menu.Item
				key="4"
				onClick={e => {
					e.domEvent.stopPropagation();
					removeAll(true);
				}}
				disabled={isDisabled()}
			>
				{t("全部关闭")}
			</Menu.Item>
		</Menu>
	);

	// 阻止右键默认事件
	const preventDefault = (e: CommonObjectType, panel: object) => {
		e.preventDefault();
		setSelectedPanel(panel);
	};

	return (
		<Tabs
			// destroyInactiveTabPane

			activeKey={activeKey}
			className={`${style.tabs}  shadow-lg `}
			defaultActiveKey={defaultActiveKey}
			hideAdd
			onChange={onChange}
			onEdit={onEdit}
			onTabClick={onTabClick}
			type="editable-card"
			size="small"
		>
			{panes.map(
				(pane: CommonObjectType) => (
					<TabPane
						closable={pane.closable}
						key={pane.key}
						tab={
							<Dropdown overlay={menu} placement="bottomLeft" trigger={["contextMenu"]}>
								<span onContextMenu={e => preventDefault(e, pane)}>
									{isReload && pane.path === fullPath && pane.path !== "/403" && (
										<SyncOutlined title={t("刷新")} spin={isReload} />
									)}
									{pane.title}
								</span>
							</Dropdown>
						}
					>
						{/* {reloadPath !== pane.path ? <pane.content path={pane.path} /> : ""} */}
					</TabPane>
				)
				// <pane.content path={pane.path} />
			)}
		</Tabs>
	);
};

export default TabPanes;
