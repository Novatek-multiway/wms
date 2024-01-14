import { useTranslation } from "react-i18next";
import React, { useState, useRef, useEffect } from "react";
import { MwFormField, MwForm, MwButton, useOptions, MwDialog, MwCardGroup } from "multiway";
import { message, Col } from "antd";
import { getWorkbenchData } from "@/pages/basicConfiguration/material/services/materialFile";
import { getMaterialForm } from "@/pages/basicConfiguration/material/services/materialForm";
import { getMaterialInfo, getQualityStatus } from "@/pages/basicConfiguration/material/services/materialInfo";
import submitService from "@/pages/basicConfiguration/composition/services";
import containerServices from "@/pages/basicConfiguration/container/services";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import { useRequest } from "ahooks";
import service from "../../services";
import { find } from "lodash";
import moment from "moment";
export default function WorkbenchCombine() {
	const { t } = useTranslation();
	const [singleDialogVisible, setSingleDialogVisible] = useState(false);
	const [SingleDialogData, setSingleDialogData] = useState([]);
	const [SelectSingleLine, setSelectSingleLine] = useState({});

	const [businessType, setBusinessType] = useState("");
	const [combineOption, setCombineOption] = useState([]);
	const [containerData, setContainerData] = useState({});
	const locationCodeOptions = useConvertorRequest(
		getWorkbenchData,
		item => ({
			label: item.areaAliasName + item.areaName,
			value: item.id
		}),
		["resultData"]
	);

	// 容器编号
	const { options: containerCodeOptions } = useOptions(containerServices.getContainerData, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData", "pageData"],
		keepOrigin: true,
		transform: {
			label: "containerCode",
			value: "containerCode"
		}
	});

	const { options: qualityStatusOptions } = useOptions(getQualityStatus, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData"],
		transform: (option: { itemName: any; itemId: any }) => {
			return {
				label: option.itemName,
				value: Number(option.itemId)
			};
		}
	});
	const { options: receiptOptions, data: receiptData } = useOptions(service.postReceiptHeaderList, {
		params: { pageIndex: 1, pageSize: 200 },
		keepOrigin: true,
		path: ["resultData", "pageData"],
		transform: (option: { itemName: any; itemId: any }) => {
			return {
				label: option.receiptCode,
				value: option.id
			};
		}
	});
	const { options: supplierOptios } = useOptions(service.getContacts, {
		params: { pageIndex: 1, pageSize: 200 },
		path: ["resultData", "pageData"],
		keepOrigin: true,
		transform: {
			label: "contactName",
			value: "id"
		}
	});

	// 根据id获取对应的收货单明细
	const getDetailById = id => {
		const singleData = find(receiptData?.resultData?.pageData, ["id", id]);
		if (singleData.receiptLineList && singleData.receiptLineList.length) {
			setSingleDialogData(singleData.receiptLineList);
			setSingleDialogVisible(true);
			console.log("");
		} else {
			message.error(t("此收货单没有对应的单行数据"));
		}
	};
	const { run: getSysReceivingTypeSetting } = useRequest(service.GetSysReceivingTypeSetting, {
		manual: true,
		onSuccess: (data: any) => {
			setBusinessType(data.resultData?.receivingBusinessType);
		}
	});
	const { run: getCombineOption } = useRequest(service.getCombineOption, {
		manual: true,
		onSuccess: (data: any) => {
			setCombineOption(data.resultData?.receivingBusinessType);
		}
	});
	useEffect(() => {
		// 获取组台盘枚举
		getCombineOption();
		// 获取系统默认收货类型设置
		getSysReceivingTypeSetting();
	}, []);
	const formRef = useRef<any>();
	const fields: Array<MwFormField> = [
		{
			type: "card",
			key: "base",
			children: [
				{
					title: t("组盘位置"),
					type: "select",
					key: "locationCode",
					require: true,
					options: locationCodeOptions
				},
				{
					title: t("容器编号"),
					key: "containerCode",
					type: "select",
					require: true,
					onChange: (field, record) => {
						console.log("field", field, "record>>", record);
						setContainerData({
							containerTypeId: record.containerTypeId,
							containerId: record.id
						});
					},
					options: containerCodeOptions.filter(item => item.isEnable && item.carryStatus != 1)
				},
				{
					title: t("收货单号"),
					key: "receiptCode",
					type: "select",
					require: true,
					options: receiptOptions,
					onChange: (field, record) => {
						if (record.value) return;
						getDetailById(field);
					}
				},
				{
					title: t("物料编码"),
					key: "materialCode",
					disabled: true,
					require: true
				},
				{
					title: t("质量状态"),
					key: "qualityStatus",
					type: "select",
					disabled: true,
					require: true,
					options: qualityStatusOptions
				},
				{
					title: t("有效期天数"),
					key: "expiresDays",
					type: "number",
					require: true
				},
				{
					title: t("收货日期"),
					key: "receivingDate",
					type: "date",
					require: true,
					defaultValue: moment().format()
				},
				{
					title: t("批次号"),
					key: "batchNumber",
					disabled: true,
					require: true
				},
				{
					title: t("收货数量"),
					key: "quantity",
					type: "number",
					require: true
					// disabled: true
				},
				{
					title: t("供应商"),
					key: "supplierId",
					type: "select",
					options: supplierOptios.filter(item => item.isSupplier)
				},
				{
					title: t("载货状态"),
					key: "carryStatus",
					type: "select",
					require: true,
					options: [
						{ label: t("满"), value: 1 },
						{ label: t("半满"), value: 2 }
					]
				},
				{
					title: t("描述信息"),
					type: "textarea",
					key: "materialItemDescription"
				}
			]
		}
	];

	const setSubmitValues = async values => {
		const postBody = {
			combineOption: businessType,
			locationCode: values.locationCode,
			containerCode: values.containerCode,
			carryStatus: values.carryStatus,

			containerTypeId: containerData.containerTypeId,
			containerId: containerData.containerId,
			combineItemList: [
				{
					...SelectSingleLine,
					...values,
					receiptLineId: 0,
					rowIndex: 0,
					columnIndex: 0,
					materialTypeName: "",
					materialUID: "",
					materialSize: SelectSingleLine.materialSize,
					receiptCode: SelectSingleLine.receiptCode
				}
			]
		};
		try {
			await submitService.submitApply(postBody);
			service.InStockApply(values.locationCode);
			message.success(t("提交成功！"));
			formRef.current.resetFields();
		} catch (err) {
			console.log("error", err);
		}
	};

	return (
		<>
			<MwForm fields={fields} span={8} onConfirm={values => setSubmitValues(values)} ref={formRef}>
				<Col span={24}>
					<MwButton
						style={{
							position: "absolute",
							bottom: 10,
							right: 10
						}}
						type="primary"
						htmlType="submit"
					>
						{t("申请入库提交")}
					</MwButton>
					{/* <MwButton
            style={{
            	position: "absolute",
            	bottom: 10,
            	right: 80
            }}
            type="primary"
            >
            申请入库提交
            </MwButton> */}
				</Col>
			</MwForm>
			<MwDialog visible={singleDialogVisible} title={t("选择单行号数据")} onClose={() => setSingleDialogVisible(false)}>
				<MwCardGroup
					options={SingleDialogData.map(item => {
						return {
							value: item.id,
							label: t("收货单行号：{{receiptLineNumber}}", { receiptLineNumber: item.receiptLineNumber }),
							description: t("物料信息：{{materialName}}", { materialName: item.materialName })
						};
					})}
					onChange={value => {
						const selectData = find(SingleDialogData, ["id", value]);
						setSelectSingleLine(selectData);
						setSingleDialogVisible(false);
						formRef.current.setFieldsValue({
							materialCode: selectData.materialCode,
							materialModelId: selectData.materialModelId,
							qualityStatus: selectData.qualityStatus,
							// quantity: selectData.quantity,
							batchNumber: selectData.batchNumber
						});
					}}
				/>
			</MwDialog>
		</>
	);
}
