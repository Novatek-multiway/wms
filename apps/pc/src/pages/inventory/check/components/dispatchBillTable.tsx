import { useTranslation } from "react-i18next";
import React, { forwardRef, useEffect } from "react";
import { MwSearchTable, MwSearchTableField } from "multiway";
import { useRequest } from "ahooks";
import services from "@/pages/basicConfiguration/composition/services";
import inventoryServices from "../../services";

const BillTable = (props: any, ref: any) => {
	const { t } = useTranslation();
	const { record, action, field, callback } = props;
	// 新增、编辑
	const { run: getLocationData, data: locationData } = useRequest(services.getLocationData, {
		manual: true,
		onSuccess: res => {
			if (action === "update" && record.id) {
				GetStocktakeDetail({ id: record.id });
			}
		}
	});

	// 查看
	const { run: GetStocktakeLocationList, data: stocktakeLocationList } = useRequest(services.GetStocktakeLocationList, {
		manual: true
	});
	// 获取当前选中的库位列表
	const { run: GetStocktakeDetail, data: stocktakeDetailData } = useRequest(inventoryServices.GetStocktakeDetail, {
		manual: true,
		onSuccess: res => {
			const { stocktakeLocationList } = res.resultData;
			callback(stocktakeLocationList, locationData);
		}
	});

	useEffect(() => {
		let obj = {
			pageSize: 100,
			pageIndex: 1
		};
		if (action === "view" && record.id) {
			obj.query = { stocktakeId: record.id };
			return GetStocktakeLocationList(obj);
		} else if (action === "add" || action === "update") {
			obj.query = {
				isFull: true,
				isStocktaking: false,
				locationStatus: locationStatusOptions[0].value
			};
			getLocationData(obj);
		}
	}, [record.id, action]);

	const locationStatusOptions = [
		{ label: t("任务空闲"), value: 1 },
		{ label: t("入库锁定"), value: 2 },
		{ label: t("出库锁定"), value: 3 },
		{ label: t("取空异常"), value: 4 },
		{ label: t("占位异常"), value: 5 },
		{ label: t("维修"), value: 6 }
	];

	const fields: Array<MwSearchTableField> = [
		{
			title: t("货位编号"),
			key: "locationCode",
			width: 210,
			ellipsis: true,
			search: {
				type: "search",
				position: "more"
			}
		},
		{
			title: t("库位状态"),
			width: 100,
			key: "locationStatus", // 1-任务空闲、2-入库锁定、3-出库锁定、4-取空异常、5-占位异常、6-维修
			type: "select",
			options: locationStatusOptions
		},
		{
			title: t("报警状态"),
			width: 100,
			key: "isAlarm", // 1-报警、0-正常
			type: "radio-group",
			options: [
				{ label: t("报警"), value: true },
				{ label: t("正常"), value: false }
			],

			dialog: {}
		},
		{
			title: t("允许组盘"),
			width: 100,
			key: "allowCombine", //1-允许、0-不允许
			type: "radio-group",
			options: [
				{ label: t("允许"), value: true },
				{ label: t("不允许"), value: false }
			],

			dialog: {}
		},
		{
			title: t("允许入库"),
			width: 100,
			key: "allowStockIn", //1-允许、0-不允许
			type: "radio-group",
			options: [
				{ label: t("允许"), value: true },
				{ label: t("不允许"), value: false }
			],

			dialog: {}
		},
		{
			title: t("允许出库"),
			width: 100,
			key: "allowStockOut", //1-允许、0-不允许
			type: "radio-group",
			options: [
				{ label: t("允许"), value: true },
				{ label: t("不允许"), value: false }
			]
		},
		{
			title: t("库位空满状态"),
			width: 120,
			key: "isFull", // 1-满、0-空
			type: "radio-group",
			options: [
				{ label: t("满"), value: true },
				{ label: t("空"), value: false }
			]
		},
		{
			title: t("是否盘点中"),
			width: 110,
			key: "isStocktaking", // 1-盘点中、0-未盘点
			type: "radio-group",
			span: 16,
			options: [
				{ label: t("盘点中"), value: true },
				{ label: t("未盘点"), value: false }
			]
		}
	];

	return (
		<MwSearchTable
			title={t("库位列表")}
			ref={ref}
			extraVisible={false}
			rowKey={"id"}
			selectionType={action === "view" ? "" : "checkbox"}
			selectShowKey="locationCode"
			data={action === "view" ? stocktakeLocationList?.resultData.pageData : locationData?.resultData.pageData}
			fields={fields}
		/>
	);
};

export default forwardRef(BillTable);
