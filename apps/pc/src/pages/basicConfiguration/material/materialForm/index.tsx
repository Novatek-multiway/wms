import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, MwButton } from "multiway";
import { useRef } from "react";
import { getMaterialForm, updateMaterialForm, delMaterialForm, addMaterialForm } from "../services/materialForm";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { setDefaultDataFilter, setDefaultSearchFilter } from "multiway";
import { getToken } from "@/utils/token";
import download from "@/utils/download";
import { message } from "antd";

export default function MaterialForm() {
	const { t } = useTranslation();
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
	const fields: Array<MwSearchTableField> = [
		{
			title: t("物料型号名称"),
			key: "materialModelName",
			search: true,
			width: 150,
			dialog: {
				required: true,
				span: 12
			}
		},
		{
			title: t("描述信息"),
			key: "materialModelDescription",
			search: false,
			type: "textarea",
			ellipsis: "true",
			dialog: {
				span: 24
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 120,
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
		download({ fileUrl: "/MaterialModel/GetImportTemplate", fileName: t("物料型号模板.xls") });
	};
	return (
		<MwSearchTable
			ref={tableRef}
			api={getMaterialForm}
			fields={fields}
			rowKey="id"
			ctrl={ctrl}
			deleteApi={async res => {
				return await delMaterialForm({ id: res[0] });
			}}
			dialogFormExtend={{
				fields: [...fields],
				addApi: addMaterialForm,
				updateApi: updateMaterialForm,
				width: "50%",
				span: 12,
				dialogOnly: true
			}}
		>
			<MwButton onClick={handleDownload}>{t("下载模板")}</MwButton>
			<Upload
				accept=".xls, .xlsx"
				showUploadList={false}
				action="/api/MaterialModel/ImportData"
				name="formFile"
				onChange={handlUploadChange}
				headers={{ Authorization: "Bearer " + getToken("AuthenticationToken") }}
			>
				<Button icon={<UploadOutlined />}>{t("导入数据")}</Button>
			</Upload>
			<MwAction action="add">{t("新增")}</MwAction>
		</MwSearchTable>
	);
}
