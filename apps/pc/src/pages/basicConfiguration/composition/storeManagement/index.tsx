import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import service from "../services";
import Loading from "@/components/loading";

export default function StoreManagement() {
	const { t } = useTranslation();
	const { getWarehouseList, delWarehouse, addWarehouse, updateWarehouse } = service;
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});

	const tableRef = useRef(null);
	const formLayout = { labelCol: { span: 10 }, wrapperCol: { span: 12 } };

	const fields: Array<MwSearchTableField> = [
		{
			title: t("仓库编码"),
			key: "warehouseCode",
			align: "center",
			width: 150,
			search: true,
			dialog: { required: true }
		},
		{
			title: t("仓库名称"),
			width: 150,
			key: "warehouseName",
			align: "center",
			search: true,
			dialog: {
				required: true,
				align: "left"
			}
		},
		{
			title: t("仓库别名"),
			align: "center",
			width: 150,
			key: "warehouseOtherName",
			dialog: {
				required: true
			}
		},
		{
			title: t("仓库描述"),
			align: "center",
			// width: 150,
			key: "warehouseDescribe",
			type: "textarea",
			dialog: {
				required: true,
				span: 24
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 120,
		fixed: "right",
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
		<Suspense fallback={<Loading>Loading...</Loading>}>
			<MwSearchTable
				ref={tableRef}
				api={getWarehouseList}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delWarehouse}
				dialogFormExtend={{
					fields: [...fields],
					addApi: addWarehouse,
					updateApi: updateWarehouse,
					width: "50%",
					span: 12,
					dialogOnly: true
					// formExtend: {
					// 	...formLayout
					// }
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
		</Suspense>
	);
}
