import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, useOptions } from "multiway";

import service from "../services";
import { useRef, Suspense } from "react";
import { setDefaultDataFilter } from "multiway";
import Loading from "@/components/loading";
import useConvertorRequest from "@/hooks/useConvertorRequest";

setDefaultDataFilter((res: any) => {
	return {
		content: res.resultData.pageData,
		totalCount: res.resultData.totalCount,
		...res
	};
});

export default function SystemConfigration() {
	const { t } = useTranslation();
	const tableRef = useRef(null);
	const { getRoleList, delRoleList, getPermissionData, addRole, updateRole } = service;
	const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 12 } };
	const PermissionOptions = useConvertorRequest(getPermissionData, { label: "permissionName", value: "id" });
	const fields: Array<MwSearchTableField> = [
		{
			title: t("角色名称"),
			key: "roleName",
			search: true,
			dialog: {
				required: true
			}
		},
		{
			title: t("权限名称"),
			key: "permissionId",
			type: "select",
			search: true,
			dialog: {
				required: true
			},
			options: PermissionOptions
		},
		{
			title: t("描述信息"),
			key: "roleDescription",
			type: "textarea",
			dialog: {}
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
				<MwAction record={record} danger action="delete">
					{t("删除")}
				</MwAction>
			</MwCtrl>
		)
	};

	return (
		<Suspense fallback={<Loading>Loading...</Loading>}>
			<MwSearchTable
				ref={tableRef}
				api={getRoleList}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delRoleList}
				dialogFormExtend={{
					fields: [...fields],
					width: "50%",
					span: 24,
					dialogOnly: true,
					addApi: addRole,
					updateApi: updateRole,
					formExtend: {
						...formLayout
					}
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
		</Suspense>
	);
}
