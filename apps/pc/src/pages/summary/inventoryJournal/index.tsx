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
import services from "../services";

export default function InventoryJournal() {
	const { t } = useTranslation();
	const { GetPageInventoryJournal, getContainerTypeData } = services;

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

	const qualityStatusOptions = useEnumOptions("EnumQualityStatus", "itemId");
	const journalTypeOptions = useEnumOptions("EnumInventoryJournalType", "itemId");
	const containerTypeOption = useConvertorRequest(getContainerTypeData, { label: "name", value: "id" });

	const tableRef = useRef(null);
	const fields: Array<MwSearchTableField> = [
		{
			title: t("操作位置"),
			key: "customCode",
			width: 150
		},
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
			search: true,
			options: containerTypeOption,
			type: "select"
		},
		{
			title: t("物料编码"),
			key: "materialCode",
			width: 180,
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
			title: t("质量状态"),
			key: "qualityStatus",
			width: 150,
			options: qualityStatusOptions
		},
		{
			title: t("批次号"),
			key: "batchNumber",
			width: 150
		},
		{
			title: t("有效期天数"),
			key: "expiresDays",
			width: 150
		},
		{
			title: t("流水日期"),
			key: "createTime",
			width: 150
		},
		{
			title: t("库存流水类型"),
			key: "journalType",
			width: 150,
			options: journalTypeOptions
		},
		{
			title: t("流水数量"),
			key: "changeQuantity",
			width: 150
		}
	];

	return (
		<MwSearchTable
			ref={tableRef}
			api={GetPageInventoryJournal}
			searchExtend={{ visibleRow: 1 }}
			fields={fields}
			rowKey="id"
		></MwSearchTable>
	);
}
