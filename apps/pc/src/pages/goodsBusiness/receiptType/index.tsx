import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import { useRef } from "react";
import service from "../services";
// import SelectSearch from "@/components/selectSearch";
export default function SystemConfigration() {
	const { t } = useTranslation();
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const tableRef = useRef(null);
	// const fields: Array<MwSearchTableField> = [
	// 	{
	// 		title: "收货类型名称",
	// 		key: "receiptTypeName",
	// 		type: "search-select",
	// 		optionApi: service.postStocktakeList,
	// 		shiftOptions: {
	// 			label: "targetAreaName",
	// 			value: "id"
	// 		},
	// 		// options: [{ label: 1, value: 1 }],
	// 		dialog: true,
	// 		search: {
	// 			type: "search-select",
	// 			optionApi: service.postStocktakeList,
	// 			shiftOptions: {
	// 				label: "targetAreaName",
	// 				value: "id"
	// 			}
	// 		}
	// 	}
	// ];
	const fields: Array<MwSearchTableField> = [
		{
			title: t("收货类型名称"),
			key: "receiptTypeName",
			dialog: true,
			search: true
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
		<>
			<MwSearchTable
				ref={tableRef}
				api={service.ReceiptTypeList}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={async res => {
					return await service.ReceiptTypeDel(res[0]);
				}}
				dialogFormExtend={{
					fields: [...fields],
					addApi: async res => {
						return await service.ReceiptTypeAdd(Object.assign(res as Object, { id: "0" }));
					},
					updateApi: service.ReceiptTypeEdit,
					width: "50%",
					span: 24,
					dialogOnly: true
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
		</>
	);
}
