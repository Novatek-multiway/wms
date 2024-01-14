import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import service from "../services";
import Loading from "@/components/loading";

export default function SpaceTypeManagement() {
	const { t } = useTranslation();
	const { getLocationTypeData, delLocationType, addLocationType, updateLocationType } = service;
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});

	const tableRef = useRef(null);
	const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 12 } };

	const fields: Array<MwSearchTableField> = [
		{
			title: t("货位类型名称"),
			key: "locationTypeName",
			align: "center",
			width: 150,
			search: true,
			dialog: { required: true }
		},
		{
			title: t("货位高度"),
			width: 120,
			key: "locationHeight",
			align: "center",
			type: "number",
			dialog: {
				required: true,
				align: "left",
				addonAfter: "mm",
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("货位宽度"),
			align: "center",
			width: 150,
			key: "locationWidth",
			type: "number",
			dialog: {
				required: true,
				align: "left",
				addonAfter: "mm",
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("货位类型描述"),
			align: "center",
			// width: 150,
			key: "locationTypeDescription",
			type: "textarea",
			dialog: {
				required: true,
				align: "left"
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
				api={getLocationTypeData}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delLocationType}
				dialogFormExtend={{
					fields: [...fields],
					addApi: addLocationType,
					updateApi: updateLocationType,
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
