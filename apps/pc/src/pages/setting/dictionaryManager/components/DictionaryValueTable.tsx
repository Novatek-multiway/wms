import { useTranslation } from "react-i18next";

import { MwAction, MwCtrl, MwSearchTable, MwTableCtrlField, MwSearchTableField, MwButton } from "multiway";
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle, ElementRef } from "react";
import { useRef } from "react";
import { BOOLEAN_OPTIONS } from "../common/constants";
import { OutputDictionaryInfoDTO, OutputDictionaryValueInfoDTO } from "../common/type";
import { IEditTableRef } from "..";

interface IProps {
	data: OutputDictionaryInfoDTO;
	isView: boolean;
}

interface ITable<T> {
	getTableData: () => T[];
}

const DictionaryValueTable: ForwardRefRenderFunction<IEditTableRef, IProps> = ({ data, isView = false }, ref) => {
	const { t } = useTranslation();
	const tableRef = useRef<ElementRef<typeof MwSearchTable> & ITable<OutputDictionaryValueInfoDTO>>(null);
	const fields: Array<MwSearchTableField> = [
		{
			title: t("字典值"),
			key: "dictionaryValue",
			width: 210,
			editable: true,
			type: "input",
			formItemProps: {
				rules: [{ required: true, message: t("请输入字典值") }]
			},
			contentProps: {
				placeholder: t("请输入字典值")
			}
		},
		{
			title: t("字典值标签"),
			key: "valueLabel",
			width: 150,
			type: "input",
			editable: true,
			formItemProps: {
				rules: [{ required: true, message: t("请输入字典值标签") }]
			},
			contentProps: {
				placeholder: t("请输入字典值标签")
			}
		},
		{
			title: t("是否默认"),
			key: "isDefault",
			width: 150,
			editable: true,
			renderType: "editable-cell-select",
			options: BOOLEAN_OPTIONS,
			contentProps: {
				placeholder: t("是否默认")
			}
		},
		{
			title: t("是否系统保留值"),
			key: "isSystem",
			width: 210,
			editable: true,
			renderType: "editable-cell-select",
			options: BOOLEAN_OPTIONS,
			contentProps: {
				placeholder: t("是否系统保留值")
			}
		},
		{
			title: t("备注"),
			key: "dictionaryValueRemark",
			width: 210,
			type: "input",
			editable: true,
			contentProps: {
				placeholder: t("备注")
			}
		},
		{
			title: t("排序"),
			key: "sortBy",
			width: 210,
			editable: true,
			renderType: "editable-cell-number",
			formItemProps: {
				rules: [{ required: true, message: t("请输入排序号") }]
			},
			contentProps: {
				precision: 0,
				placeholder: t("sortNumber")
			}
		}
	];

	useImperativeHandle(ref, () => ({
		getTableData: tableRef?.current?.getTableData
	}));

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 120,
		fixed: "right",
		render: (_, record) => {
			let actions = [];
			if (record.editing) {
				actions = [
					<MwAction key="editable-confirm" action="editable-confirm" record={record}>
						{t("确定")}
					</MwAction>,
					<MwAction key="editable-cancel" danger action="editable-cancel" record={record}>
						{t("取消")}
					</MwAction>
				];
			} else {
				actions = [
					<MwAction key="editable-update" action="editable-update" record={record}>
						{t("编辑")}
					</MwAction>,
					<MwAction key="editable-delete" danger action="editable-delete" record={record} disabled={record.isSystem}>
						{t("删除")}
					</MwAction>
				];
			}
			return <MwCtrl>{actions}</MwCtrl>;
		}
	};

	return (
		<MwSearchTable
			title={t("字典值")}
			ref={tableRef}
			searchVisible={false}
			pagination={{
				pageSize: 5
			}}
			extraVisible={false}
			data={data?.dictionaryValueList ?? []}
			fields={fields}
			editMode="row"
			rowKey="id"
			ctrl={!isView && ctrl}
			after={!isView && <MwAction action="editable-add">{t("新增")}</MwAction>}
		></MwSearchTable>
	);
};

export default forwardRef(DictionaryValueTable);
