import { useTranslation } from "react-i18next";
import {
	MwAction,
	MwSearchTable,
	MwSearchTableField,
	MwTableCtrlField,
	Record,
	setDefaultDataFilter,
	useOptions
} from "multiway";
import { FC, useRef, Suspense, useMemo } from "react";
import service from "../services";
import EditTable from "./components/editTable";
import Loading from "@/components/loading";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import { useStore } from "@/store/index";
import { observer } from "mobx-react-lite";
import Operations from "./components/Operations";
import { pick, omit } from "lodash";
import useStatusOptions from "@/hooks/useStatusOptions";

const Receipt: FC = () => {
	const { t } = useTranslation();
	const { goodsStore } = useStore();
	const { postReceiptHeaderList, ReceiptHeaderAdd, ReceiptHeaderUpdate, getContacts, ReceiptTypeList, getEnumReceiptStatus } =
		service;
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

	const receiptTypeOptios = useConvertorRequest(
		ReceiptTypeList,
		option => ({
			...option,
			value: option.id,
			label: option.valueLabel
		}),
		["resultData"]
	);

	const defaultReceiptTypeOption = useMemo(
		() => receiptTypeOptios.find((option: Record) => option.isDefault)?.value ?? "",
		[receiptTypeOptios]
	);

	const { options: receiptStatus, statusEnum } = useStatusOptions(getEnumReceiptStatus);

	const { options: supplierOptios } = useOptions(getContacts, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData", "pageData"],
		keepOrigin: true,
		transform: {
			label: "contactName",
			value: "id"
		}
	});

	const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
	const tableRef = useRef(null);
	const fields: Array<MwSearchTableField> = [
		{
			title: t("收货单号"),
			key: "receiptCode",
			width: 160,
			fixed: "left",
			search: true
		},
		{
			title: t("收货状态"),
			key: "receiptStatus",
			width: 120,
			options: receiptStatus,
			renderType: "status",
			valueEnum: statusEnum
		},
		{
			title: t("收货类型"),
			key: "receiptTypeId",
			width: 150,
			type: "select",
			options: receiptTypeOptios,
			dialog: {
				required: true,
				defaultValue: defaultReceiptTypeOption
			}
		},
		{
			title: t("供应商"),
			key: "supplierId",
			width: 120,
			type: "select",
			options: supplierOptios.filter(item => item.isSupplier),
			dialog: {
				required: true
			}
		},
		{
			title: t("创建时间"),
			key: "createTime",
			width: 120,
			renderType: "datetime",
			format: "YYYY-MM-DD"
		},
		{
			title: t("描述信息"),
			key: "receiptHeaderDescription",
			width: 120,
			type: "textarea",
			dialog: {
				span: 24
			},
			formItemProps: {
				labelCol: { span: 4 },
				wrapperCol: { span: 20 }
			}
		},
		{
			title: "",
			key: "receiptLineList",
			type: "custom",
			table: false,
			hiddenMode: ["view"],
			renderContent: (_, record: Record) => <EditTable data={record} receiptStatus={receiptStatus} statusEnum={statusEnum} />,
			dialog: { span: 24 },
			formItemProps: {
				labelCol: { span: 4 },
				wrapperCol: { span: 24 }
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 180,
		fixed: "right",
		render: (_, record: Record) => <Operations record={record} refresh={() => tableRef?.current?.refresh()} />
	};
	const otherFields: Array<MwSearchTableField> = [
		{
			title: t("收货单号"),
			key: "receiptCode",
			width: 160,
			fixed: "left",
			hiddenMode: ["update"],
			dialog: true
		},
		{
			title: t("收货单号"),
			key: "receiptCode",
			width: 160,
			fixed: "left",
			hiddenMode: ["add", "view"],
			disabled: true,
			dialog: true
		}
	];

	const searchFields = [
		{
			title: t("收货单号"),
			key: "receiptCode",
			width: 160
		},
		{
			title: t("收货状态"),
			key: "receiptStatusList",
			width: 120,
			search: true,
			type: "select",
			options: receiptStatus,
			mode: "multiple"
		}
	];

	const renderExpand = (record: Record) => {
		return <EditTable data={record} type={"view"} receiptStatus={receiptStatus} statusEnum={statusEnum} />;
	};
	// 统一处理body提交
	const unifiedBody = res => {
		const editTableRefData = goodsStore.editTableRef?.current.getTableData();
		const receiptLines = editTableRefData.map(v => {
			return {
				// ...v,
				...pick(v, ["receiptLineNumber", "materialId", "materialModelId", "batchNumber", "qualityStatus", "receivableQuantity"]),
				receiptCode: res.receiptCode
			};
		});
		return receiptLines;
	};
	return (
		<Suspense fallback={<Loading>Loading...</Loading>}>
			<MwSearchTable
				ref={tableRef}
				api={postReceiptHeaderList}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				searchExtend={{
					visibleRow: 1,
					fields: searchFields
				}}
				deleteApi={async res => {
					return await service.ReceiptTypeDel(res[0]);
				}}
				beforeSubmit={params => {
					console.log("params>>", params);
				}}
				dialogFormExtend={{
					fields: [...otherFields, ...fields],
					addApi: async res => {
						res.id = 0;
						return await ReceiptHeaderAdd({ ...omit(res, ["receiptLineList"]), receiptLines: unifiedBody(res) });
					},
					updateApi: async res => {
						return await ReceiptHeaderUpdate({
							...pick(res, ["id", "receiptCode", "receiptTypeId", "supplierId", "receiptHeaderDescription"]),
							receiptLines: unifiedBody(res)
						});
					},
					width: "65%",
					span: 12,
					dialogOnly: true,
					formExtend: {
						...formLayout
					}
				}}
				tableExtend={{
					expandable: { expandedRowRender: renderExpand }
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
		</Suspense>
	);
};

export default observer(Receipt);
