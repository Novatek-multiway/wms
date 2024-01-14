import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import service from "../services";
import Loading from "@/components/loading";
import useConvertorRequest from "@/hooks/useConvertorRequest";

export default function EquipmentArchives() {
	const { t } = useTranslation();
	const { getEquipmentData, delEquipment, addEquipment, updateEquipment, getEquipmentTypeData } = service;

	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 12 } };

	const tableRef = useRef(null);
	const equipmentTypeOptions = useConvertorRequest(getEquipmentTypeData, { label: "name", value: "id" });

	const fields: Array<MwSearchTableField> = [
		{
			title: t("设备编号"),
			key: "code",
			width: 120,
			ellipsis: true,
			dialog: {}
		},
		{
			title: t("设备名称"),
			width: 150,
			key: "name",
			dialog: {}
		},
		{
			title: t("设备类型"),
			width: 120,
			key: "equipmentTypeName"
		},
		{
			title: t("启用状态"),
			width: 120,
			key: "isEnable",
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
			dialog: {}
		}
	];

	const otherFields: Array<MwSearchTableField> = [
		{
			title: t("设备类型"),
			key: "equipmentTypeId",
			type: "select",
			options: equipmentTypeOptions,
			dialog: {}
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
				api={getEquipmentData}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delEquipment}
				dialogFormExtend={{
					fields: [...fields, ...otherFields],
					addApi: addEquipment,
					updateApi: updateEquipment,
					width: "40%",
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
