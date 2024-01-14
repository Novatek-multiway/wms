import { useTranslation } from "react-i18next";
import React, { useState, useRef, useEffect } from "react";
import { MwDialogFormField, MwDialogForm } from "multiway";
import { message } from "antd";
import service from "@/pages/basicConfiguration/composition/services";
import containerServices from "@/pages/basicConfiguration/container/services";

export default function ApplyForLocation({ open, close }) {
	const { t } = useTranslation();
	const formRef = useRef<any>();
	// 弹窗是否可见
	const [visible, setVisible] = useState(false);
	const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 12 } };
	const fields: Array<MwDialogFormField> = [
		{
			title: t("回库位置"),
			key: "fromLocationCode",
			type: "search-select",
			optionApi: service.getWorkbenchData,
			shiftOptions: {
				label: "workbenchName",
				value: "locationCode"
			},
			pageSize: 7,
			span: 12,
			required: true
		},
		{
			title: t("容器编号"),
			key: "containerCode",
			type: "search-select",
			optionApi: containerServices.getContainerData,
			shiftOptions: {
				label: "code",
				value: "id"
			},
			pageSize: 7,
			span: 12,
			required: true
		}
	];

	useEffect(() => {
		if (!open) return;
		setVisible(true);
	}, [open]);
	return (
		<MwDialogForm
			width={"50%"}
			span={24}
			ref={formRef}
			visible={visible}
			fields={fields}
			title={t("回库申请")}
			formExtend={{ ...formLayout }}
			addApi={async res => {
				return await service.inStockApply(res);
			}}
			onClose={() => {
				setVisible(false);
				close();
			}}
		/>
	);
}
