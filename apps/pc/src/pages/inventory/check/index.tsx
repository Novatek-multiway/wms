import { useTranslation } from "react-i18next";
import { pick, uniqBy } from "lodash";
import {
	MwAction,
	MwDialogFormField,
	MwSearchTable,
	MwSearchTableField,
	MwTableCtrlField,
	Record,
	setDefaultDataFilter
} from "multiway";
import { useCallback, useRef, useState } from "react";
import useConvertorRequest from "@/hooks/useConvertorRequest";
import useEnumOptions from "@/hooks/useEnumOptions";
import useStatusOptions from "@/hooks/useStatusOptions";
import { GetAreaSelectItemList } from "@/pages/basicConfiguration/material/services/materialFile";
import service from "../services";
import Operations from "./components/operations";
import StocktakeByLocation from "./components/stocktakeByLocation";
import StocktakeByMaterial from "./components/stocktakeByMaterial";
import StocktakeBySamplingDialog from "./components/stocktakeBySamplingDialog";
import StocktakeRecordTable from "./components/stocktakeRecordTable";
import { EStockTakeType, EStocktakeTypeMap, FHandleSetIdList, IdList, ITableRef, STOCK_TAKE_TYPE_MAP } from "./constants";
import { useStore } from "@/store";

export default function Check() {
	const { t } = useTranslation();
	const {
		GetPageDataStocktake,
		AddStocktakeByAll,
		AddStocktakeByLocation,
		AddStocktakeByMaterial,
		EnumStocktakeStatus,
		GetStocktakeDetail,
		UpdateStocktakeByAll,
		UpdateStocktakeByLocation,
		UpdateStocktakeByMaterial
	} = service;

	const tableRef = useRef(null);

	const { goodsStore } = useStore();

	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});

	const locationRef = useRef<ITableRef>(null);
	const materialRef = useRef<ITableRef>(null);

	const targetAreaOptions = useConvertorRequest(GetAreaSelectItemList, { label: "itemName", value: "itemId" }, ["resultData"]);
	const { options: stocktakeStatusOptions, statusEnum } = useStatusOptions(EnumStocktakeStatus);
	const stockTakeTypeOptions = useEnumOptions("EnumStocktakeType", "itemId");
	const stocktakeRecordStatusOptions = useEnumOptions("EnumStocktakeRecordStatus", "itemId");
	goodsStore.setStocktakeRecordStatusOptions(stocktakeRecordStatusOptions);
	const positionTypeOptions = useEnumOptions("EnumPositionType", "itemId");
	goodsStore.setPositionTypeOptions(positionTypeOptions);

	const [stockTakeType, setStockTakeType] = useState<EStockTakeType>();
	const [idList, setIdList] = useState<IdList>({ locationIdList: [], materialIdList: [] });

	const [childRecordMap, setChildRecordMap] = useState({});

	const handleSetIdList = useCallback<FHandleSetIdList>((field, values) => {
		setIdList(pre => ({
			...pre,
			[field]: values
		}));
	}, []);

	const handleCancel = () => {
		setStockTakeType(undefined);
		setIdList({
			materialIdList: [],
			locationIdList: []
		});
	};

	const refresh = (tableRef?.current as any)?.refresh;

	const handleAddApi = (res: Record) => {
		const stocktakeInfo = {
			id: 0,
			...pick(res, ["stocktakeCode", "targetAreaId", "stocktakeDescription"])
		};
		if (stockTakeType === "All") {
			return AddStocktakeByAll(stocktakeInfo).then(handleCancel);
		}
		const idKey = stockTakeType === "Material" ? ["materialIdList"] : ["locationIdList"];
		const action = stockTakeType === "Material" ? AddStocktakeByMaterial : AddStocktakeByLocation;
		const data = {
			stocktakeInfo,
			...pick(idList, idKey)
		};
		return action(data).then(handleCancel);
	};

	const handleUpdateApi = (res: Record) => {
		const stocktakeInfo = {
			id: 0,
			...pick(res, ["id", "stocktakeCode", "targetAreaId", "stocktakeDescription"])
		};
		if (stockTakeType === "All") {
			return UpdateStocktakeByAll(stocktakeInfo).then(handleCancel);
		}
		const idKey = stockTakeType === "Material" ? ["materialIdList"] : ["locationIdList"];
		const action = stockTakeType === "Material" ? UpdateStocktakeByMaterial : UpdateStocktakeByLocation;
		const data = {
			stocktakeInfo,
			...pick(idList, idKey)
		};
		return action(data).then(handleCancel);
	};

	const handleEdit = async (record: Record) => {
		const newStocktakeType = STOCK_TAKE_TYPE_MAP[record.stocktakeType as EStocktakeTypeMap];
		setStockTakeType(newStocktakeType);
		if (newStocktakeType === "All") return;
		const { resultData } = await GetStocktakeDetail(pick(record, ["id"]));
		if (newStocktakeType === "Location") {
			const selections = (resultData as any)?.stocktakeLocationList.map((location: any) => ({
				...pick(location, ["locationCode"]),
				id: location.locationId
			}));
			locationRef.current?.setSelection(uniqBy(selections, "id"));
		} else if (newStocktakeType === "Material") {
			const selections = (resultData as any)?.stocktakeRecordList.map((record: any) => ({
				...pick(record, ["materialCode", "materialName", "materialItemId", "materialSize"]),
				id: record.materialId
			}));
			materialRef.current?.setSelection(uniqBy(selections, "id"));
		}
	};

	const childApi = (id: string) =>
		GetStocktakeDetail({ id }).then((res: any) => ({
			content: res?.resultData?.stocktakeRecordList ?? [],
			totalCount: res?.resultData?.stocktakeRecordList?.length ?? 0,
			...res
		}));

	//	每次展开都应该再次请求子表格的数据
	const onExpand = async (expand: Record, record: boolean) => {
		if (expand) {
			const res = await childApi(record.id);
			setChildRecordMap({
				...childRecordMap,
				[record.id]: res.content
			});
		}
	};

	const refreshChild = (record: any) => onExpand(record, true);

	const tableFields: Array<MwSearchTableField> = [
		{
			title: t("盘点计划号"),
			width: 150,
			key: "stocktakeCode",
			search: true
		},
		{
			title: t("盘点类型"),
			key: "stocktakeType",
			width: 120,
			options: stockTakeTypeOptions
		},
		{
			title: t("搬运目标区域"),
			key: "targetAreaId",
			width: 120,
			type: "select",
			options: targetAreaOptions,
			dialog: {
				required: true
			}
		},
		{
			title: t("盘点计划状态"),
			key: "stocktakeStatus",
			width: 120,
			type: "select",
			search: true,
			options: stocktakeStatusOptions,
			renderType: "status",
			valueEnum: statusEnum
		},
		{
			title: t("盘点计划描述"),
			key: "stocktakeDescription",
			width: 120,
			type: "textarea",
			dialog: {
				span: 24
			}
		},
		{
			title: t("添加时间"),
			key: "createTime",
			width: 200
		},
		{
			title: t("更新时间"),
			key: "updateTime",
			width: 200
		}
	];

	const beforeFields: MwDialogFormField[] = [
		{
			title: t("盘点类型"),
			key: "stocktakeType",
			dialog: {},
			options: stockTakeTypeOptions.filter(opt => opt.value !== 3),
			type: "select",
			disabled: true,
			hiddenMode: ["add", "view"]
		},
		{
			title: t("盘点类型"),
			key: "stocktakeType",
			dialog: {
				required: true,
				onChange: (value: EStocktakeTypeMap) => {
					setStockTakeType(STOCK_TAKE_TYPE_MAP[value]);
				}
			},
			options: stockTakeTypeOptions.filter(opt => opt.value !== 3),
			type: "select",
			hiddenMode: ["update"]
		},
		{
			title: t("盘点计划号"),
			width: 150,
			key: "stocktakeCode",
			search: true,
			dialog: {},
			disabled: true,
			hiddenMode: ["add", "view"]
		},
		{
			title: t("盘点计划号"),
			width: 150,
			key: "stocktakeCode",
			search: true,
			dialog: {},
			hiddenMode: ["update"]
		}
	];

	const finalField: MwDialogFormField = {
		hidden: !stockTakeType || stockTakeType === "All" || stockTakeType === "Sampling",
		title: t("盘点明细"),
		key: "idListKey",
		dialog: {
			span: 24
		},
		type: "custom",
		renderContent: () => {
			return (
				<>
					{stockTakeType === "Location" && <StocktakeByLocation handleSetIdList={handleSetIdList} ref={locationRef} />}
					{stockTakeType === "Material" && <StocktakeByMaterial handleSetIdList={handleSetIdList} ref={materialRef} />}
				</>
			);
		}
	};

	const ctrl: MwTableCtrlField = {
		title: t("operation"),
		width: 250,
		fixed: "right",
		render: (_, record: Record) => <Operations record={record as any} refresh={refresh} handleEdit={handleEdit} />
	};

	const expandedRowRender = (record: Record) => {
		return <StocktakeRecordTable record={record} data={childRecordMap?.[record?.id] ?? []} refresh={refreshChild} />;
	};

	return (
		<MwSearchTable
			rowKey="id"
			scrollX={1200}
			ref={tableRef}
			fields={tableFields}
			api={GetPageDataStocktake}
			ctrl={ctrl}
			dialogFormExtend={{
				fields: [...beforeFields, ...tableFields, finalField],

				width: "70%",
				span: 12,
				dialogOnly: true,
				addApi: handleAddApi,
				updateApi: handleUpdateApi,
				onClose: handleCancel,
				onCancel: handleCancel
			}}
			tableExtend={{
				expandable: {
					expandedRowRender,
					onExpand
				}
			}}
		>
			<MwAction action="add">{t("新增")}</MwAction>
			<StocktakeBySamplingDialog refresh={refresh} />
		</MwSearchTable>
	);
}
