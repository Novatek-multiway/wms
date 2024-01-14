import { useTranslation } from "react-i18next";
import React, { useRef, useState, Suspense } from "react";
import { MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, setDefaultDataFilter } from "multiway";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import { Colorpicker } from "antd-colorpicker";
import service from "../services";
import Loading from "@/components/loading";

export default function CanvasInformation() {
	const {
		getCanvasArea,
		addCanvasArea,
		updateCanvasArea,
		delCanvasArea,
		getTunnelData,
		getCanvasData,
		getCanvasAreaTypeOptions
	} = service;
	const { t } = useTranslation();
	const [showTunnel, setShowTunnel] = useState(false);
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	const tunnelOptions = useConvertorRequest(getTunnelData, { label: "tunnelName", value: "id" });
	const canvasOptions = useConvertorRequest(getCanvasData, { label: "canvasCode", value: "id" });

	const canvasAreaTypeOptions = useConvertorRequest(getCanvasAreaTypeOptions, { label: "itemName", value: "itemId" }, [
		"resultData"
	]);
	const tableRef = useRef(null);

	const fields: Array<MwSearchTableField> = [
		{
			ellipsis: true,
			title: t("画布代码"),
			key: "canvasCode",
			width: 200,
			align: "center",
			search: true
		},
		{
			title: t("区域类型"),
			width: 150,
			key: "canvasAreaType",
			type: "select",
			search: true,
			align: "center",
			options: canvasAreaTypeOptions,
			onChange: (e, v) => {
				e === 2 ? setShowTunnel(true) : setShowTunnel(false);
			},
			dialog: {
				required: true,
				align: "left"
			}
		},
		{
			title: t("布局方向"),
			key: "isColumn",
			type: "radio-group",
			width: 100,
			align: "center",
			options: [
				{ label: t("横排"), value: false },
				{ label: t("竖排"), value: true }
			],

			dialog: { required: true }
		},
		{
			ellipsis: true,
			title: t("起始X轴"),
			width: 150,
			key: "fromXaxis",
			type: "number",
			align: "center",
			dialog: {
				required: true,
				align: "left",
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("起始Y轴"),
			width: 150,
			key: "fromYaxis",
			type: "number",
			align: "center",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("目标X轴"),
			width: 150,
			key: "toXaxis",
			type: "number",
			align: "center",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("目标Y轴"),
			type: "number",
			width: 150,
			key: "toYaxis",
			align: "center",
			dialog: {
				required: true,
				placeholder: t('pleaseInput')
			}
		},
		{
			title: t("巷道名称"),
			key: "tunnelName",
			width: 150,
			align: "center"
		},
		{
			title: t("颜色"),
			width: 100,
			key: "canvasAreaBgColor",
			type: "html",
			align: "center",
			render: val => {
				return (
					<div
						style={{ width: "15px", height: "15px", backgroundColor: val?.toString(), borderRadius: "50%", margin: "0 auto" }}
					></div>
				);
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 120,
		fixed: "right",
		render: (_, record: Record) => (
			<MwCtrl>
				<MwAction
					record={record}
					action="update"
					onOpen={val => {
						const { canvasAreaType } = val;
						canvasAreaType === 2 ? setShowTunnel(true) : setShowTunnel(false);
					}}
				>
					{t("编辑")}
				</MwAction>
				<MwAction record={record} danger action="delete">
					{t("删除")}
				</MwAction>
			</MwCtrl>
		)
	};

	const otherFields: Array<MwSearchTableField> = [
		{
			title: t("画布配置"),
			key: "canvasId",
			width: 100,
			type: "select",
			options: canvasOptions,
			dialog: {
				required: true
			}
		},
		{
			title: t("颜色"),
			width: 100,
			key: "canvasAreaBgColor",
			type: "custom",
			align: "center",
			dialog: {
				renderContent: () => {
					return (
						<Colorpicker
							popup
							blockStyles={{
								width: "30px",
								height: "30px",
								borderRadius: "50%"
							}}
							onColorResult={color => color.hex}
						/>
					);
				},
				defaultValue: ""
			}
		}
	];

	const isShowTunne = () => {
		const obj = {
			title: t("巷道"),
			width: 150,
			key: "tunnelId",
			type: "select",
			options: tunnelOptions,
			dialog: {
				required: true
			}
		};
		if (showTunnel) {
			return obj;
		} else {
			return {};
		}
	};
	return (
		<Suspense fallback={<Loading>Loading...</Loading>}>
			<MwSearchTable
				ref={tableRef}
				api={getCanvasArea}
				fields={fields}
				rowKey="id"
				ctrl={ctrl}
				deleteApi={delCanvasArea}
				dialogFormExtend={{
					fields: [...otherFields, ...fields, isShowTunne()],
					addApi: addCanvasArea,
					updateApi: updateCanvasArea,
					width: "50%",
					span: 12,
					dialogOnly: true
				}}
			>
				<MwAction action="add">{t("新增")}</MwAction>
			</MwSearchTable>
		</Suspense>
	);
}
