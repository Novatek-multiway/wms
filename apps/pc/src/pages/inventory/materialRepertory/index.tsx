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
import { post } from "@/http/request";
import { GetAreaSelectItemList } from "@/pages/basicConfiguration/material/services/materialFile";
import layout from "@/pages/layout";
import download from "@/utils/download";
import service from "../services";
import useEnumOptions from "@/hooks/useEnumOptions";

const materialItemDescriptionOptions = [
	{
		value: 1,
		label: "小包"
	},
	{
		value: 2,
		label: "吨包"
	}
];

export default function MaterialRepertory() {
	const { t } = useTranslation();
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
	const handleDownload = () => {
		download({ fileUrl: "/Storage/ExportData", fileName: t("库存数据.xls"), requestType: post });
	};
	const targetAreaOptions = useConvertorRequest(GetAreaSelectItemList, { label: "itemName", value: "itemValue" }, ["resultData"]);
	const qualityStatusOptions = useEnumOptions("EnumQualityStatus", "itemId");

	const tableRef = useRef(null);
	const fields: Array<MwSearchTableField> = [
		{
			title: t("容器编号"),
			key: "containerCode",
			search: true,
			width: 150
		},
		{
			title: t("LPN"),
			key: "lpn",
			width: 150
		},
		{
			title: t("制品种类"),
			key: "productType",
			width: 150
		},
		{
			title: t("制品名称"),
			key: "productName",
			width: 150
		},
		{
			title: t("等级"),
			key: "grade",
			width: 150
		},
		{
			title: t("尾箱区分"),
			key: "boxType",
			width: 150
		},
		{
			title: t("码垛包数"),
			key: "stackQuantity",
			width: 150
		},
		{
			title: t("码垛层"),
			key: "stackLayer",
			width: 150
		},
		{
			title: t("码垛位"),
			key: "stackLocation",
			width: 150
		},
		{
			title: t("国家"),
			key: "country",
			width: 150
		},
		{
			title: t("出料日"),
			key: "outDate",
			width: 150
		},
		{
			title: t("颜色"),
			key: "colour",
			width: 150
		},
		{
			title: t("BAG番号"),
			key: "bag",
			width: 150
		},
		{
			title: t("重量"),
			key: "weight",
			width: 150
		},
		{
			title: t("供应商CD"),
			key: "supplierCD",
			width: 150
		},
		{
			title: "包装方式",
			key: "materialItemDescription",
			width: 150,
			options: materialItemDescriptionOptions,
			search: true,
			type: "select"
		},
		{
			title: t("容器位置"),
			key: "customCode",
			width: 150
		},
		{
			title: t("所属区域"),
			key: "areaCode",
			width: 120,
			search: true,
			type: "select",
			options: targetAreaOptions
		},
		{
			title: t("行-列-层"),
			key: "positionAlias",
			width: 100
		},
		{
			title: t("物料编码"),
			key: "materialCode",
			width: 160,
			search: true,
			render: (text, record) => `${text}(${record.materialName})`
		},
		{
			title: t("规格"),
			key: "materialSize",
			width: 120
		},
		{
			title: t("质量状态"),
			key: "qualityStatus",
			width: 120,
			options: qualityStatusOptions,
			type: "select",
			search: true
		},
		{
			title: t("物料入库数量"),
			key: "inQuantity",
			width: 120
		},
		{
			title: t("物料出库数量"),
			key: "outQuantity",
			width: 120
		},
		{
			title: t("剩余数量"),
			key: "currentQuantity",
			width: 120
		},
		{
			title: t("有效期（天）"),
			key: "expiresDays",
			width: 120
		},

		{
			title: t("批次号"),
			key: "batchNumber",
			width: 120,
			search: true
		},
		{
			title: t("创建时间"),
			width: 180,
			key: "createTime"
		}
	];

	return (
		<MwSearchTable
			ref={tableRef}
			scrollX={1200}
			api={service.postStorageList}
			searchExtend={{ visibleRow: 1 }}
			fields={fields}
			rowKey="id"
		>
			<MwButton type="primary" onClick={handleDownload}>
				{t("导出")}
			</MwButton>
		</MwSearchTable>
	);
}
