import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import { useEffect, useRef, useState } from "react";
import service from "../services";
import { setDefaultDataFilter } from "multiway";
import { Tree, Input } from "antd";
import { useRequest } from "ahooks";
import AuthorizationSore from "./store";

import AuthorizationModal from "./components/authorizationModal";

export default function SystemConfigration() {
	const { t } = useTranslation();
	const { getPermissionList, delPermission, addPermission, updatePermission } = service;
	const [menuData, setMenuData] = useState([]);
	const [currentAuthorizationId, setCurrentAuthorizationId] = useState({});
	const [open, setOpen] = useState(false);

	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const { run: getMenuList, loading } = useRequest(service.getMenuList, {
		manual: true,
		onSuccess: (data: any) => {
			setMenuData(data.resultData);
		}
	});
	useEffect(() => {
		getMenuList();
	}, []);
	const tableRef = useRef(null);
	const fields: Array<MwSearchTableField> = [
		{
			title: t("权限名称"),
			key: "permissionName",
			search: true,
			dialog: {
				required: true,
				span: 24
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 120,
		render: (_, record: Record) => (
			<MwCtrl>
				<MwAction record={record} action="update">
					{t("编辑")}
				</MwAction>
				<MwAction
					record={record}
					onClick={() => {
						setOpen(true);
						setCurrentAuthorizationId(record);
					}}
				>
					{t("授权")}
				</MwAction>
				<MwAction record={record} danger action="delete">
					{t("删除")}
				</MwAction>
			</MwCtrl>
		)
	};
	return (
		<AuthorizationSore>
			<MwSearchTable
				ref={tableRef}
				api={getPermissionList}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={async res => {
					return await delPermission(res[0]);
				}}
				dialogFormExtend={{
					fields: [...fields],
					addApi: async res => {
						res.itemList = [];
						return await addPermission(res);
					},
					updateApi: async res => {
						res.itemList = [];
						return await updatePermission(res);
					},
					width: "50%",
					span: 12,
					dialogOnly: true
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
			<AuthorizationModal
				currentId={currentAuthorizationId}
				menuData={menuData}
				close={() => {
					setOpen(false);
				}}
				open={open}
			/>
		</AuthorizationSore>
	);
}
