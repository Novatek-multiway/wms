import type { TabsProps } from "antd";
import type { AppDispatch, RootState } from "@/store/systemTabs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { message, Tabs, Dropdown } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAliveController } from "react-activation";
import { useDropdownMenu } from "../hooks/useDropdownMenu";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "@/store/public";
import { setActiveKey, addTabs, closeTabs, setNav, toggleLock } from "@/store/tabs";
import styles from "../index.module.less";
import TabRefresh from "./TabRefresh";
import TabMaximize from "./TabMaximize";
import TabOptions from "./TabOptions";
import { getTabsByPath } from "@/assets/js/publicFunc";
import { useTranslation } from "react-i18next";

function LayoutTabs() {
	const navigate = useNavigate();
	const { pathname, search } = useLocation();
	const { t } = useTranslation();
	const uri = pathname + search;
	const dispatch: AppDispatch = useDispatch();
	const { refresh } = useAliveController();
	const [time, setTime] = useState<null | NodeJS.Timeout>(null);
	const [refreshTime, seRefreshTime] = useState<null | NodeJS.Timeout>(null);

	const tabs = useSelector((state: RootState) => {
		return state.tabs.tabs;
	});
	const isLock = useSelector((state: RootState) => state.tabs.isLock);
	const activeKey = useSelector((state: RootState) => state.tabs.activeKey);
	// 是否窗口最大化
	const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize);

	/**
	 * 添加标签
	 * @param path - 路径
	 */
	const handleAddTab = useCallback((path = uri) => {
		// 当值为空时匹配路由
		// if (path === "/") return;
		// const newItems = getMenuByKey(menuByKeyProps);
		const newItems = getTabsByPath(path);
		if (newItems?.key) {
			dispatch(setActiveKey(newItems.key));
			dispatch(addTabs({ ...newItems, label: t(newItems.label) }));
		} else {
			dispatch(setActiveKey(path));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		handleAddTab();
	}, [handleAddTab]);

	useEffect(() => {
		return () => {
			if (time) {
				clearTimeout(time);
				setTime(null);
			}

			if (refreshTime) {
				clearTimeout(refreshTime);
				seRefreshTime(null);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// 当选中贴标签不等于当前路由则跳转
		if (activeKey !== uri) {
			const key = isLock ? activeKey : uri;
			handleAddTab(key);

			if (isLock) {
				navigate(key);
				dispatch(toggleLock(false));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeKey, uri]);

	/**
	 * 处理更改
	 * @param key - 唯一值
	 */
	const onChange = (key: string) => {
		if (key === "home") {
			navigate("/");
		} else {
			navigate(key);
		}
	};

	/**
	 * 删除标签
	 * @param targetKey - 目标key值
	 */
	const remove = (targetKey: string) => {
		dispatch(closeTabs(targetKey));
	};

	/**
	 * 处理编辑
	 * @param targetKey - 目标key值
	 * @param action - 动作
	 */
	const onEdit: TabsProps["onEdit"] = (targetKey, action) => {
		if (action === "remove") {
			remove(targetKey as string);
		}
	};

	/**
	 * 点击重新加载
	 * @param key - 点击值
	 */
	const onClickRefresh = useCallback(
		(key = activeKey) => {
			// 如果key不是字符串格式则退出
			if (typeof key !== "string") return;

			// 定时器没有执行时运行
			if (!time) {
				dispatch(setRefresh(true));
				refresh(key);

				setTime(
					setTimeout(() => {
						message.success({
							content: t("刷新成功"),
							key: "refresh"
						});
						dispatch(setRefresh(false));
						setTime(null);
					}, 100)
				);

				seRefreshTime(
					setTimeout(() => {
						seRefreshTime(null);
					}, 1000)
				);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[activeKey, time]
	);

	// 渲染重新加载
	const RefreshRender = useMemo(() => {
		return <TabRefresh isRefresh={!!refreshTime} onClick={onClickRefresh} />;
	}, [refreshTime, onClickRefresh]);

	// 渲染标签操作
	const TabOptionsRender = useMemo(() => {
		return <TabOptions activeKey={activeKey} handleRefresh={onClickRefresh} />;
	}, [activeKey, onClickRefresh]);

	// 渲染最大化操作
	const TabMaximizeRender = useMemo(() => {
		return <TabMaximize />;
	}, []);

	// 标签栏功能
	const tabOptions = [{ element: RefreshRender }, { element: TabOptionsRender }, { element: TabMaximizeRender }];

	// 下拉菜单
	const dropdownMenuParams = { activeKey, handleRefresh: onClickRefresh };
	const [items, onClick] = useDropdownMenu(dropdownMenuParams);

	/** 二次封装标签 */
	const renderTabBar: TabsProps["renderTabBar"] = (tabBarProps, DefaultTabBar) => {
		return (
			<DefaultTabBar {...tabBarProps}>
				{node => {
					return (
						<Dropdown
							key={node.key}
							menu={{
								items: items(node.key as string),
								onClick: e => onClick(e.key, node.key as string)
							}}
							trigger={["contextMenu"]}
						>
							<div className="mr-3px">{node}</div>
						</Dropdown>
					);
				}}
			</DefaultTabBar>
		);
	};

	return (
		<div
			className={`
      flex
      items-center
      justify-between
      transition-all
      ${isMaximize ? styles.conMaximize : ""}
    `}
		>
			{tabs.length > 0 ? (
				<Tabs
					hideAdd
					className="w-full h-30px py-0"
					onChange={onChange}
					activeKey={activeKey}
					type="editable-card"
					onEdit={onEdit}
					items={tabs}
					renderTabBar={renderTabBar}
				/>
			) : (
				<span></span>
			)}
		</div>
	);
}

export default LayoutTabs;
