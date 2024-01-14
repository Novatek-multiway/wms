import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import service from "../services";
import Loading from "@/components/loading";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import useEnumOptions from "@/hooks/useEnumOptions";

export default function PathManagement() {
	const { getRoutingData, delRouting, addRouting, updateRouting, getAreaList } = service;
	const { t } = useTranslation();
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const areaOption = useConvertorRequest(getAreaList, item => ({
		...item,
		label: `${item.areaCode}(${item.areaName})`,
		value: item.id
	})); // 所属区域

	const taskTypeOptios = useEnumOptions("EnumTaskType", "itemId");
	const formLayout = { labelCol: { span: 12 }, wrapperCol: { span: 12 } };

	const tableRef = useRef(null);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("路径编号"),
			key: "code",
			width: 120,
			search: true,
			ellipsis: true,
			dialog: {}
		},
		{
			title: t("路径名称"),
			width: 150,
			key: "name",
			search: true,
			dialog: {
				required: true
			}
		},
		{
			title: t("起始区域"),
			width: 150,
			key: "fromArea",
			type: "select",
			options: areaOption,
			dialog: {
				required: true
			}
		},
		{
			title: t("目标区域"),
			width: 100,
			key: "toArea",
			type: "select",
			options: areaOption,
			dialog: {
				required: true
			}
		},
		{
			title: t("搬运任务类型"),
			width: 180,
			key: "taskType",
			type: "select",
			options: taskTypeOptios,
			dialog: {
				required: true
			}
		},
		{
			title: t("搬运任务执行类型"),
			width: 200,
			type: "select",
			key: "taskExecuteType",
			options: [
				{ label: t("自动"), value: 1 },
				{ label: t("手动"), value: 2 }
			],

			dialog: {
				required: true,
				defaultValue: 1
			}
		},
		{
			title: t("WCS名称"),
			width: 150,
			key: "wcsName",
			dialog: {
				defaultValue: ""
			}
		},
		{
			title: t("优先级"),
			width: 180,
			key: "priority",
			dialog: {
				defaultValue: 1
			}
		},
		{
			title: t("是否空托解绑"),
			width: 150,
			key: "isEmptyDismiss",
			type: "radio-group",
			options: [
				{ label: t("是"), value: true },
				{ label: t("否"), value: false }
			],

			dialog: {
				required: true,
				defaultValue: false
			}
		},
		{
			title: t("是否实托解盘"),
			width: 200,
			key: "isFullDismiss",
			type: "radio-group",
			options: [
				{ label: t("是"), value: true },
				{ label: t("否"), value: false }
			],

			dialog: {
				required: true,
				defaultValue: false
			}
		},
		{
			title: t("启用状态"),
			width: 120,
			key: "isEnable",
			search: true,
			type: "radio-group",
			options: [
				{ label: t("启用"), value: true },
				{ label: t("禁用"), value: false }
			],

			renderType: "status",
			valueEnum: {
				true: {
					title: t("启用"),
					type: "processing"
				},
				default: {
					title: t("禁用"),
					type: "error"
				}
			},
			dialog: {
				required: true,
				defaultValue: true
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 120,
		fixed: "right",
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
				api={getRoutingData}
				searchExtend={{ visibleRow: 1 }}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delRouting}
				dialogFormExtend={{
					fields: [...fields],
					addApi: async res => {
						console.log("res>>", res);
						res.toAreaName = "";
						res.fromAreaName = "";
						return await addRouting(res);
					},
					updateApi: updateRouting,
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
