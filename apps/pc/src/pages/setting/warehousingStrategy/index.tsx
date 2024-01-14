import { useTranslation } from "react-i18next";
import React, { memo, useRef } from "react";
import type { PropsWithChildren, FC } from "react";
import { MwSearchTable, MwSearchTableField, MwTableCtrlField, MwAction, MwCtrl } from "multiway";

const WarehousingStrategy: FC<PropsWithChildren> = () => {
	const { t } = useTranslation();
	const fields: Array<MwSearchTableField> = [
		{
			title: t("作业流程"),
			key: "workProcess",
			width: 200
		},
		{
			title: t("作业工位"),
			key: "workStation",
			type: "select",
			options: [
				{
					label: t("工位1"),
					value: "1"
				},
				{
					label: t("工位2"),
					value: "2"
				}
			],

			width: 200,
			editable: true,
			renderType: "editable-cell-select",
			contentProps: {
				allowClear: true
			},
			formItemProps: {
				rules: [{ required: true, message: t("请选择作业工位") }]
			}
		},
		{
			title: t("生产物料"),
			key: "productionMaterials",
			type: "select",
			options: [
				{
					label: t("物料1"),
					value: "1"
				},
				{
					label: t("物料2"),
					value: "2"
				}
			],

			width: 200,
			editable: true,
			renderType: "editable-cell-select",
			contentProps: {
				allowClear: true
			},
			formItemProps: {
				rules: [{ required: true, message: t("请选择生产物料") }]
			}
		}
	];

	const data = [
		{
			workProcess: t("1号作业"),
			workStation: "1",
			productionMaterials: "1"
		},
		{
			workProcess: t("2号作业"),
			workStation: "2",
			productionMaterials: "2"
		}
	];

	const ctrl: MwTableCtrlField = {
		width: 200,
		render: (_, record) => {
			let actions = [];
			if (record.editing) {
				actions = [
					<MwAction key="editable-confirm" action="editable-confirm" record={record}>
						{t("确定")}
					</MwAction>,
					<MwAction key="editable-cancel" action="editable-cancel" record={record}>
						{t("取消")}
					</MwAction>
				];
			} else {
				actions = [
					<MwAction key="editable-update" action="editable-update" record={record}>
						{t("编辑")}
					</MwAction>
				];
			}
			return <MwCtrl>{actions}</MwCtrl>;
		}
	};
	const tableRef = useRef<any>(null);
	return (
		<MwSearchTable
			ref={tableRef}
			searchVisible={false}
			pagination={false}
			data={data}
			fields={fields}
			ctrl={ctrl}
			editMode="row"
			rowKey="sort_id"
			title={t("入库策略")}
		></MwSearchTable>
	);
};

export default memo(WarehousingStrategy);
