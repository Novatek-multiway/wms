import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import { MwTable, MwSearchTable, MwSearchTableField, MwDialog, Record, setDefaultDataFilter } from "multiway";
import services from "../../services";
import { message } from "antd";
import useConvertorRequest from "@/hooks/useConvertorRequest";

interface IProps {
	type?: "view" | "edit";
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	record?: Record;
	idType?: string;
}

const AllocationTable = (props: IProps) => {
	const { t } = useTranslation();
	const EnumQualityStatusOptions = useConvertorRequest(services.getEnumQualityStatus, { label: "itemName", value: "itemId" }, [
		"resultData"
	]);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("可分配数量"),
			key: "quantity",
			width: 120
		},
		{
			title: t("容器编码"),
			key: "containerCode",
			width: 120
		},
		{
			title: t("容器库位编码"),
			key: "locationCode",
			width: 220
		},
		{
			title: t("质量状态"),
			key: "qualityStatus",
			width: 100,
			type: "select",
			options: EnumQualityStatusOptions
		},
		{
			title: t("物料编码"),
			key: "materialCode",
			width: 100
		},
		{
			title: t("收货日期"),
			key: "receivingDate",
			width: 200
		},
		{
			title: t("已分配锁定库存"),
			key: "lockQuantity",
			width: 160
		}
	];

	const tableRef = useRef<any>(null);
	const [data, setData] = useState([]);
	const { type, visible, setVisible, record, idType = "id" } = props;
	const handleConfirm = async () => {
		const list = tableRef.current.getSelection();
		if (!list.length) return message.error(t("请选择！"));
		try {
			await services.ManualAllocation(list);
			message.success(t("手动分配成功！"));
			setVisible(false);
		} catch (e) {
			console.log(e);
			message.error(t("手动分配失败！"));
		}
	};
	const getData = async () => {
		let postData: any = { resultData: [] };
		if (!visible) return postData;
		const id = record ? record[idType] : "";
		if (type === "view") {
			postData = await services.GetAllocationItemList({ requirementId: id });
		} else if (type === "edit") {
			postData = await services.GetWaitAllocationItemList({ requirementId: id });
		}
		setData(postData.resultData);
	};
	useEffect(() => {
		getData();
	}, [visible]);
	return (
		<MwDialog
			mode="view"
			width={1000}
			title={type === "edit" ? t("手动分配") : t("查看分配")}
			visible={visible}
			onClose={() => setVisible(false)}
			confirmVisible={type === "edit"}
			onConfirm={handleConfirm}
		>
			<MwSearchTable
				ref={tableRef}
				searchVisible={false}
				scrollX={1000}
				rowKey="inventoryId"
				selectShowKey="inventoryId"
				pagination={false}
				selectionType={type === "edit" ? "checkbox" : undefined}
				data={data}
				fields={fields}
			/>
		</MwDialog>
	);
};

export default AllocationTable;
