import { t } from 'i18next';
import { MwSearchTable, MwSearchTableField } from 'multiway';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import services from '../../services';

const invoiceStatusOptions = [
	{ label: t("新增"), value: 1 },
	{ label: t("激活"), value: 2 },
	{ label: t("执行"), value: 3 },
	{ label: t("完成"), value: 4 },
	{ label: t("取消"), value: 5 },
	{ label: t("波次"), value: 6 }
];

const fields: Array<MwSearchTableField> = [
	{
		title: t("发货单头编号"),
		key: "invoiceCode",
		search: {
			type: "search",
			position: "more"
		}
	},
	{
		title: t("发货单名称"),
		key: "invoiceName"
	},
	{
		title: t("发货单状态"),
		key: "invoiceStatus",
		type: "select",
		options: invoiceStatusOptions
	},
	{
		title: t("描述信息"),
		key: "invoiceHeaderDescription"
	}
];

const BillTable = (props: any, ref: any) => {
	const { t } = useTranslation();
	return (
		<MwSearchTable
			title={t("发货单")}
			ref={ref}
			extraVisible={false}
			rowKey="id"
			selectionType="checkbox"
			selectShowKey="invoiceCode"
			api={services.GetPageDataForWave}
			fields={fields}
		/>
	);
};

export default forwardRef(BillTable);
