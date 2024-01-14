import { useTranslation } from "react-i18next";
import React, { useRef, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import service from "../services";
import Loading from "@/components/loading";

export default function ContainerType() {
	const { t } = useTranslation();
	const { getContainerTypeData, delContainerType, addContainerType, updateContainerType } = service;

	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const formLayout = { labelCol: { span: 12 }, wrapperCol: { span: 12 } };

	const tableRef = useRef(null);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("容器类型名称"),
			key: "name",
			width: 120,
			ellipsis: true,
			search: true,
			dialog: {
				required: true
			}
		},
		{
			title: t("条码规则"),
			width: 150,
			key: "barcodeRule",
			tooltip: t("正则表达式"),
			dialog: {}
		},
		{
			title: t("是否虚拟容器"),
			width: 150,
			key: "isVirtual",
			type: "radio-group",
			options: [
				{ label: t("是"), value: true },
				{ label: t("否"), value: false }
			],

			dialog: {
				required: true,
				defaultValue: false
			}
		},
		{
			title: t("是否有条码"),
			width: 200,
			key: "isHaveBarcode",
			tooltip: t("是否有容器条码（标识）"),
			type: "radio-group",
			options: [
				{ label: t("是"), value: true },
				{ label: t("否"), value: false }
			],

			dialog: {
				required: true,
				defaultValue: true
			}
		},

		{
			title: t("条码最小长度"),
			width: 150,
			key: "barcodeMinLength",
			type: "number",
			tooltip: t("容器条码规则-最小长度"),
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("条码最大长度"),
			width: 150,
			key: "barcodeMaxLength",
			type: "number",
			tooltip: t("容器条码规则-最大长度"),
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("容器尺寸-长度"),
			width: 150,
			key: "sizeLength",
			type: "number",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("容器尺寸-宽度"),
			width: 150,
			key: "sizeWidth",
			type: "number",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("容器尺寸-高度"),
			width: 150,
			key: "sizeHeight",
			type: "number",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("是否混放"),
			width: 200,
			key: "allowMixed",
			tooltip: t("组盘-是否允许物料在容器中混放"),
			type: "radio-group",
			options: [
				{ label: t("是"), value: true },
				{ label: t("否"), value: false }
			],

			dialog: {
				defaultValue: false,
				required: true
			}
		},
		{
			title: t("容器分格-总数"),
			width: 150,
			key: "cellNumber",
			type: "number",
			dialog: {
				defaultValue: 1,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("容器分格-行数"),
			width: 150,
			key: "cellRow",
			type: "number",
			dialog: {
				defaultValue: 1,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("容器分格-列数"),
			width: 150,
			key: "cellColumn",
			type: "number",
			dialog: {
				defaultValue: 1,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("启用状态"),
			width: 120,
			key: "isEnable",
			type: "radio-group",
			search: true,
			options: [
				{ label: t("启用"), value: true },
				{ label: t("禁用"), value: false }
			],

			renderType: "status",
			valueEnum: {
				true: {
					title: t("启用"),
					type: "processing"
				},
				default: {
					title: t("禁用"),
					type: "error"
				}
			},
			dialog: {
				defaultValue: true,
				required: true
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		align: "center",
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
				api={getContainerTypeData}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delContainerType}
				dialogFormExtend={{
					fields: [...fields],
					addApi: async res => {
						res.cellAllowMixed = false;
						await addContainerType(res);
					},
					updateApi: async res => {
						res.cellAllowMixed = false;
						await updateContainerType(res);
					},
					width: "60%",
					span: 12,
					dialogOnly: true,
					formExtend: {
						...formLayout
					}
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
		</Suspense>
	);
}
