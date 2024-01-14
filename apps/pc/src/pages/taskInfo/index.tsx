import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Cascader, message } from "antd";
import {
	MwDialogForm,
	MwDialogFormField,
	MwAction,
	MwCtrl,
	MwSearchTable,
	MwSearchTableField,
	MwTableCtrlField,
	Record,
	setDefaultDataFilter,
	setDefaultSearchFilter,
	MwButton,
	useOptions
} from "multiway";
import { useRef, useState } from "react";
import UseConvertorRequest from "@/hooks/useConvertorRequest";
import CompositionServices from "@/pages/basicConfiguration/composition/services";
import { GetAreaSelectItemList } from "@/pages/basicConfiguration/material/services/materialFile";
import useLocationCodeOptions from "../shoppingBusiness/picking/hooks/useLocationCodeOptions";
import services from "./services";
import { last, omit, pick } from "lodash";

const taskTypeOptions = [
	{ value: 1, label: t("上架搬运/入库") },
	{ value: 2, label: t("下架搬运/出库") },
	{ value: 3, label: t("移库") },
	{ value: 4, label: t("越库") }
];

const taskStatus = [
	{ value: 1, label: t("新增") },
	{ value: 2, label: t("执行中") },
	{ value: 3, label: t("自动完成") },
	{ value: 4, label: t("手动完成") },
	{ value: 5, label: t("取消") }
];

type TServices = typeof services;

export default function TaskInfo() {
	const { t } = useTranslation();
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	setDefaultSearchFilter((res: any) => {
		const {
			pagination: { current, pageSize },
			search
		} = res;
		return { pageSize, pageIndex: current, query: search };
	});

	const api = res => {
		const newQuery = {
			...omit(res.query, ["fromCustomCode", "toCustomCode"]),
			fromPositionCode: res?.query?.fromCustomCode,
			toPositionCode: res?.query?.toCustomCode,
		}
		return services.GetPageDataTask({...res, query: newQuery});
	}

	const materialTypeOptions = UseConvertorRequest(CompositionServices.getContainerTypeData, { label: "name", value: "id" });
	const { options: containerCodeOptions, load: reloadContainerCodeOptions } = useOptions(services.getContainerData, {
		params: { pageIndex: 1, pageSize: 100, query: { isEnable: true } },
		path: ["resultData", "pageData"],
		keepOrigin: true,
		transform: {
			label: "containerCode",
			value: "containerCode"
		}
	});

	const areaOptions = UseConvertorRequest(GetAreaSelectItemList, { label: "itemName", value: "itemId" }, ["resultData"]);
	const { locationCodeOptions, load } = useLocationCodeOptions();
	const [visible, setVisible] = useState(false);
	const [record, setRecord] = useState<Record>();

	const tableRef = useRef<any>(null);
	const fields: Array<MwSearchTableField> = [
		{
			title: t("任务编号"),
			key: "taskCode",
			search: true,
			width: 150
		},
		{
			title: t("容器编号"),
			key: "containerCode",
			dialog: {
				type: "select",
				options: containerCodeOptions,
				span: 24
			},
			search: true,
			width: 200
		},
		{
			title: t("容器类型"),
			key: "containerTypeId",
			search: true,
			type: "select",
			options: materialTypeOptions,
			width: 150
		},
		{
			title: t("任务优先级"),
			key: "taskPriority",
			width: 120
		},
		{
			title: t("搬运任务类型"),
			key: "taskType",
			search: {
				mode: "multiple"
			},
			type: "select",
			options: taskTypeOptions,
			width: 150
		},
		{
			title: t("任务状态"),
			key: "taskStatus",
			search: {
				mode: "multiple"
			},
			type: "select",
			options: taskStatus,
			width: 100
		},
		{
			title: t("起始位置"),
			key: "fromCustomCode",
			dialog: {
				required: true,
				span: 24,
				type: "custom",
				renderContent: () => {
					return (
						<Cascader
							options={locationCodeOptions}
							displayRender={(labels: string[]) => labels[labels.length - 1]}
							style={{ width: "100%" }}
							placeholder={t("请选择起始位置")}
						/>
					);
				}
			},
			search: true,
			width: 200
		},
		{
			title: t("目标位置"),
			key: "toCustomCode",
			dialog: {
				required: true,
				type: "custom",
				span: 24,
				renderContent: () => {
					return (
						<Cascader
							options={locationCodeOptions}
							displayRender={(labels: string[]) => labels[labels.length - 1]}
							style={{ width: "100%" }}
							placeholder={t("请选择目标位置")}
						/>
					);
				}
			},
			search: true,
			width: 200
		},
		{
			title: t("是否自动搬运"),
			key: "isAutoCarry",
			search: false,
			type: "radio-group",
			options: [
				{ value: true, label: t("是") },
				{ value: false, label: t("否") }
			],

			dialog: {
				required: true,
				defaultValue: true,
				span: 24
			},
			width: 200
		},
		{
			title: t("起始区域"),
			key: "fromAreaId",
			type: "select",
			options: areaOptions,
			search: true,
			width: 200
		},
		{
			title: t("目标区域"),
			key: "toAreaId",
			type: "select",
			options: areaOptions,
			search: true,
			width: 200
		},
		{
			title: t("过账状态"),
			key: "postStatus",
			render: text => {
				return text == 1 ? t("未过账") : text == 2 ? t("过账成功") : t("过账失败");
			},
			width: 120
		},
		{
			title: t("过账状态描述"),
			key: "postStatusDescription",
			width: 150,
			ellipsis: "true"
		},
		{
			title: t("是否预警"),
			key: "isAlarm",
			render: text => {
				return text ? t("是") : t("否");
			},
			width: 120
		},
		{
			title: t("任务预警类型"),
			key: "taskAlarmType",
			render: text => {
				return text == 0 ? t("正常") : text == 1 ? t("入库占位异常") : text == 2 ? t("取空异常") : t("阻塞异常");
			},
			width: 170
		},
		{
			title: t("预警描述"),
			key: "alarmDescription",
			width: 150,
			ellipsis: "true"
		},
		{
			title: t("创建时间"),
			key: "createTime",
			width: 200
		}
	];

	const dialogFields: Array<MwDialogFormField> = [
		{
			title: t("起始位置"),
			key: "fromCustomCode",
			type: "custom",
			renderContent: () => {
				return (
					<Cascader
						disabled
						options={locationCodeOptions}
						displayRender={(labels: string[]) => labels[labels.length - 1]}
						style={{ width: "100%" }}
						placeholder={t("请选择起始位置")}
					/>
				);
			}
		},
		{
			title: t("目标位置"),
			key: "toCustomCode",
			type: "custom",
			renderContent: () => {
				return (
					<Cascader
						options={locationCodeOptions}
						displayRender={(labels: string[]) => labels[labels.length - 1]}
						style={{ width: "100%" }}
						placeholder={t("请选择目标位置")}
					/>
				);
			}
		}
	];

	const handlePostStatus = async (record: Record) => {
		try {
			await services.UpdatePostStatusTask({ taskId: record.id });
			message.success(t("操作成功！"));
			tableRef.current.refresh();
		} catch (e) {
			console.log(e);
			message.error(t("操作失败！"));
		}
	};

	async function handleOperateTask<T extends "ManualFinish" | "CancelTask">(data: Parameters<TServices[T]>[0], type: T) {
		try {
			await services[type](data);
			message.success(t("操作成功！"));
			tableRef.current.refresh();
		} catch (e) {
			console.log(e);
			message.error(t("操作失败！"));
		}
	}

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 150,
		fixed: "right",
		render: (_, record: Record) => {
			const options: any[] = [];
			if ((record.taskStatus == 3 || record.taskStatus == 4) && record.postStatus != 2) {
				options.push(
					<MwAction confirm={() => handlePostStatus(record)} confirmMsg={t("确定过账？")} record={record} action="confirm-action">
						{t("手动过账")}
					</MwAction>
				);
			}
			if (record.taskStatus == 1 || record.taskStatus == 2) {
				options.push(
					<MwAction
						confirm={() => handleOperateTask<"CancelTask">({ taskId: record.id }, "CancelTask")}
						confirmMsg={t("确定取消？")}
						record={record}
						danger
						action="confirm-action"
					>
						{t("取消")}
					</MwAction>,
					<MwButton
						onClick={() => {
							setRecord(record);
							setVisible(true);
							load();
						}}
					>
						{t("完成")}
					</MwButton>
				);
			}
			return <MwCtrl>{options}</MwCtrl>;
		}
	};
	return (
		<>
			<MwSearchTable
				ref={tableRef}
				api={api}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				dialogFormExtend={{
					fields: [...fields],
					addApi: (res: any) => {
						return services.StorageMova({
							...pick(res, ["isAutoCarry", "containerCode"]),
							fromLocation: last(res.fromCustomCode),
							toLocation: last(res.toCustomCode)
						});
					},
					width: "50%",
					span: 12,
					dialogOnly: true
				}}
			>
				<MwAction action="add" onOpen={load}>
					{t("新增")}
				</MwAction>
			</MwSearchTable>
			<MwDialogForm
				initialValues={{
					fromCustomCode: [record?.fromAreaId, record?.fromPositionCode],
					toCustomCode: [record?.toAreaId, record?.toPositionCode]
				}}
				title={t("确认")}
				visible={visible}
				fields={dialogFields}
				centered
				addApi={res => {
					return handleOperateTask(
						{ id: record?.id as string, targetLocation: last(res?.toCustomCode) as string },
						"ManualFinish"
					);
				}}
				onClose={() => setVisible(false)}
			/>
		</>
	);
}
