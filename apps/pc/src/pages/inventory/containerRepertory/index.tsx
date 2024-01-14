import { useTranslation } from "react-i18next";

import {
	MwAction,
	MwButton,
	MwCtrl,
	MwSearchTable,
	MwSearchTableField,
	MwTableCtrlField,
	Record,
	setDefaultDataFilter
} from "multiway";
import { useRef } from "react";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import useEnumOptions from "@/hooks/useEnumOptions";
import { GetAreaSelectItemList } from "@/pages/basicConfiguration/material/services/materialFile";
import service from "../services";

export default function ContainerRepertory() {
	const { t } = useTranslation();
	const { GetPageContainerInventory, getContainerTypeData } = service;

	setDefaultDataFilter((res: any) => {
		// return 的对象需要包含以下两条数据
		return {
			// 表格列表的数据
			content: res.resultData.pageData,
			// 数据总共 n 条
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const tableRef = useRef(null);
	const carryStatusOptions = useEnumOptions("EnumCarryStatus", "itemId");
	const fields: Array<MwSearchTableField> = [
		{
			title: t("容器编号"),
			key: "containerCode",
			width: 150,
			search: true
		},
		{
			title: t("容器类型"),
			key: "containerTypeName",
			width: 150
		},
		{
			title: t("载货状态"),
			key: "carryStatus",
			width: 150,
			options: carryStatusOptions
		},
		{
			title: t("数量"),
			key: "containerQuantity",
			width: 150
		},
		{
			title: t("位置编号"),
			key: "customCode",
			width: 150
		},
		{
			title: t("区域名称"),
			key: "areaCode",
			width: 150,
			render: (text, record) => `${text}(${record.areaName})`
		}
	];

	return (
		<MwSearchTable
			ref={tableRef}
			api={GetPageContainerInventory}
			searchExtend={{ visibleRow: 1 }}
			fields={fields}
			rowKey="id"
		></MwSearchTable>
	);
}
