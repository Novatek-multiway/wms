import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter, useOptions } from "multiway";
import service from "../services";
import Loading from "@/components/loading";
import useConvertorRequest from "@/hooks/useConvertorRequest";

export default function ContainerArchives() {
	const { t } = useTranslation();
	const { getContainerData, delContainer, addContainer, updateContainer, getContainerTypeData, getCarryStatus } = service;

	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 12 } };

	const tableRef = useRef(null);
	const {options: containerTypeOption} = useOptions(getContainerTypeData, {
		params: {
			query: { isEnable: true },
			pageIndex: 1, 
			pageSize: 100 
		},
		transform: {
			label: "name",
			value: "id"
		},
		path: ["resultData", "pageData"]
	})
	const carryStatusOptions = useConvertorRequest(getCarryStatus, { label: "itemName", value: "itemId" }, ["resultData"]);
	const fields: Array<MwSearchTableField> = [
		{
			title: t("容器编号"),
			key: "containerCode",
			width: 120,
			search: true,
			ellipsis: true,
			dialog: {
				required: true
			}
		},
		{
			title: t("容器条码"),
			width: 150,
			key: "barcode",
			search: false,
			hidden: true
		},
		{
			title: t("容器类型"),
			width: 200,
			type: "select",
			key: "containerTypeId",
			options: containerTypeOption, // 容器类型,
			dialog: {
				required: true
			}
		},
		{
			title: t("容器载货状态"),
			width: 150,
			key: "carryStatus",
			type: "select",
			options: carryStatusOptions,
			dialog: {
				defaultValue: carryStatusOptions?.[0]?.value ?? 0,
				required: true
			}
		},
		{
			title: t("容器数量"),
			width: 150,
			key: "containerQuantity",
			type: "number",
			dialog: {
				defaultValue: 1,
				required: true,
				hidden: true
			},
			hidden: true
		},
		{
			title: t("容器位置编号"),
			width: 150,
			key: "locationCode"
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
			dialog: { defaultValue: true, required: true }
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		align: "center",
		width: 120,
		fixed: "right",
		render: (_, record: Record) => (
			<MwCtrl>
				<MwAction record={record} action="update">
					{t("编辑")}
				</MwAction>
			</MwCtrl>
		)
	};

	return (
		<Suspense fallback={<Loading></Loading>}>
			<MwSearchTable
				ref={tableRef}
				api={getContainerData}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delContainer}
				dialogFormExtend={{
					fields: [...fields],
					addApi: async res => {
						res.id = 0; // 新增时为0
						res.locationId = 0;
						return await addContainer(res);
					},
					updateApi: async res => {
						return await updateContainer(res);
					},
					width: "50%",
					span: 24,
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
