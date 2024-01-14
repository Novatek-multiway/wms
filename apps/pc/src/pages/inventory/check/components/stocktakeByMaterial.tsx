import { useTranslation } from "react-i18next";
import { MwButton, MwSearchTable, MwSearchTableField, Record, setDefaultDataFilter } from "multiway";
import { forwardRef, ForwardRefRenderFunction, memo, useImperativeHandle, useRef } from "react";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import { getMaterialType } from "@/pages/basicConfiguration/material/services/materialType";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import services from "../../services";
import { FHandleSetIdList, ITableRef } from "../constants";

interface IProps {
	handleSetIdList: FHandleSetIdList;
}

const StocktakeByMaterial: ForwardRefRenderFunction<ITableRef, IProps> = ({ handleSetIdList }, ref) => {
	const { t } = useTranslation();
	const { MaterialGetPageData } = services;

	const tableRef = useRef(null);

	const materialTypeOptions = useConvertorRequest(getMaterialType, { label: "valueLabel", value: "id" }, ["resultData"]);

	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});

	const handleSelectionChange = (selections: Record[]) => {
		const values = selections.map(selection => selection.id);
		handleSetIdList("materialIdList", values);
	};

	const fields: Array<MwSearchTableField> = [
		{
			title: t("物料编码"),
			key: "materialCode",
			width: 100,
			search: {
				position: "more"
			}
		},
		{
			title: t("物料名称"),
			key: "materialName",
			width: 100
		},
		{
			title: t("物料类型"),
			width: 150,
			key: "materialTypeId",
			options: materialTypeOptions,
			search: {
				type: "select",
				position: "more",
				mode: "multiple"
			}
		},
		{
			title: t("物料规格"),
			key: "materialSize",
			width: 150
		}
	];

	useImperativeHandle(ref, () => ({
		setSelection: (tableRef.current as any)?.setSelection
	}));

	return (
		<MwSearchTable
			ref={tableRef}
			fields={fields}
			api={MaterialGetPageData}
			// scrollX={1000}
			editMode="row"
			selectionType="checkbox"
			rowKey="id"
			extraVisible={false}
			selectShowKey="materialCode"
			onSelectionChange={handleSelectionChange}
		>
			<MwButton type="primary" icon={<SearchOutlined />} onClick={() => (tableRef?.current as any).getMoreSearchRef().submit()}>
				{t("查询")}
			</MwButton>
			<MwButton icon={<ReloadOutlined />} onClick={() => (tableRef?.current as any).getMoreSearchRef().resetFields()}>
				{t("重置")}
			</MwButton>
		</MwSearchTable>
	);
};

export default memo(forwardRef(StocktakeByMaterial));
