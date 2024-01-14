import { useEffect, useState } from "react";
import { useStore } from "@/store/index";
import { observer } from "mobx-react-lite";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
// import { menus } from "@/components/menus/index";
import { menus as preDefinedRoutes } from "@/components/menus";
import logoMini from "@/assets/imgs/logo.png";
import logoOrigin from "@/assets/imgs/frame/logo_origin.png";
import { IconFont } from "@/components/Icon";
import "./index.less";
import { deepClone, getRoute } from "@/assets/js/publicFunc";
import { useDispatch, useSelector } from "react-redux";
import { addTabs, setNav, setActiveKey } from "@/store/tabs";
interface IHeaderProps {
	collapsed?: boolean;
	setVisible?: any;
}
function SiderMenu({ collapsed, setVisible }: IHeaderProps) {
	const { configStore } = useStore();
	const { userPermissionData } = configStore;
	const { t } = useTranslation();
	const navigate = useNavigate(); // 路由跳转
	const location = useLocation();
	const dispatch = useDispatch();
	function deepChildren(authMenus) {
		return authMenus.map(ele => {
			return {
				key: ele.key,
				icon: ele.icon && <IconFont type={ele.icon}></IconFont>,
				label: t(ele.label),
				path: ele.path,
				onClick: () => ele.path && navigate(ele.path),
				children: ele.children && deepChildren(ele.children)
			};
		});
	}

	function getMenu(userPermissionData, localMenu) {
		const list = [];
		localMenu.filter(item =>
			userPermissionData.some(ele => {
				if (item.children && item.children.length) {
					const routeChild = getMenu(ele.children ?? [], item.children ?? []);
					// 此处产生副作用，会修改引用
					if (routeChild.length) item.children = routeChild;
				}
				if (item.key === ele.menuName) {
					list.push(item);
				}
			})
		);
		return deepChildren(list);
	}

	// 菜单列表
	const [menuList, setMenuList]: Array<any> = useState([]);
	// 解决刷新页面面包屑导航消失的问题
	useEffect(() => {
		let activeNode = JSON.parse(localStorage.getItem("activeItem") || "{}");
		let parentNode = JSON.parse(localStorage.getItem("parentItem") || "{}");
		if (activeNode?.label !== undefined && activeNode?.label !== null) {
			configStore.switchMenuItem(activeNode);
			configStore.operateCrumbMenu(parentNode);
		}
	}, [configStore, location.pathname, menuList]);

	useEffect(() => {
		const localMenus = deepClone(preDefinedRoutes);
		setMenuList(getMenu(userPermissionData, localMenus));
	}, [userPermissionData]);
	// 返回首页
	const backHome = () => {
		configStore.crumbItem();
		navigate("/", { replace: true });
	};

	// 点击菜单
	const handleClickItem: MenuProps["onClick"] = item => {
		let parentNode = item.keyPath[1];
		let result = getRoute(item.key);
		const { key, title, path } = result;
		if (!parentNode) {
			configStore.switchMenuItem({ key, label: t(title), path, isParent: true });
			dispatch(addTabs({ key, label: t(title), path, isParent: true }));
			navigate(path);
			return;
		}
		let { title: pTitle, key: pKey } = getRoute(item.keyPath[1]);
		configStore.operateCrumbMenu({
			label: t(pTitle),
			key: pKey
		});
		configStore.switchMenuItem({ key, label: t(title) });
		dispatch(addTabs({ key, label: t(title), path }));
		if (setVisible !== undefined) setVisible(false); // 收起drawer菜单
	};

	return (
		<>
			<div className="h-16 text-center cursor-pointer overflow-hidden px-12 py-2 sm:px-6 flex items-center" onClick={backHome}>
				<div className="ilogo">
					<img className={collapsed ? "w-full" : " m-auto"} src={collapsed ? logoMini : logoOrigin} alt="" />
				</div>
			</div>
			<Menu
				inlineIndent={16}
				theme={configStore.themeStyle}
				mode="inline"
				selectedKeys={[configStore.activeItem.key]}
				onClick={handleClickItem}
				items={menuList}
			></Menu>
		</>
	);
}

export default observer(SiderMenu);
