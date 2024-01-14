import { Card, message } from 'antd';
import { t } from 'i18next';
import { MwButton, MwSearch, MwSearchField, MwSearchTable, MwSearchTableField } from 'multiway';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useConvertorRequest from '@/hooks/useConvertorRequest';
import { get, post } from '@/http/request';
import { getWorkbenchData } from '@/pages/basicConfiguration/material/services/materialFile';

interface DataType {
	key: React.Key;
	[prop: string]: any;
}
const pickTypeOptions = [
	{ label: t("容器编号+拣选位置编号获取容器库存数据"), value: "GetContainerInventory" },
	{ label: t("拣选-发货单号+容器编号+拣选位置编号获取容器库存数据"), value: "GetInvoiceContainerInventory" },
	{ label: t("拣选-发货单号+拣选位置编号获取容器库存数据"), value: "GetInvoiceNoContainerCodeInventory" },
	{ label: t("拣选-拣选位置编号获取容器库存数据"), value: "GetNoContainerCodeInventory" }
];

function Picking() {
	const { t } = useTranslation();
	const [pickType, setPickType] = useState("GetContainerInventory");
	const [dataSource, setDataSource] = useState<DataType[]>([]);
	const locationCodeOptions = useConvertorRequest(getWorkbenchData, item => ({
		label: item.workbenchName + item.locationCode,
		value: item.locationCode
	}));
	const searchRef = useRef<any>(null);
	const tableRef = useRef<any>(null);

	const fields: Array<MwSearchField> = [
		{
			title: t("拣选方式"),
			key: "pickType",
			type: "select",
			defaultValue: "GetContainerInventory",
			options: pickTypeOptions,
			onChange: (field: string) => {
				setPickType(field);
			}
		},
		{
			title: t("发货单头编号"),
			key: "invoiceCode",
			type: "input",
			required: true,
			hidden: pickType !== "GetInvoiceContainerInventory" && pickType !== "GetInvoiceNoContainerCodeInventory"
		},
		{
			title: t("容器条码"),
			key: "containerCode",
			type: "input",
			required: true,
			hidden: pickType !== "GetContainerInventory" && pickType !== "GetInvoiceContainerInventory"
		},
		{
			title: t("工作台位置"),
			key: "locationCode",
			type: "select",
			options: locationCodeOptions,
			required: true
		}
	];

	const handleReset = () => {
		tableRef.current.clearSelection();
	};

	const handleSearch = async () => {
		const params = searchRef.current.getFieldsValue();
		const { pickType, invoiceCode, containerCode, locationCode } = params;
		const query: Record<string, any> = { locationCode };
		if (pickType === "GetContainerInventory") {
			query.containerCode = containerCode;
		} else if (pickType === "GetInvoiceContainerInventory") {
			query.containerCode = containerCode;
			query.invoiceCode = invoiceCode;
		} else if (pickType === "GetInvoiceNoContainerCodeInventory") {
			query.invoiceCode = invoiceCode;
		}
		try {
			const res = await get(`/OutboundPicking/${pickType}`, query);
			setDataSource(res.resultData || []);
		} catch (e) {
			setDataSource([]);
			console.log(e);
		}
	};

	const columns: Array<MwSearchTableField> = [
		{
			title:
				pickType === "GetContainerInventory" || pickType === "GetNoContainerCodeInventory" ? t("出库需求编号") : t("发货单号"),
			key:
				pickType === "GetContainerInventory" || pickType === "GetNoContainerCodeInventory"
					? "outboundRequirementCode"
					: "invoiceLineNumber",
			width: 150
		},
		{
			title: t("质量状态"),
			key: "qualityStatus",
			render: text => {
				return text == 0 ? t("未知") : text == 1 ? t("待检") : text == 2 ? t("合格") : t("不合格");
			},
			width: 100
		},
		{
			title: t("物料编号"),
			key: "materialCode",
			width: 150
		},
		{
			title: t("物料名称"),
			key: "materialName",
			width: 150
		},
		{
			title: t("批次号"),
			key: "batchNumber",
			width: 150
		},
		{
			title: t("规格"),
			key: "materialSize",
			width: 150
		},
		{
			title: t("拣选数量"),
			key: "pickingQuantity",
			editable: true,
			renderType: "editable-cell-input",
			width: 100
		},
		{
			title: t("出库需求数量"),
			key: "requirementQuantity",
			width: 150
		},
		{
			title: t("分配数量"),
			key: "allotQuantity",
			width: 100
		},

		{
			title: t("当前容器库存数量"),
			key: "inventoryQuantity",
			width: 150
		},
		{
			title: t("是否已分配"),
			key: "isAllot",
			render: text => {
				return text ? t("是") : t("否");
			},
			width: 120
		}
	];

	const handleSubmit = async () => {
		try {
			const tableData = tableRef.current.getTableData();
			const selectedList = tableRef.current.getSelection().map(item => {
				const temp = tableData.find(ele => ele.allocationItemId === item.allocationItemId);
				return { ...item, pickingQuantity: +temp.pickingQuantity };
			});
			if (!selectedList.length) return message.error(t("请选择！"));
			const res = await post("/OutboundPicking/OutboundPicking", selectedList);
			if (res.statusCode == 200) {
				message.success(t("出库成功！"));
				handleReset();
				handleSearch();
			} else {
				message.error(t("出库失败！"));
			}
		} catch (e) {
			message.error(t("出库失败！"));
		}
	};
	const handleInstockApply = async () => {
		const { locationCode } = searchRef.current.getFieldsValue();
		if (!locationCode) return message.error(t("请选择工作台位置！"));
		try {
			const res = await get("/Combine/InStockApply", { fromLocationCode: locationCode });
			if (res.statusCode == 200) {
				message.success(t("生成回库任务成功！"));
				handleReset();
				handleSearch();
			} else {
				message.error(t("回库失败！"));
			}
		} catch (e) {
			message.error(t("回库失败！"));
		}
	};
	return (
		<Card>
			<MwSearch ref={searchRef} fields={fields} onConfirm={handleSearch} style={{ marginBottom: "20px" }} />
			<MwSearchTable
				scrollX={1500}
				ref={tableRef}
				rowKey="allocationItemId"
				selectionType="checkbox"
				extraVisible={false}
				fields={columns}
				data={dataSource}
				pagination={false}
				editMode="col"
			/>

			<div style={{ marginTop: "20px", float: "right" }}>
				<MwButton onClick={handleInstockApply}>{t("回库")}</MwButton>
				<MwButton onClick={handleReset} style={{ margin: "0 16px" }}>
					{t("重置")}
				</MwButton>
				<MwButton onClick={handleSubmit} type="primary">
					{t("出库")}
				</MwButton>
			</div>
		</Card>
	);
}

export default Picking;
