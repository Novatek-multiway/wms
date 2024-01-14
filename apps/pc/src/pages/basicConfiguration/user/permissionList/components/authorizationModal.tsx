import { useTranslation } from "react-i18next";
import React, { useState, useRef, useEffect, useContext } from "react";
import { MwDialogFormField, MwDialogForm } from "multiway";
import { useRequest } from "ahooks";
import { message, Tree, Checkbox, Popover } from "antd";
import services from "../../services";
import PopoverComponent from "./popoverComponent";
import { AuthorizationStoreContext } from "../store";
import { observer } from "mobx-react-lite";

function AuthorizationModal({ currentId, menuData, open, close }) {
	const { t } = useTranslation();
	// 当前授权的id
	const store = useContext(AuthorizationStoreContext);
	const { authorizationStore } = store;

	const formRef = useRef<any>();
	const childrenRef = useRef<any>();
	// 弹窗是否可见
	const [visible, setVisible] = useState(false);
	const [btnList, setBtnList] = useState<React.Key[]>([]); // 按钮权限勾选参数
	const formLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };

	useEffect(() => {
		if (!open) return;
		setVisible(true);
	}, [open]);

	// 根据id获取授权详情
	const { loading, runAsync: getPermissionInfo } = useRequest(services.getPermissionInfo, {
		manual: true
	});

	useEffect(() => {
		if (currentId.id && open) {
			getPermissionInfo(currentId?.id)
				.then(res => {
					authorizationStore.setPermissionInfoData(res.resultData);
					// 处理菜单&按钮勾选回显
					if (res.resultData.length > 0) {
						authorizationStore.setMenuInfoValue(res.resultData?.map(v => v.menuId));
						authorizationStore.setFunctionListInfo(res.resultData?.map(v => v.functionId));
					} else {
						authorizationStore.setMenuInfoValue([]);
						authorizationStore.setFunctionListInfo([]);
					}
				})
				.catch(err => {
					console.log("error", err);
				});
		}
	}, [open, currentId.id]);

	const onSelect = (selectedKeys, e: Event) => {
		e.node.children.length === 0 && childrenRef.current.showPopoverModal(selectedKeys, e);
	};

	const postBodyData = res => {
		const { itemList } = res;
		let obj = {};
		if (itemList.length > 0) {
			obj = itemList.map(v => {
				return {
					id: "0", //固定值
					permissionId: currentId.id,
					permissionName: currentId.permissionName,
					menuId: v,
					// TODO 需要跟后端对接参数
					functionId: ["0"] // 0 为固定值
				};
			});
		} else {
			obj = authorizationStore.permissionInfoData;
		}
		let postBody = {
			permissionId: currentId.id,
			permissionItemInfosDTO: obj
		};
		console.log("obj>", postBody);
		return postBody;
	};

	const fields: Array<MwDialogFormField> = [
		{
			title: t("权限分配"),
			key: "itemList",
			type: "tree",
			span: 16,
			treeData: menuData,
			fieldNames: { title: "menuTitle", key: "id" },
			defaultExpandAll: true,
			// checkStrictly: true,
			defaultValue: authorizationStore.menuInfoValue, // 回显数据
			onSelect: onSelect
		}
	];

	return (
		<>
			<MwDialogForm
				span={24}
				ref={formRef}
				visible={visible}
				fields={fields}
				title={t("权限分配")}
				drawer
				addApi={async res => {
					let body = postBodyData(res);
					return await services.addPermissionItemInfo(body);
				}}
				onClose={() => {
					setVisible(false);
					close();
				}}
				onSuccess={() => message.success(t("操作成功"))}
				onError={err => {
					const { error } = err;
					message.error(error.message);
				}}
				formExtend={{
					...formLayout,
					formLayout: "vertical"
				}}
			/>

			<PopoverComponent ref={childrenRef} />
		</>
	);
}

export default observer(AuthorizationModal);
