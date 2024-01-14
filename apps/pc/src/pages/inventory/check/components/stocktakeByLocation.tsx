import { useTranslation } from "react-i18next";
import { MwButton, MwSearchTable, MwSearchTableField, Record, setDefaultDataFilter } from "multiway";
import { forwardRef, ForwardRefRenderFunction, memo, useImperativeHandle, useRef } from "react";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import useEnumOptions from "@/hooks/useEnumOptions";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import services from "../../services";
import { FHandleSetIdList, IS_FULL_OPTIONS, ITableRef } from "../constants";
import { useStore } from "@/store";
import { materialTypeIdOptions } from "@/utils/date";

interface IProps {
	handleSetIdList: FHandleSetIdList;
}

const StockTakeByLocation: ForwardRefRenderFunction<ITableRef, IProps> = ({ handleSetIdList }: IProps, ref) => {
	const { t } = useTranslation();
	const { goodsStore } = useStore();

	const { LocationGetPageData, getLocationOptions, postStorageList } = services;

	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});

	const tableRef = useRef(null);

	const areaOption = useConvertorRequest(getLocationOptions, { label: "itemName", value: "itemId" }, ["resultData"]); // 所属区域
	const locationStatusOptions = useEnumOptions("EnumLocationStatus", "itemId");

	const handleSelectionChange = (selections: Record[]) => {
		const values = selections.map(selection => selection.id);
		handleSetIdList("locationIdList", values);
	};

	const fields: Array<MwSearchTableField> = [
		{
			title: t("货位编号"),
			key: "customCode",
			width: 150
		},
		{
			title: t("位置类型"),
			width: 120,
			key: "positionType",
			options: goodsStore.positionTypeOptions // 位置类型：1-库位，2-工位，3-车载位
		},
		{
			title: t("物料名称"),
			key: "materialCode",
			width: 150,
			render(text, record, index) {
				return record.materialCode;
			},
			search: {
				position: "more"
			}
		},
		{
			title: t("LPN"),
			key: "lpn",
			width: 150,
			search: {
				position: "more"
			}
		},
		{
			title: "包装方式",
			key: "materialItemDescription",
			width: 150,
			options: materialTypeIdOptions,
			search: {
				type: "select",
				position: "more"
			}
		}
	];

	useImperativeHandle(ref, () => ({
		setSelection: (tableRef.current as any)?.setSelection
	}));

	return (
		<MwSearchTable
			ref={tableRef}
			fields={fields}
			api={postStorageList}
			onSelectionChange={handleSelectionChange}
			editMode="row"
			selectionType="checkbox"
			rowKey="id"
			extraVisible={false}
			selectShowKey="locationCode"
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

export default memo(forwardRef(StockTakeByLocation));
