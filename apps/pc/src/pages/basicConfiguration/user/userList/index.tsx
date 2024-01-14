import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwButton, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import service from "../services";
import { setDefaultDataFilter } from "multiway";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import Loading from "@/components/loading";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import { message } from "antd";
import { pick } from "lodash";

setDefaultDataFilter((res: any) => {
	return {
		content: res.resultData.pageData,
		totalCount: res.resultData.totalCount,
		...res
	};
});
function SystemConfigration() {
	const { t } = useTranslation();
	const { configStore } = useStore();
	const { getUserList, delUser, addUser, updateUser, getRoleList, resetDefaultPwd } = service;
	const tableRef = useRef(null);
	const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 24 } };
	const roleListOptions = useConvertorRequest(getRoleList, { label: "roleName", value: "id" });

	const fields: Array<MwSearchTableField> = [
		{
			title: t("账号名称"),
			width: 100,
			key: "userName",
			align: "center",
			search: true,
			dialog: {
				required: true
			},
			hiddenMode: ["update"]
		},
		{
			title: t("角色名称"),
			width: 100,
			key: "roleId",
			align: "center",
			type: "select",
			options: roleListOptions,
			dialog: {
				align: "left",
				required: true
			}
		},
		{
			title: t("用户头像"),
			key: "avator",
			align: "center",
			width: 100,
			dialog: {}
		},
		{
			title: t("姓名"),
			width: 100,
			key: "realName",
			align: "center",
			search: true,
			dialog: { required: true }
		},
		{
			title: t("性别"),
			align: "center",
			width: 80,
			key: "userSex",
			type: "radio-group",
			options: [
				{
					label: t("男"),
					value: 1
				},
				{
					label: t("女"),
					value: 2
				}
			],

			dialog: {
				required: true,
				defaultValue: 1
			}
		},
		{
			ellipsis: true,
			title: t("出生日期"),
			align: "center",
			width: 200,
			key: "birthday",
			type: "date",
			dialog: {}
		},
		{
			title: t("工号"),
			align: "center",
			width: 100,
			key: "jobNumber",
			search: true,
			dialog: {}
		},
		{
			title: t("电话"),
			align: "center",
			width: 200,
			key: "phoneNumber",
			search: true,
			dialog: {
				formItemProps: {
					rules: [
						{
							validator: (_, val: string) => {
								if (!val){
									return Promise.resolve()
								}
								if(!/^1[3-9]\d{9}$/.test(val)) {
									return Promise.reject('手机号格式不正确！')
								}
								return Promise.resolve()
							}
						}
					]
				}
			}
		},
		{
			title: "email",
			align: "center",
			width: 200,
			key: "userEmail",
			dialog: {
				formItemProps: {
					rules: [
						{
							validator: (_, val: string) => {
								if (!val){
									return Promise.resolve()
								}
								if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
									return Promise.reject('邮箱格式不正确！')
								}
								return Promise.resolve()
							}
						}
					]
				}
			}
		},
		{
			title: t("部门名称"),
			align: "center",
			width: 100,
			key: "departmentName",
			dialog: {}
		},
		{
			title: t("添加时间"),
			align: "center",
			width: 200,
			key: "createTime"
		}
	];

	const otherFields = [
		{
			title: t("账号名称"),
			width: 100,
			key: "userName",
			align: "center",
			dialog: {
				required: true,
				disabled: true
			},
			hiddenMode: ["add"]
		}
	];

	const resetPWd = async (record: Record) => {
		const params = pick(record, "id");
		const res = await resetDefaultPwd(params);
		if (res.resultData) {
			message.success(t("重置密码成功"));
		}
	};

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		align: "center",
		width: 180,
		fixed: "right",
		render: (_, record: Record) => (
			<MwCtrl>
				<MwAction record={record} action="update">
					{t("编辑")}
				</MwAction>
				<MwAction record={record} danger action="delete">
					{t("删除")}
				</MwAction>
				{configStore.isAdmin && (
					<MwAction
						confirmtext={t("确认重置密码？")}
						confirm={() => {
							resetPWd(record);
						}}
						record={record}
						action="confirm-action"
					>
						{t("重置密码")}
					</MwAction>
				)}
			</MwCtrl>
		)
	};

	return (
		<Suspense fallback={<Loading>Loading...</Loading>}>
			<MwSearchTable
				ref={tableRef}
				api={getUserList}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delUser}
				searchExtend={{ visibleRow: 1 }}
				dialogFormExtend={{
					fields: [...otherFields, ...fields],
					addApi: addUser,
					updateApi: updateUser,
					width: "60%",
					span: 12,
					dialogOnly: true,
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

export default observer(SystemConfigration);
