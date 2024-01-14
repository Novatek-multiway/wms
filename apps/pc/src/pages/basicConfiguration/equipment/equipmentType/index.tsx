import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import service from "../services";
import Loading from "@/components/loading";

export default function EquipmentType() {
	const { t } = useTranslation();
	const { getEquipmentTypeData, delEquipmentType, addEquipmentType, updateEquipmentType } = service;

	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 12 } };

	const tableRef = useRef(null);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("设备类型编号"),
			key: "code",
			width: 120,
			ellipsis: true,
			dialog: {}
		},
		{
			title: t("设备类型名称"),
			width: 150,
			key: "name",
			dialog: {}
		},
		{
			title: t("描述信息"),
			width: 150,
			key: "description",
			type: "textarea",
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
				api={getEquipmentTypeData}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delEquipmentType}
				dialogFormExtend={{
					fields: [...fields],
					addApi: addEquipmentType,
					updateApi: updateEquipmentType,
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
