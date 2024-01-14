import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { MwSearch, MwSearchTable } from "multiway";
import { useRequest } from "ahooks";
import services from "../../services";
function ReadOnlyTable(props: any, ref: any) {
	const { t } = useTranslation();
	const { record, callback } = props;
	const { run: getRepertoryData, data: reponseData } = useRequest(services.GetRepertoryData, {
		manual: true,
		onSuccess: res => {
			// 编辑&查看回显
			if (record.uid) callback(record.uid, res.resultData);
		}
	});
	useEffect(() => {
		getRepertoryData();
	}, []);

	const fields = [
		{
			title: t("物料编码"),
			key: "materialCode",
			ellipsis: true,
			width: 150
		},
		{
			title: t("物料名称"),
			key: "materialName",
			width: 150
		},
		{
			title: t("物料规格"),
			key: "materialSize",
			width: 120
		},
		{
			title: t("物料型号"),
			key: "materialModelName",
			width: 120
		},
		{
			title: t("批次号"),
			key: "batchNumber",
			width: 120
		},
		{
			title: t("库存数"),
			key: "quantity",
			width: 120
		},
		{
			title: t("质量状态"),
			key: "qualityStatus",
			width: 150,
			options: [
				{ label: t("未知"), value: 0 },
				{ label: t("待检"), value: 1 },
				{ label: t("合格"), value: 2 },
				{ label: t("不合格"), value: 3 }
			]
		}
	];

	return (
		<MwSearchTable
			title={t("物料库存明细")}
			ref={ref}
			searchVisible={false}
			extraVisible={false}
			data={reponseData?.resultData}
			fields={fields}
			selectionType="radio"
			rowKey="uid"
		></MwSearchTable>
	);
}

export default forwardRef(ReadOnlyTable);
