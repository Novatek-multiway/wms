import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import { useRef } from "react";
import { getMaterialFile, getAreaData, getReceiptHeaderData } from "../services/materialFile";
import { setDefaultDataFilter, setDefaultSearchFilter } from "multiway";
import { getQualityStatus, getMaterialInfo } from "../services/materialInfo";
import { getMaterialPack } from "../services/materialPack";
import { getMaterialSupply } from "../services/materialSupply";
import { getMaterialForm } from "../services/materialForm";
import { getMaterialType } from "../services/materialType";
import UseConvertorRequest from "@/hooks/useConvertorRequest";
import { defaultDate } from "@/utils/date";
import { Cascader } from "antd";
import useLocationCodeOptions from "@/pages/shoppingBusiness/picking/hooks/useLocationCodeOptions";
import { last } from "lodash";

export default function MaterialFile() {
	const { t } = useTranslation();
	const materialInfoOptions = UseConvertorRequest(getMaterialInfo, { label: "materialCode", value: "materialCode" });
	const materialPackOptions = UseConvertorRequest(getMaterialPack, { label: "packagingName", value: "id" });
	const qualityStatusOptions = UseConvertorRequest(
		getQualityStatus,
		option => ({ label: option.itemName, value: option.itemId }),
		["resultData"]
	);
	const { locationCodeOptions } = useLocationCodeOptions();
	const materialTypeOptions = UseConvertorRequest(getMaterialType, { label: "valueLabel", value: "id" }, ["resultData"]);
	const receiveAreaOptions = UseConvertorRequest(getAreaData, { label: "areaName", value: "id" });
	const supplierOptions = UseConvertorRequest(getMaterialSupply, { label: "contactName", value: "id" });
	const receiptCodeOptions = UseConvertorRequest(getReceiptHeaderData, { label: "receiptName", value: "id" });
	const areaTypeOptions = [
		{ value: 1, label: t("货位") },
		{ value: 2, label: t("工位") }
	];

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

	const api = (res: any) => {
		if (res?.query?.locationCode && Array.isArray(res.query.locationCode)) {
			res.query = {
				...res.query,
				locationCode: last(res.query.locationCode)
			};
			return getMaterialFile(res);
		}
		return getMaterialFile(res);
	};

	const tableRef = useRef(null);
	const fields: Array<MwSearchTableField> = [
		{
			title: t("物料编码"),
			width: 150,
			key: "materialCode",
			search: false,
			type: "select",
			options: materialInfoOptions
		},
		{
			title: t("物料名称"),
			width: 150,
			key: "materialName",
			search: true
		},
		{
			title: t("收货数量"),
			width: 150,
			key: "quantity",
			search: false,
			type: "number"
		},
		{
			title: t("收货日期"),
			width: 150,
			key: "receivingDate",
			search: false,
			type: "custom",
			render(text) {
				return defaultDate(text as string, "YYYY/MM/DD");
			}
		},
		{
			title: t("物料类型"),
			width: 120,
			key: "materialTypeId",
			search: true,
			type: "select",
			options: materialTypeOptions
		},
		{
			title: t("物料包装"),
			width: 150,
			key: "packagingName",
			search: false
		},
		{
			title: t("物料最小包装"),
			key: "skuPackagingId",
			search: false,
			type: "select",
			table: false,
			options: materialPackOptions
		},
		{
			title: t("规格"),
			width: 200,
			key: "materialSize",
			search: false
		},
		{
			title: t("质量状态"),
			width: 100,
			key: "qualityStatus",
			search: false,
			type: "select",
			options: qualityStatusOptions
		},
		{
			title: t("有效期"),
			width: 150,
			key: "expiresDays",
			search: false,
			type: "number"
		},

		{
			title: t("区域类型"),
			key: "receivingAreaType",
			search: false,
			type: "radio-group",
			table: false,
			options: areaTypeOptions
		},
		{
			title: t("收货区域"),
			width: 200,
			key: "areaId",
			search: false,
			type: "select",
			table: false,
			options: receiveAreaOptions
		},
		{
			title: t("收货位置"),
			width: 200,
			key: "locationCode"
		},
		{
			title: t("供应商"),
			width: 150,
			key: "supplierId",
			search: false,
			type: "select",
			options: supplierOptions
		},
		{
			title: t("收货单"),
			width: 150,
			key: "receiptCode",
			search: false,
			type: "select",
			options: receiptCodeOptions
		},
		{
			title: t("收货单行"),
			width: 150,
			key: "receiptLineNumber",
			search: false
		},
		{
			title: t("批次号"),
			width: 150,
			key: "batchNumber",
			search: false
		},
		{
			title: t("创建时间"),
			width: 200,
			key: "createTime",
			type: "custom",
			render(text) {
				return defaultDate(text as string);
			},
			search: false
		},
		{
			title: t("描述信息"),
			ellipsis: "true",
			width: 250,
			key: "materialItemDescription",
			search: false,
			type: "textarea"
		}
	];

	const searchFields: Array<MwSearchTableField> = [
		{
			title: t("物料名称"),
			width: 150,
			key: "materialName",
			search: true
		},
		{
			title: t("物料类型"),
			width: 120,
			key: "materialTypeId",
			search: true,
			type: "select",
			options: materialTypeOptions
		},
		{
			title: t("收货位置"),
			key: "locationCode",
			width: 150,
			search: true,
			type: "custom",
			renderContent: () => {
				return (
					<Cascader
						options={locationCodeOptions}
						displayRender={(labels: string[]) => labels[labels.length - 1]}
						style={{ width: "100%" }}
						placeholder={t("请选择收货位置")}
					/>
				);
			}
		}
	];

	return (
		<MwSearchTable
			ref={tableRef}
			api={api}
			fields={fields}
			searchExtend={{ fields: [...searchFields] }}
			rowKey="id"
		></MwSearchTable>
	);
}
