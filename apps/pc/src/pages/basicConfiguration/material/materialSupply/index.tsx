import { useTranslation } from "react-i18next";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, MwButton } from "multiway";
import { useRef } from "react";
import { getMaterialSupply, updateMaterialSupply, delMaterialSupply, addMaterialSupply } from "../services/materialSupply";
import { setDefaultDataFilter, setDefaultSearchFilter } from "multiway";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
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
	const options = [
		{ label: t("是"), value: true },
		{ label: t("否"), value: false }
	];

	const fields: Array<MwSearchTableField> = [
		{
			title: t("编码"),
			width: 100,
			key: "contactCode",
			tooltip: t("客户/供应商编码"),
			dialog: {
				required: true,
				span: 12
			},
			search: {
				tooltip: t("客户/供应商编码")
			}
		},
		{
			title: t("名称"),
			width: 140,
			key: "contactName",
			tooltip: t("客户/供应商名称"),
			dialog: {
				required: true,
				span: 12
			},
			search: {
				tooltip: t("客户/供应商名称")
			}
		},
		{
			title: t("是否供应商"),
			width: 130,
			key: "isSupplier",
			search: true,
			type: "radio-group",
			options,
			dialog: {
				required: true,
				defaultValue: true,
				span: 12
			}
		},
		{
			title: t("是否客户"),
			width: 130,
			key: "isCustomer",
			search: true,
			type: "radio-group",
			options,
			dialog: {
				required: true,
				defaultValue: true,
				span: 12
			}
		},
		{
			title: t("机构名称"),
			width: 160,
			key: "organizationName",
			search: true,
			dialog: {
				required: false,
				span: 12
			}
		},
		{
			title: t("电话"),
			width: 130,
			key: "phoneNumber",
			search: true,
			dialog: {
				required: false,
				span: 12
			}
		},
		{
			title: "Email",
			width: 160,
			key: "email",
			search: false,
			dialog: {
				required: false,
				span: 12
			}
		},
		{
			title: t("通讯地址"),
			width: 180,
			key: "address",
			search: false,
			dialog: {
				required: false,
				span: 12
			}
		},
		{
			title: t("描述信息"),
			ellipsis: "true",
			width: 200,
			key: "contactDescription",
			search: false,
			type: "textarea",
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
		download({ fileUrl: "/Contacts/GetImportTemplate", fileName: t("客户或供应商数据.xls") });
	};
	return (
		<MwSearchTable
			ref={tableRef}
			api={getMaterialSupply}
			fields={fields}
			rowKey="id"
			ctrl={ctrl}
			deleteApi={async res => {
				return await delMaterialSupply({ id: res[0] });
			}}
			dialogFormExtend={{
				fields: [...fields],
				addApi: addMaterialSupply,
				updateApi: updateMaterialSupply,
				width: "50%",
				span: 12,
				dialogOnly: true
			}}
		>
			{/* <MwButton onClick={handleDownload}>下载模板</MwButton>
			<Upload
				accept=".xls, .xlsx"
				showUploadList={false}
				action="/api/Contacts/ImportData"
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
