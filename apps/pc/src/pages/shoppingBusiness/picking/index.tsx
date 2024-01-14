import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { message } from "antd";
import { Record, MwButton, MwSearchTable, MwSearchTableField, setDefaultDataFilter } from "multiway";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import service from "../services";
import useLocationCodeOptions from "./hooks/useLocationCodeOptions";
import { Cascader, InputNumber } from "antd";
import { ITable } from "../invoice/common/hooks/useCommonTableProps";
import { isEmpty, last } from "lodash";
import { getQuery } from "@/assets/js/publicFunc";

export default function Picking() {
	const { t } = useTranslation();
	const { getEnumQualityStatus, GetContainerInventory, OutboundPicking, InStockApply } = service;
	const qualityStatusOptions = useConvertorRequest(getEnumQualityStatus, { label: "itemName", value: "itemId" }, ["resultData"]);
	const { locationCodeOptions } = useLocationCodeOptions();

	const [isOutBoundPickingDisabled, setIsOutBoundPickingDisabled] = useState(true);
	const [isOutBoundPickingLoading, setIsOutBoundPickingLoading] = useState(false);

	const tableRef = useRef<ITable>(null);

	const [containerCodeOptions, setContainerCodeOptions] = useState<Array<{ value: string, label: string }>>([]);

    setDefaultDataFilter((res: any) => {
		setContainerCodeOptions(res.resultData.map(item => ({
			value: item.containerCode,
			label: item.containerCode,
		})))
		// return 的对象需要包含以下两条数据
		return {
			// 表格列表的数据
			content: res.resultData.map(item => ({
				...item,
				uniqueId: item.inventoryId + '-' + item.invoiceLineId
			})),
			// 数据总共 n 条
			totalCount: res.resultData.length,
			...res
		};
	});

	const getApi = (res: any) => {
		tableRef?.current?.setSelection?.([]);
        //  locationCode为必填参数，还未填写时直接返空
        if(res?.query?.locationCode) {
            if (Array.isArray(res.query.locationCode)) {
                res.query.locationCode = res.query.locationCode[1]
            }
            return GetContainerInventory(res.query)
        }
        return Promise.resolve({ resultData: [] })
    }

	const handleTableChange = (value: string | number, index: number, field: string) => {
		const currentData = tableRef?.current?.getTableData();
		const newTableData = currentData?.map((item: Record, idx: number) => {
			if (idx === index) {
				return {
					...item,
					[field]: value
				};
			}
			return item;
		});
		tableRef?.current?.setTableData?.(newTableData);
	};

	//  通过ref获取到的selections里的数据不是实时的。
    const getSelections = () => {
        const selections = tableRef.current?.getSelection()?.map(item => item.uniqueId);
        const idToRecord = tableRef?.current?.getTableData?.().reduce((acc, cur) => {
			acc[cur.uniqueId] = cur;
            return acc;
        }, {})
        return selections?.map(sel => idToRecord[sel]);
    }

	// 出库
	const handleOutboundPicking = async () => {
		const selections = getSelections();
		if (isEmpty(selections)) return;
		setIsOutBoundPickingLoading(true);
		await OutboundPicking(selections as any[]).finally(() => setIsOutBoundPickingLoading(false));
		message.success(t("出库成功"));
		tableRef?.current?.clearSelection();
		tableRef.current?.refresh();
	};

	// 回库
	const handleInStockApply = async () => {
		const params = tableRef.current?.getApiParams();
		if (!Array.isArray(params?.query?.locationCode)) return;
		const fromLocationCode: string = last(params.query.locationCode) as string;
		await InStockApply({ fromLocationCode, containerCode: params?.query?.containerCode })
		message.success(t('genOutStock'))
		tableRef?.current?.clearSelection();
	};

	const handleSelectionChange = (selections: Record, values: string[]) => {
		setIsOutBoundPickingDisabled(isEmpty(values));
	};

	const searchFields: Array<MwSearchTableField> = [
		{
			title: t("出库位置"),
			key: "locationCode",
			width: 150,
            search: true,
            required: true,
            type: 'custom',
            renderContent: () => {
				return <Cascader 
					options={locationCodeOptions}
					displayRender={(labels: string[]) => labels[labels.length - 1]}
					style={{ width: '100%' }}
					placeholder={t("selectOutbound")}
				/>
			},
		},
		{
			title: t("发货单号"),
			key: "invoiceCode",
			width: 150,
            search: true
		},
		{
			title: t("容器编号"),
			key: "containerCode",
			width: 150,
            search: true
		},
    ]

	const fields: Array<MwSearchTableField> = [
		{
			title: t("容器编号"),
			key: "containerCode",
			width: 120
		},
		{
			title: t("物料编号"),
			key: "materialCode",
			width: 120
		},
		{
			title: t("物料名称"),
			key: "materialName",
			width: 150
		},
		{
			title: t("规格"),
			key: "materialSize",
			width: 150
		},
		{
			title: t("质量状态"),
			key: "qualityStatus",
			width: 120,
			options: qualityStatusOptions
		},
		{
			title: t("批次号"),
			key: "batchNumber",
			width: 120
		},
		{
			title: t("分配数量"),
			key: "allotQuantity",
			width: 100
		},
		{
			title: t("已出数量"),
			key: "outboundQuantity",
			width: 100
		},
		{
			title: t("当前库存"),
			key: "inventoryQuantity",
			width: 150
		},
		{
			title: t("拣选数量"),
			key: "pickingQuantity",
			width: 180,
			render: (text: number, record, index) => (
				<InputNumber
					precision={0}
					min={0}
					value={text}
					placeholder={t("请输入组盘数量")}
					onChange={val => handleTableChange(val as number, index, "pickingQuantity")}
				></InputNumber>
			)
		},
		{
			title: t("出库需求编号"),
			key: "outboundRequirementCode",
			width: 150
		},
		{
			title: t("发货单号"),
			key: "invoiceCode",
			width: 150,
			search: true,
			render: (text: string, record) => (text && record?.invoiceLineNumber ? `${text}-${record.invoiceLineNumber}` : "")
		}
	];

	useEffect(() => {
		const { areaId = "", locationCode = "", invoiceCode = "" } = getQuery();
		if (areaId && locationCode) {
			const data = {
				locationCode: [areaId, locationCode],
				invoiceCode
			};
			const searchRef = tableRef.current?.getSearchRef();
			searchRef.setFieldsValue(data);
			searchRef.submit();
		}
	}, []);

	return (
		<MwSearchTable
			api={getApi}
			fields={fields}
			scrollX={1300}
            rowKey={'uniqueId'}
            searchExtend={{ fields: searchFields }}
			ref={tableRef}
			selectionType="checkbox"
			selectShowKey="uniqueId"
			onSelectionChange={handleSelectionChange}
			rowSelection={{
				getCheckboxProps: (record: any) => ({
					disabled: !record.isAllot
				})
			}}
		>
			<MwButton onClick={handleInStockApply}>{t("回库")}</MwButton>
			<MwButton
				type="primary"
				loading={isOutBoundPickingLoading}
				disabled={isOutBoundPickingDisabled}
				onClick={handleOutboundPicking}
			>
				{t("出库")}
			</MwButton>
		</MwSearchTable>
	);
}
