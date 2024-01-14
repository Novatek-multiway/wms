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
import services from "../services";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import useEnumOptions from "@/hooks/useEnumOptions";

export default function RealtimeInventory() {
	const { t } = useTranslation();
	const { GetPageMaterialInventory, getContainerTypeData } = services;
	const containerTypeOption = useConvertorRequest(getContainerTypeData, { label: "name", value: "id" });
	const positionTypeOptions = useEnumOptions("EnumPositionType", "itemId");

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
	const fields: Array<MwSearchTableField> = [
		{
			title: t("物料编码"),
			key: "materialCode",
			width: 150,
			search: true,
			render: (text, record) => `${text}(${record.materialName})`
		},
		{
			title: t("物料规格"),
			key: "materialSize",
			width: 150
		},
		{
			title: t("单位"),
			key: "packagingName",
			width: 150
		},
		{
			title: t("库存数量"),
			key: "quantity",
			width: 150
		}
	];

	const childFields: Array<MwSearchTableField> = [
		{
			title: t("容器编号"),
			key: "containerCode",
			width: 150,
			search: true
		},
		{
			title: t("容器类型"),
			key: "containerTypeId",
			width: 150,
			options: containerTypeOption
		},
		{
			title: t("位置类型"),
			key: "positionType",
			width: 150,
			options: positionTypeOptions
		},
		{
			title: t("位置编号"),
			key: "customCode",
			width: 150
		},
		{
			title: t("排-列-层"),
			key: "positionAlias",
			width: 150
		},
		{
			title: t("区域编号"),
			key: "areaCode",
			width: 150,
			render: (text, record) => `${text}(${record.areaName})`
		},
		{
			title: t("库存数量"),
			key: "quantity",
			width: 150
		}
	];

	const expandedRowRender = (record: Record) => {
		return (
			<MwSearchTable
				data={record.inventoryList}
				// pagination={false}
				fields={childFields}
				extraVisible={false}
				searchVisible={false}
			/>
		);
	};

	return (
		<MwSearchTable
			ref={tableRef}
			api={GetPageMaterialInventory}
			searchExtend={{ visibleRow: 1 }}
			fields={fields}
			rowKey="materialId"
			tableExtend={{
				expandable: {
					expandedRowRender,
					rowExpandable: (record: Record) => record.inventoryList && record.inventoryList.length
				}
			}}
		></MwSearchTable>
	);
}
