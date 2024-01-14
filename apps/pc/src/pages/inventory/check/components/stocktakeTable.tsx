import { useTranslation } from "react-i18next";
import React, { useRef, useState, useEffect } from "react";
import { MwSearchTable, MwSearchTableField, MwTableCtrlField, MwCtrl, MwButton, Record, MwAction, AnyKeyProps } from "multiway";
import { useRequest } from "ahooks";
import services from "../../services";
import siteService from "@/pages/basicConfiguration/composition/services";
import { Button, message } from "antd";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import { filter } from "lodash";
const StocktakeTable = (props: any) => {
	const { t } = useTranslation();
	const { data } = props;
	const {
		run,
		data: reponseData,
		loading: responseLoading
	} = useRequest(services.GetStocktakeDetail, {
		manual: true
	});
	useEffect(() => {
		if (data.id) {
			run({ id: data?.id });
		}
	}, [data]);

	const stocktakeRecordStatusOptions = useConvertorRequest(
		services.GetstocktakeRecordStatus,
		{ label: "itemName", value: "itemId" },
		["resultData"]
	);

	const vilifyIsSameContainer = (container: string): Boolean => {
		const mapData = reponseData?.resultData.stocktakeRecordList;
		const sameData = filter(mapData, ["containerCode", container]);
		const isSameFinish = filter(sameData, ["isFinish", false]);
		return isSameFinish.length ? false : true;
	};

	const fields: Array<MwSearchTableField> = [
		{
			title: t("被盘点库位编号"),
			key: "locationCode",
			width: 120
		},
		{
			title: t("盘点工位"),
			key: "targetLocationCode",
			width: 100
		},
		{
			title: t("容器当前位置"),
			key: "containerPosition",
			width: 100
		},
		{
			title: t("容器编号"),
			key: "containerCode",
			width: 100
		},
		{
			title: t("物料编号"),
			key: "materialCode",
			width: 100
		},
		{
			title: t("物料名称"),
			key: "materialName",
			width: 100
		},
		{
			title: t("物料规格"),
			key: "materialSize",
			width: 100
		},
		{
			title: t("批次号"),
			key: "batchNumber",
			width: 100
		},
		{
			title: t("盈亏"),
			key: "stocktakeRecordStatus",
			width: 100,
			options: stocktakeRecordStatusOptions
		},
		{
			title: t("盘后库存"),
			key: "adjustedQuantity",
			width: 100
		},
		{
			title: t("是否盘点完成"),
			key: "isFinish",
			width: 160,
			render: (_, { isFinish }) => {
				return isFinish ? t("完成") : t("未完成");
			}
		},
		{
			title: t("数量"),
			key: "adjustedQuantity",
			editable: true,
			renderType: "editable-cell-input",
			editableCellStyle: {
				width: 80,
				display: "inline-block"
			},
			// 前置元素
			after: ({ record, field, refreshRow }: AnyKeyProps) => {
				if (record.isFinish || !record.targetLocationCode) return;
				return (
					<Button
						style={{ marginLeft: 8 }}
						onClick={async () => {
							const sendData = {
								stocktakeCode: record.stocktakeCode,
								locationCode: record.targetLocationCode,
								containerCode: record.containerCode,
								stocktakeRecordList: [{ ...record, isFinish: true }]
							};
							const res = await services.postUpdateStocktakeRecord(sendData);
							record.isFinish = true;
							run({ id: data?.id });
							// record.color = record.color === "red" ? "blue" : "red";
							// 覆盖 record 后，调用此方法可刷新数据
							refreshRow();
						}}
					>
						{t("确认盘点")}
					</Button>
				);
			},
			// 后置元素
			// after: ({ record }: AnyKeyProps) => {
			// 	return <div style={{ color: record.color || "#ccc" }}>盘点完成：{record.cn}</div>;
			// },
			contentProps: {
				allowClear: true
			},
			formItemProps: {
				// 编辑中的样式
				style: {
					display: "inline-block",
					width: 80,
					marginBottom: 0
				},
				rules: [{ required: true, message: t("请输入数量") }]
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 100,
		fixed: "right",
		render: (_, record: Record) => {
			const actions: any = [];
			const { qualityStatus, fromLocationCode, containerCode, targetLocationCode, isAllowReturn } = record;
			if (isAllowReturn) {
				actions.push(
					<MwAction
						style={{ color: "#faad14" }}
						onClick={async () => {
							// 判断相同
							if (!vilifyIsSameContainer(containerCode)) {
								message.error(t("{{containerCode}}托盘存在未盘点数据，不允许回库。", { containerCode }));
								return;
							}
							const res = await siteService.inStockApply({ fromLocationCode: targetLocationCode });
							if (res) message.success(t("回库申请成功"));
						}}
					>
						{t("回库")}
					</MwAction>
				);
			}

			return <MwCtrl>{actions}</MwCtrl>;
		}
	};
	const tableRef = useRef<any>(null);
	return (
		<>
			<span>{t("盘点记录单行信息:")}</span>
			<MwSearchTable
				ref={tableRef}
				pagination={false}
				ctrl={ctrl}
				extraVisible={false}
				searchVisible={false}
				editMode="col"
				rowKey="id"
				data={reponseData?.resultData.stocktakeRecordList}
				fields={fields}
			/>
		</>
	);
};

export default StocktakeTable;
