import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import { useRef } from "react";
import { getMaterialPack, updateMaterialPack, delMaterialPack, addMaterialPack } from "../services/materialPack";
import { setDefaultDataFilter, setDefaultSearchFilter } from "multiway";

export default function MaterialPack() {
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
	const options = [
		{ label: t("是"), value: true },
		{ label: t("否"), value: false }
	];

	const fields: Array<MwSearchTableField> = [
		{
			title: t("物料包装编码"),
			width: 130,
			key: "packagingCode",
			search: true,
			dialog: {
				required: true,
				span: 12
			}
		},
		{
			title: t("单位名称"),
			width: 130,
			tooltip: t("物料包装名称（单位名称)"),
			key: "packagingName",
			search: true,
			dialog: {
				required: true,
				span: 12
			}
		},
		{
			title: t("是否最小包装"),
			width: 130,
			key: "isSkuPackaging",
			search: true,
			type: "radio-group",
			options,
			dialog: {
				required: true,
				defaultValue: true,
				span: 12
			}
		},
		{
			title: t("单位数量"),
			width: 130,
			key: "unitQuantity",
			search: false,
			dialog: {
				required: true
			}
		},
		{
			title: t("描述信息"),
			width: 200,
			ellipsis: "true",
			key: "packagingDescription",
			search: false,
			type: "textarea",
			dialog: {
				required: false,
				span: 24
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 90,
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
		<MwSearchTable
			ref={tableRef}
			api={getMaterialPack}
			fields={fields}
			rowKey="id"
			ctrl={ctrl}
			deleteApi={async res => {
				return await delMaterialPack({ id: res[0] });
			}}
			dialogFormExtend={{
				fields: [...fields],
				addApi: addMaterialPack,
				updateApi: updateMaterialPack,
				width: "50%",
				span: 12,
				dialogOnly: true
			}}
		>
			<MwAction action="add">{t("新增")}</MwAction>
		</MwSearchTable>
	);
}
