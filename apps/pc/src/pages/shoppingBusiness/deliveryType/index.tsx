import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import { useRef } from "react";
import services from "../services";
import { setDefaultDataFilter, setDefaultSearchFilter } from "multiway";

export default function DeliveryType() {
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
			title: t("发货类型名称"),
			key: "invoiceTypeName",
			search: true,
			dialog: {
				required: true,
				span: 12
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
			api={services.GetPageDataInvoiceType}
			fields={fields}
			rowKey="id"
			ctrl={ctrl}
			deleteApi={async res => {
				return await services.DeleteInvoiceType({ id: res[0] });
			}}
			dialogFormExtend={{
				fields: [...fields],
				addApi: services.AddInvoiceType,
				updateApi: services.UpdateInvoiceType,
				width: "50%",
				span: 12,
				dialogOnly: true
			}}
		>
			<MwAction action="add">{t("新增")}</MwAction>
		</MwSearchTable>
	);
}
