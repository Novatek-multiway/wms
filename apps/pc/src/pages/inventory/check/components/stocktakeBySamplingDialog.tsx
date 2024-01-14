import { useTranslation } from "react-i18next";
import { Descriptions, message } from "antd";
import { last, pick } from "lodash";
import { MwAction, MwButton, MwCtrl, MwDialog, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import { useEffect, useRef, useState } from "react";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import useLocationCodeOptions from "@/pages/shoppingBusiness/picking/hooks/useLocationCodeOptions";
import services from "../../services";

interface IProps {
	refresh: () => void;
}

export default function StocktakeBySamplingDialog({ refresh }: IProps) {
	const { t } = useTranslation();
	const { GetStocktakeCode, MaterialGetPageData, AddStocktakeBySampling } = services;

	const tableRef = useRef(null);

	const [visible, setVisible] = useState(false);
	const [isFirstConfirm, setIsFirstConfirm] = useState(true);
	const [stocktakeCode, setStocktakeCode] = useState("");
	const { locationCodeOptions } = useLocationCodeOptions("itemId");

	const materialOptions = useConvertorRequest(MaterialGetPageData, option => ({
		...option,
		label: `${option.materialCode}(${option.materialName})`,
		value: option.id
	})); // 物料信息

	const handleClose = () => {
		setVisible(false);
		if (!isFirstConfirm) {
			refresh?.();
		}
	};
	const handleFinish = async (record: Record) => {
		setIsFirstConfirm(false);
		const data = {
			...pick(record, ["adjustedQuantity", "materialId"]),
			stocktakeCode,
			locationId: last(record.locationId)
		};
		try {
			await AddStocktakeBySampling(data);
			message.success(t("新增抽盘计划成功"));
		} catch (error) {
			console.log("error: ", error);
			console.log("record: ", record);
		}
	};

	useEffect(() => {
		if (visible) {
			setIsFirstConfirm(true);
			GetStocktakeCode().then(res => {
				setStocktakeCode(res?.resultData as string);
			});
		}
	}, [visible]);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("目标货位"),
			key: "locationId",
			width: 200,
			editable: true,
			renderType: "editable-cell-cascader",
			options: locationCodeOptions,
			contentProps: {
				allowClear: true,
				placeholder: t("请选择目标货位")
			},
			formItemProps: {
				rules: [{ required: true, message: t("请选择目标货位") }]
			}
		},
		{
			title: t("物料编号"),
			key: "materialId",
			width: 200,
			editable: true,
			renderType: "editable-cell-select",
			options: materialOptions,
			contentProps: {
				allowClear: true,
				placeholder: t("请选择物料编号")
			},
			formItemProps: {
				rules: [{ required: true, message: t("请选择物料编号") }]
			}
		},
		{
			title: t("盘后库存"),
			key: "adjustedQuantity",
			width: 200,
			editable: true,
			renderType: "editable-cell-number",
			contentProps: {
				allowClear: true,
				precision: 0,
				min: 1,
				placeholder: t("请输入盘后库存")
			},
			formItemProps: {
				rules: [{ required: true, message: t("请输入盘后库存") }]
			}
		}
	];

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 200,
		render: (_, record) => {
			let actions = [];
			if (record.editing) {
				actions = [
					<MwAction key="editable-confirm" action="editable-confirm" record={record} callback={handleFinish}>
						{t("确定")}
					</MwAction>,
					<MwAction key="editable-cancel" action="editable-cancel" record={record}>
						{t("取消")}
					</MwAction>
				];
			} else {
				actions = [
					// 直接return null会出问题，只能隐藏掉
					<MwAction key="editable-cancel" action="editable-cancel" record={record} className="hidden">
						{t("取消")}
					</MwAction>
				];
			}
			return <MwCtrl>{actions}</MwCtrl>;
		}
	};

	return (
		<>
			<MwButton onClick={() => setVisible(true)}>{t("新增抽盘计划")}</MwButton>
			<MwDialog title={t("新增抽盘计划")} visible={visible} width={"70%"} onClose={handleClose} confirmVisible={false}>
				<Descriptions>
					<Descriptions.Item label={t("当前盘点单号")}>{stocktakeCode}</Descriptions.Item>
				</Descriptions>
				<MwSearchTable
					ref={tableRef}
					searchVisible={false}
					extraVisible={false}
					pagination={false}
					fields={fields}
					ctrl={ctrl}
					editMode="row"
					rowKey="sort_id"
					title={t("抽样盘点")}
					after={<MwAction action="editable-add">{isFirstConfirm ? t("开始抽盘") : t("继续抽盘")}</MwAction>}
				></MwSearchTable>
			</MwDialog>
		</>
	);
}
