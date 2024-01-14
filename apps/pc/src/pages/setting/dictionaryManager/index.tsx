import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, setDefaultDataFilter, MwButton } from "multiway";
import service from "./services";
import Loading from "@/components/loading";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import DictionaryValueTable from "./components/DictionaryValueTable";
import { formLayout } from "./common/constants";
import type { OutputDictionaryInfoDTO, OutputDictionaryValueInfoDTO } from "./common/type";

export interface IEditTableRef {
	getTableData?: () => OutputDictionaryValueInfoDTO[];
}

function DictinoaryManager() {
	const { t } = useTranslation();
	const { getBusinessTypeOptions, getDictionaryPageData, addDictionary, deleteDictionary, updateDictionary } = service;
	const businessTypeOptions = useConvertorRequest(getBusinessTypeOptions, { label: "itemName", value: "itemId" }, ["resultData"]);
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});

	const editTableRef = useRef<IEditTableRef>(null);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("字典名称"),
			key: "dictionaryName",
			width: 210,
			type: "input",
			dialog: {
				required: true
			},
			search: true
		},
		{
			title: t("业务类型"),
			key: "businessType",
			width: 150,
			type: "select",
			options: businessTypeOptions,
			dialog: {
				required: true
			},
			search: true
		},
		{
			title: t("字典值类型"),
			key: "dictionaryValueType",
			width: 150,
			type: "input",
			dialog: {
				required: true
			}
		},
		{
			title: t("备注"),
			key: "dictionaryRemark",
			width: 210,
			type: "input",
			dialog: {}
		},
		{
			title: t("排序"),
			key: "sortBy",
			width: 210,
			type: "number",
			dialog: {
				required: true,
				placeholder: t("sortNumber")
			},
		},
		{
			title: "",
			key: "dictionaryValueList",
			type: "custom",
			table: false,
			hiddenMode: ["view"],
			renderContent: (_, record: OutputDictionaryInfoDTO) => (
				<DictionaryValueTable data={record} ref={editTableRef} isView={false} />
			),
			dialog: { span: 24 },
			formItemProps: {
				labelCol: { span: 4 },
				wrapperCol: { span: 24 }
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 120,
		fixed: "right",
		render: (_, record: OutputDictionaryInfoDTO) => (
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

	const expandedRowRender = (record: OutputDictionaryInfoDTO) => {
		return <DictionaryValueTable data={record} isView={true} />;
	};

	return (
		<Suspense fallback={<Loading />}>
			<MwSearchTable
				api={getDictionaryPageData}
				searchExtend={{ visibleRow: 1 }}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={deleteDictionary}
				dialogFormExtend={{
					fields,
					addApi: async res => {
						const dictionaryValueList = (editTableRef?.current?.getTableData?.() ?? []).map(item => ({
							...item,
							id: 0,
							dictionaryId: 0
						}));
						return await addDictionary({ ...res, dictionaryValueList });
					},
					updateApi: async res => {
						const dictionaryValueList = (editTableRef?.current?.getTableData?.() ?? []).map(item => ({
							...item,
							id: typeof item.id === "string" ? item.id : 0,
							dictionaryId: typeof item.dictionaryId === "string" ? item.id : 0
						}));
						return await updateDictionary({ ...res, dictionaryValueList });
					},
					width: "70%",
					span: 8,
					dialogOnly: true,
					formExtend: {
						...formLayout
					}
				}}
				tableExtend={{
					expandable: {
						expandedRowRender,
						rowExpandable: (record: OutputDictionaryInfoDTO) => record.dictionaryValueList && record.dictionaryValueList.length
					}
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
		</Suspense>
	);
}

export default DictinoaryManager;
