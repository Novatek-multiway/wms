import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, MwButton } from "multiway";
import { useRef, useState, useEffect } from "react";
import {
	getMaterialInfo,
	updateMaterialInfo,
	delMaterialInfo,
	addMaterialInfo,
	getQualityStatus,
	getMaterialModelList
} from "../services/materialInfo";
import { getMaterialType } from "../services/materialType";
import { getMaterialPack } from "../services/materialPack";
import { setDefaultDataFilter, setDefaultSearchFilter } from "multiway";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { getToken } from "@/utils/token";
import download from "@/utils/download";
import { message } from "antd";
import UseConvertorRequest from "@/hooks/useConvertorRequest";

export default function MaterialInfo() {
	const { t } = useTranslation();
	const packingUnitOptions = UseConvertorRequest(getMaterialPack, { label: "packagingName", value: "id" });
	const qualityStatusOptions = UseConvertorRequest(
		getQualityStatus,
		option => ({ label: option.itemName, value: +option.itemId }),
		["resultData"]
	);
	const materialTypeOptions = UseConvertorRequest(getMaterialType, { label: "valueLabel", value: "id" }, ["resultData"]);
	const MaterialModelOptions = UseConvertorRequest(getMaterialModelList, { label: "valueLabel", value: "id" }, ["resultData"]);

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
	const tableRef = useRef(null);
	const options = [
		{ label: t("是"), value: true },
		{ label: t("否"), value: false }
	];

	const fields: Array<MwSearchTableField> = [
		{
			title: t("物料编码"),
			key: "materialCode",
			search: true,
			width: 100,
			dialog: {
				required: true,
				span: 12
			}
		},
		{
			title: t("物料名称"),
			key: "materialName",
			width: 100,
			search: true,
			dialog: {
				required: true,
				span: 12
			}
		},
		{
			title: t("物料类型"),
			width: 150,
			key: "materialTypeId",
			search: false,
			type: "select",
			options: materialTypeOptions,
			dialog: {
				required: true,
				span: 12
			}
		},
		{
			title: t("物料类型"),
			width: 150,
			key: "materialTypeIdList",
			search: {
				mode: "multiple"
			},
			table: false,
			type: "select",
			options: materialTypeOptions
		},
		{
			title: t("包装"),
			key: "skuPackagingId",
			width: 100,
			search: false,
			type: "select",
			options: packingUnitOptions,
			dialog: {
				required: true,
				span: 12
			}
		},
		{
			title: t("质量状态"),
			tooltip: t("默认质量状态"),
			key: "defaultQualityStatus",
			width: 150,
			search: false,
			type: "select",
			options: qualityStatusOptions,
			dialog: {
				required: true,
				defaultValue: qualityStatusOptions[1]?.value,
				span: 12
			}
		},
		{
			title: t("物料规格"),
			key: "materialSize",
			width: 150,
			search: false,
			dialog: {
				required: false,
				span: 12
			}
		},
		{
			title: t("有效期（天）"),
			key: "expiresDays",
			width: 150,
			search: false,
			type: "number",
			dialog: {
				required: false,
				addonAfter: t("天"),
				span: 12,
				placeholder: t('dayPlease')
			}
		},
		{
			title: t("近效预警（天）"),
			key: "expiresDaysNotice",
			width: 150,
			search: false,
			type: "number",
			dialog: {
				required: false,
				addonAfter: t("天"),
				span: 12,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("安全库存（高）"),
			key: "stockMinNotice",
			width: 150,
			search: false,
			type: "number",
			dialog: {
				required: false,
				span: 12,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("安全库存（低）"),
			key: "stockMaxNotice",
			width: 150,
			search: false,
			type: "number",
			dialog: {
				required: false,
				span: 12,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("有无物料标识"),
			key: "hasMaterialSign",
			width: 130,
			search: false,
			type: "radio-group",
			options,
			dialog: {
				required: true,
				defaultValue: false,
				span: 12
			}
		},
		{
			title: t("标识是否唯一"),
			tooltip: t("物料标识是否唯一"),
			width: 160,
			key: "isUniqueSign",
			search: false,
			type: "radio-group",
			options,
			dialog: {
				required: true,
				defaultValue: false,
				span: 12
			}
		},
		{
			title: t("是否允许混盘"),
			width: 150,
			key: "isMixedPallet",
			search: false,
			type: "radio-group",
			options,
			dialog: {
				required: true,
				defaultValue: false,
				span: 12
			}
		},
		{
			title: t("描述信息"),
			width: 250,
			key: "materialDescription",
			search: false,
			type: "textarea",
			ellipsis: "true",
			dialog: {
				required: false,
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

	const handlUploadChange = ({ file }: UploadChangeParam<UploadFile<any>>) => {
		if (file.status === "done") {
			if (file.response.success) {
				tableRef?.current.refresh();
				message.success(t("上传成功！"));
			} else {
				message.error(file.response.message);
			}
		}
	};
	const handleDownload = () => {
		download({ fileUrl: "/Material/GetImportTemplate", fileName: t("物料信息模板.xls") });
	};
	return (
		<MwSearchTable
			ref={tableRef}
			api={getMaterialInfo}
			fields={fields}
			rowKey="id"
			ctrl={ctrl}
			deleteApi={async res => {
				return await delMaterialInfo({ id: res[0] });
			}}
			dialogFormExtend={{
				fields: [...fields],
				addApi: async params => {
					const { expiresDays, expiresDaysNotice, stockMaxNotice, stockMinNotice } = params!;
					const res = {
						...params,
						expiresDays: typeof expiresDays === "number" ? expiresDays : -1,
						expiresDaysNotice: typeof expiresDaysNotice === "number" ? expiresDaysNotice : -1,
						stockMaxNotice: typeof stockMaxNotice === "number" ? stockMaxNotice : -1,
						stockMinNotice: typeof stockMinNotice === "number" ? stockMinNotice : -1
					};
					return await addMaterialInfo(res);
				},
				updateApi: updateMaterialInfo,
				width: "50%",
				span: 12,
				dialogOnly: true
			}}
		>
			{/* <MwButton onClick={handleDownload}>下载模板</MwButton>
			<Upload
				accept=".xls, .xlsx"
				showUploadList={false}
				action="/api/Material/ImportMaterial"
				name="formFile"
				onChange={handlUploadChange}
				headers={{ Authorization: "Bearer " + getToken("AuthenticationToken") }}
			>
				<Button icon={<UploadOutlined />}>导入数据</Button>
			</Upload> */}
			<MwAction action="add">{t("新增")}</MwAction>
		</MwSearchTable>
	);
}
