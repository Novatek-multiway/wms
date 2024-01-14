import { useTranslation } from "react-i18next";
import React, { useState, useRef, Suspense } from "react";
import { Tag } from "antd";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, setDefaultDataFilter, MwTableCtrlField } from "multiway";

import service from "../services";
import Loading from "@/components/loading";
import _ from "lodash";
export default function SystemConfigration() {
	const { t } = useTranslation();
	setDefaultDataFilter((res: any) => {
		function delChildren(arr: any[]) {
			arr.forEach(item => {
				if (item.children.length) {
					delChildren(item.children);
				} else {
					delete item.children;
				}
			});
		}
		delChildren(res.resultData);
		return {
			content: res.resultData,
			totalCount: res.totalCount,
			...res
		};
	});
	const { getMenuList, delMenu, addMenu, updateMenu } = service;
	const [showAuthState, setShowAuthState] = useState(true);
	const tableRef = useRef(null);

	// 后端接口未调整某些字段需必传
	const defaultBodyVal = {
		menuUrl: "",
		menuIcon: "",
		menuLanguageSign: "",
		systemCode: "",
		vueComponent: ""
	};
	const defaultFunctionListVal = {
		functionAction: "",
		functionIcon: ""
	};

	const fields: Array<MwSearchTableField> = [
		{
			title: t("菜单名称"),
			width: 200,
			key: "menuTitle",
			dialog: {
				required: true
			},
			search: false
		},
		{
			title: t("菜单类型"),
			width: 120,
			key: "parentId",
			type: "custom",
			render: (_, record: Record) => {
				return record.parentId === "0" ? <Tag color="blue">{t("一级菜单")}</Tag> : <Tag color="orange">{t("子菜单")}</Tag>;
			}
		},
		{
			title: t("菜单别名"),
			key: "menuName",
			width: 220,
			search: false,
			dialog: {
				required: true
			},
		},
		{
			title: t("排序"),
			key: "menuSort",
			width: 90,
			dialog: {
				required: true
			},
		}
	];

	const showBtnAuth: Array<MwSearchTableField> = [
		{
			title: t("按钮/权限"),
			key: "functionList",
			type: "list",
			children: [
				{
					title: t("功能名称"),
					key: "functionName"
				},
				{
					title: t("功能执行动作"),
					key: "functionAction"
				},
				{
					title: t("排序"),
					key: "functionSort"
				}
			],

			dialog: true
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 120,
		render: (_, record: Record) => {
			return (
				<MwCtrl>
					<MwAction record={{ id: record.id }} action="add">
						{t("添加子菜单")}
					</MwAction>
					<MwAction
						record={record}
						action="update"
						onOpen={record => {
							record.parentId === "0" && setShowAuthState(false);
						}}
					>
						{t("编辑")}
					</MwAction>
					<MwAction record={record} danger action="delete">
						{t("删除")}
					</MwAction>
				</MwCtrl>
			);
		}
	};

	const showAuth = () => (showAuthState ? showBtnAuth : []);

	return (
		<Suspense fallback={<Loading>Loading...</Loading>}>
			<MwSearchTable
				ref={tableRef}
				api={getMenuList}
				fields={fields}
				rowKey={"id"}
				ctrl={ctrl}
				deleteApi={delMenu}
				searchExtend={{ visibleRow: 1 }}
				pagination={false}
				tableExtend={{
					expandable: {
						childrenColumnName: "children",
						defaultExpandAllRows: true
					}
				}}
				dialogFormExtend={{
					// fields: [...fields, ...showAuth()],
					fields: [...fields],
					addApi: async res => {
						let body;
						if (res?.id && res.id !== "0") {
							// 新增子菜单
							res.parentId = res.id;
							res.menuld = res.id;
							res.functionList = _.map(res.functionList, v => {
								return _.extend({}, v, { ...defaultFunctionListVal });
							});
							body = _.assign(res, { id: "0", ...defaultBodyVal });
						} else {
							// 新增菜单
							body = _.assign(res, { id: "0", ...defaultBodyVal, functionList: [] });
						}
						return await addMenu(body);
					},
					updateApi: async res => {
						res.functionList = _.map(res.functionList, v => {
							return _.extend({}, v, {
								functionAction: "",
								functionIcon: "",
								id: v.id ? v.id : "0",
								menuId: v.menuId ? v.menuId : "0"
							});
						});
						res.children && delete res.children;
						return await updateMenu(res);
					},
					width: "50%",
					span: 24,
					dialogOnly: true,
					onClose: () => {
						setShowAuthState(true);
					}
				}}
			>
				<MwAction
					action="add"
					dialogTitle={t("新增菜单")}
					onOpen={() => {
						setShowAuthState(false);
					}}
				>
					{t("新增菜单")}
				</MwAction>
			</MwSearchTable>
		</Suspense>
	);
}
