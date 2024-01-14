import { useTranslation } from "react-i18next";
import { pick } from "lodash";
import {
	MwAction,
	MwSearchTable,
	MwSearchTableField,
	MwTableCtrlField,
	Record,
	setDefaultDataFilter,
	useOptions
} from "multiway";
import { useRef } from "react";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import useStatusOptions from "@/hooks/useStatusOptions";
import { GetAreaSelectItemList } from "@/pages/basicConfiguration/material/services/materialFile";
import { useStore } from "@/store";
import service from "../services";
import { commonOptions } from "./common/constants";
import DetailTable from "./components/detailTable";
import EditTable, { IRef } from "./components/editTable";
import Operations from "./components/operations";
import moment from "moment";

export default function Invoice() {
	const { t } = useTranslation();
	const { goodsStore } = useStore();
	const invoiceTypeOptions = useConvertorRequest(service.GetPageDataInvoiceType, { label: "valueLabel", value: "id" }, [
		"resultData"
	]);
	const qualityStatusOptions = useConvertorRequest(service.getEnumQualityStatus, { label: "itemName", value: "itemId" }, [
		"resultData"
	]);
	const { options: supplierOptios } = useOptions(service.getContacts, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData", "pageData"],
		keepOrigin: true,
		transform: {
			label: "contactName",
			value: "id"
		}
	});
	goodsStore.setQualityStatusOptions(qualityStatusOptions);
	const targetAreaOptions = useConvertorRequest(GetAreaSelectItemList, { label: "itemName", value: "itemId" }, ["resultData"]);
	const { options: invoiceStatusOptions, statusEnum } = useStatusOptions(service.getInvoiceStatusList);

	const api = (params: any) => {
		return service.InvoiceHeaderList(params);
	};

	setDefaultDataFilter((res: any) => {
		return {
			content: res?.resultData?.pageData ?? [],
			// 数据总共 n 条
			totalCount: res?.resultData?.totalCount ?? 0,
			...res
		};
	});

	const tableRef = useRef<any>(null);
	const editTableRef = useRef<IRef>(null);
	const fields: Array<MwSearchTableField> = [
		{
			title: t("发货编号"),
			key: "invoiceCode",
			width: 150,
			search: true,
			dialog: {
				required: false
			}
		},
		{
			title: t("发货类型"),
			key: "invoiceTypeId",
			width: 120,
			search: true,
			dialog: {
				required: true
			},
			type: "select",
			options: invoiceTypeOptions
		},
		{
			title: t("发货单状态"),
			key: "invoiceStatus",
			width: 120,
			type: "select",
			options: invoiceStatusOptions,
			renderType: "status",
			valueEnum: statusEnum
		},
		{
			title: t("出库区域"),
			key: "outboundAreaId",
			width: 150,
			search: true,
			dialog: {
				required: true
			},
			type: "select",
			options: targetAreaOptions
		},
		{
			title: t("质量状态"),
			key: "qualityStatus",
			width: 100,
			search: true,
			dialog: {
				required: true,
				defaultValue: 2
			},
			type: "select",
			options: qualityStatusOptions
		},
		{
			title: t("自动分配"),
			key: "isAutoAllocation",
			width: 80,
			type: "radio-group",
			dialog: {
				defaultValue: true
			},
			options: commonOptions
		},
		{
			title: t("客户名称"),
			key: "customName",
			width: 150,
			dialog: {},
			type: "select",
			options: supplierOptios.filter(item => item.isCustomer)
		},
		{
			title: t("出库日"),
			key: "outTime",
			width: 200,
			type: "date",
			dialog: {
				defaultValue: moment().format()
			}
		},
		{
			title: t("创建人"),
			key: "createName",
			width: 120
		},
		{
			title: t("创建时间"),
			key: "createTime",
			width: 160
		},
		{
			title: t("描述信息"),
			key: "invoiceHeaderDescription",
			dialog: {
				required: false
			},
			type: "textarea",
			ellipsis: "true",
			width: 130
		},
		{
			title: "",
			key: "invoiceLineList",
			type: "custom",
			table: false,
			hiddenMode: ["view"],
			renderContent: (_, record: Record) => <EditTable ref={editTableRef} record={record} />,
			dialog: {
				span: 24
			}
		}
	];

	const ctrl: MwTableCtrlField = {
		title: t("operation"),
		width: 250,
		fixed: "right",
		render: (_, record: Record) => <Operations record={record as any} refresh={() => tableRef?.current?.refresh()} />
	};
	const renderExpand = (record: Record) => {
		return <DetailTable record={record} statusEnum={statusEnum} />;
	};
	return (
		<>
			<MwSearchTable
				ref={tableRef}
				api={api}
				fields={fields}
				rowKey="invoiceCode"
				ctrl={ctrl}
				deleteApi={async res => {
					return await service.DeleteOrderAndLine({ invoiceCode: res[0] });
				}}
				dialogFormExtend={{
					fields: [...fields],
					addApi: async res => {
						const invoiceLineList = (editTableRef?.current?.getTableData?.() ?? []).map((item: Record) => ({
							...item,
							id: 0,
							batchNumber: item.batchNumber || "",
							invoiceLineDescription: item.invoiceLineDescription || "",
							grade: item?.grade ?? "",
							colour: item?.colour ?? ""
						}));
						return await service.AddInvoiceHeader(Object.assign(res as Object, { id: 0, invoiceLineList }));
					},
					updateApi: async res => {
						const invoiceLineList = (editTableRef?.current?.getTableData?.() ?? []).map((item: Record) => ({
							...item,
							id: typeof item.id === "string" ? item.id : 0,
							batchNumber: item.batchNumber || "",
							invoiceLineDescription: item.invoiceLineDescription || ""
						}));
						return await service.UpdateInvoiceHeader(
							Object.assign(
								pick(res, [
									"id",
									"invoiceCode",
									"invoiceTypeId",
									"outboundAreaId",
									"qualityStatus",
									"invoiceHeaderDescription",
									"isAutoAllocation",
									"customName",
									"outTime"
								]) as Object,
								{ invoiceLineList }
							)
						);
					},
					width: "50%",
					span: 12,
					dialogOnly: true
				}}
				tableExtend={{
					expandable: {
						expandedRowRender: renderExpand,
						rowExpandable: (record: Record) => record.invoiceLineList && record.invoiceLineList.length
					}
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
		</>
	);
}
