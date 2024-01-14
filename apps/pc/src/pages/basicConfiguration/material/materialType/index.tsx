import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import { useRef } from "react";
import { getMaterialType, updateMaterialType, delMaterialType, addMaterialType } from "../services/materialType";
import { setDefaultDataFilter, setDefaultSearchFilter } from "multiway";

export default function MaterialType() {
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
	const tableRef = useRef(null);
	const fields: Array<MwSearchTableField> = [
		{
			title: t("物料名称"),
			key: "materialTypeName",
			search: true,
			width: 150,
			dialog: {
				required: true,
				span: 12
			}
		},
		{
			title: t("描述信息"),
			key: "materialTypeDescription",
			search: false,
			type: "textarea",
			ellipsis: "true",
			dialog: {
				span: 24
			}
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
		<MwSearchTable
			ref={tableRef}
			api={getMaterialType}
			fields={fields}
			rowKey="id"
			ctrl={ctrl}
			deleteApi={async res => {
				return await delMaterialType({ id: res[0] });
			}}
			dialogFormExtend={{
				fields: [...fields],
				addApi: addMaterialType,
				updateApi: updateMaterialType,
				width: "50%",
				span: 12,
				dialogOnly: true
			}}
		>
			<MwAction action="add">{t("新增")}</MwAction>
		</MwSearchTable>
	);
}
