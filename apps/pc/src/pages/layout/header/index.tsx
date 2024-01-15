import { useState, useEffect, useRef } from "react";
import { useStore } from "@/store/index";
import { observer } from "mobx-react-lite";
import { Breadcrumb, Menu, Dropdown, Tooltip, Drawer, Avatar, Switch, message } from "antd";
import { GlobalOutlined, SettingOutlined, CheckOutlined, ImportOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MwDialogForm, setLanguage, MwDialogFormField } from "multiway";

import dark from "@/assets/icons/dark.svg";
import light from "@/assets/icons/light.svg";
// import user from "@/assets/imgs/frame/user.jpeg";
import user from "@/assets/icons/user.svg";

import HeaderNoticeComponent from "./Notice";

import FullScreen from "./FullScreen";
import md5 from "md5";
import { modifyUserPwd } from "../services";
import { clearToken } from "@/utils/token";

interface IHeaderProps {
	width: number;
}

function HeaderNav({ width }: IHeaderProps) {
	const { configStore, basicStore } = useStore();
	const { t } = useTranslation(); // 国际化
	const navigate = useNavigate(); // 路由跳转
	const [locales, setLocales] = useState<Array<any>>(["ko_KR"]); // 默认韩文环境
	const [visible, setVisible] = useState(false); // 设置面板显示状态
	const [dialogVisible, setDialogVisible] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		if (localStorage.getItem("locale")) {
			setLocales([localStorage.getItem("locale")]);
		}
	}, []);

	interface ILocale {
		key?: any;
	}

	// 语言切换
	const handleSelect = ({ key }: ILocale) => {
		if (locales[0] !== key) {
			setLocales([key]);
			setLanguage(key);
			configStore.switchLanguage(key);
			window.location.reload();
		}
	};

	// 主题风格
	const themeList: Array<any> = [
		{
			name: t("暗色菜单风格"),
			style: "dark",
			icon: dark
		},
		{
			name: t("亮色菜单风格"),
			style: "light",
			icon: light
		}
	];

	// 主题色
	const colorList: Array<any> = [
		{
			name: t("薄暮"),
			color: "#F5222D"
		},
		{
			name: t("火山"),
			color: "#FA541C"
		},
		{
			name: t("日暮"),
			color: "#FAAD14"
		},
		{
			name: t("明青"),
			color: "#13C2C2"
		},
		{
			name: t("极光绿"),
			color: "#52C41A"
		},
		{
			name: t("拂晓蓝（默认）"),
			color: "#1890FF"
		},
		{
			name: t("极客蓝"),
			color: "#2F54EB"
		},
		{
			name: t("酱紫"),
			color: "#722ED1"
		}
	];

	// 修改密码
	const fields: Array<MwDialogFormField> = [
		{
			title: t("旧密码"),
			key: "oldPassword",
			type: "password",
			required: true
		},
		{
			title: t("新密码"),
			key: "newPassword",
			type: "password",
			required: true
		},
		{
			title: t("确认新密码"),
			key: "confirmNewPassword",
			type: "password",
			required: true,
			rules: [
				{
					validator: (_: any, val: string) => {
						const newPassword = formRef.current?.getFieldValue?.("newPassword");
						if (!newPassword) {
							return Promise.reject(t("请先输入新密码"));
						}
						if (newPassword !== val) {
							return Promise.reject(t("确认密码与新密码不一致"));
						}
						return Promise.resolve();
					}
				}
			]
		}
	];

	// 退出登录
	const handleUserLogout = ({ key }: ILocale) => {
		if (key === "logout") {
			basicStore.logout();
			navigate("/login", { replace: true });
		} else if (key === "updatePwd") {
			setDialogVisible(true);
		}
	};

	// 跳转git
	const handleLinkGit = () => {
		// window.open("https://github.com/KinXpeng/react-admin-vite");
	};
	// 国际化菜单
	const languageMenu = (
		<Menu
			onClick={handleSelect}
			selectedKeys={locales}
			items={[
				{ label: "🇨🇳 简体中文", key: "zh_CN" },
				{ label: "🇬🇧 English", key: "en_US" },
				// { label: "🇯🇵 にほんご", key: "ja_JP" },
				{ label: "🇰🇷 한글", key: "ko_KR" }
			]}
		></Menu>
	);

	// 用户下拉设置
	const userMenu = (
		<Menu
			onClick={handleUserLogout}
			items={[
				{ label: t("退出登录"), key: "logout", icon: <ImportOutlined /> },
				{ label: t("修改密码"), key: "updatePwd", icon: <UserOutlined /> }
			]}
		></Menu>
	);

	return (
		<div className="flex justify-between items-center relative w-full text-opacity-60 shadow-box z-10 px-2">
			<div className="flex flex-col text-left">
				<p className=" text-lg font-bold m-0" style={{ color: "#00d0d0" }}>
					{t("home.Title")}
				</p>
				{/* 面包屑导航 */}
				<Breadcrumb style={{ color: "#00d0d0" }}>
					{configStore.activeItem?.label && !configStore.activeItem?.isParent && width > 500 ? (
						<>
							<Breadcrumb.Item className="text-[#00d0d0]">{configStore.parentItem.label}</Breadcrumb.Item>
							<Breadcrumb.Item className="text-[#00d0d0]">{configStore.activeItem.label}</Breadcrumb.Item>
						</>
					) : (
						<Breadcrumb.Item className="text-[#00d0d0]">{configStore.activeItem.label}</Breadcrumb.Item>
					)}
				</Breadcrumb>
			</div>
			<div className="flex">
				{/* 国际化 */}
				<Dropdown overlay={languageMenu} placement="bottomRight">
					<div className="w-10 text-center cursor-pointer">
						<GlobalOutlined className="text-base" />
					</div>
				</Dropdown>
				<FullScreen></FullScreen>

				{/* github */}
				<div className="w-10 text-center cursor-pointer" title="react-admin-vite" onClick={handleLinkGit}>
					<HeaderNoticeComponent />
				</div>

				{/* 设置 */}
				<div className="w-10 text-center cursor-pointer" onClick={() => setVisible(true)}>
					<SettingOutlined className="text-base" />
				</div>
				{/* 用户信息  */}
				<Dropdown overlay={userMenu} placement="bottomRight">
					<div className="text-center cursor-pointer flex items-center">
						<Avatar src={user} />
						<span className="ml-1">{configStore.userName}</span>
					</div>
				</Dropdown>
			</div>

			{/* 设置面板 */}
			<Drawer width="280" placement="right" open={visible} onClose={() => setVisible(false)} closable={false}>
				{/* 主题style */}
				<div>
					<h3 className="text-gray-700 mb-2.5 font-semibold">{t("header.page_style")}</h3>
					<div className="flex">
						{themeList.map(item => (
							<span
								className="relative w-12 h-10 mr-4 rounded cursor-pointer"
								key={item.style}
								onClick={() => configStore.switchStyle(item.style)}
							>
								<Tooltip title={item.name} color={configStore.theme.primaryColor + "B3"} key={configStore.theme.primaryColor}>
									<img className="w-full h-full" src={item.icon} alt="" />
								</Tooltip>
								{configStore.themeStyle === item.style ? (
									<CheckOutlined className="absolute right-2.5 bottom-2.5" style={{ color: configStore.theme.primaryColor }} />
								) : (
									""
								)}
							</span>
						))}
					</div>
				</div>

				{/* 主题色 */}
				<div>
					<h3 className="font-semibold text-gray-700 mx-0 mt-4 mb-2.5">{t("header.theme_color")}</h3>
					<div className="flex">
						{colorList.map(item => (
							<Tooltip title={item.name} color={item.color + "B3"} key={item.color}>
								<span
									className="w-5 h-5 leading-5 text-center rounded-sm text-white mr-2 cursor-pointer flex items-center justify-center"
									style={{ background: item.color }}
									onClick={() => configStore.switchColor(item.color)}
								>
									{configStore.theme.primaryColor === item.color ? <CheckOutlined /> : ""}
								</span>
							</Tooltip>
						))}
					</div>
				</div>
				{/* <div>
					<h3 className="font-semibold text-gray-700 mx-0 mt-4 mb-2.5">{"开启多页"}</h3>
					<Switch
						checkedChildren={t("开启")}
						unCheckedChildren={t("关闭")}
						checked={configStore.multyTab}
						onChange={val => configStore.switchTab(val)}
					/>
				</div> */}
				{/* <div>
          <h3 className="font-semibold text-gray-700 mx-0 mt-4 mb-2.5">{"设置登录页文字"}</h3>
          <Tooltip
          				title={item[configStore.locale + "_name"]}
          				color={configStore.theme.primaryColor + "B3"}
          				key={configStore.theme.primaryColor}
          			><Input/></Tooltip>
          </div> */}

				{/* TODO 后端对接 */}
				{/* <div>
          <h3 className="font-semibold text-gray-700 mx-0 mt-4 mb-2.5">{"设置登录页LOGO"}</h3>
          </div> */}
			</Drawer>
			<MwDialogForm
				centered
				ref={formRef}
				fields={fields}
				visible={dialogVisible}
				title={t("重置登录密码")}
				onSuccess={() => message.success(t("修改密码成功，请重新登录。"))}
				onClose={() => setDialogVisible(false)}
				addApi={async res => {
					const body = {
						newPassword: md5(res?.newPassword),
						oldPassword: md5(res?.oldPassword)
					};
					return modifyUserPwd(body).then(() => {
						clearToken("AuthenticationToken");
						navigate("/login");
					});
				}}
			></MwDialogForm>
		</div>
	);
}

export default observer(HeaderNav);
