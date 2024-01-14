import { useTranslation } from "react-i18next";
import { message } from "antd";
import { isEmpty } from "lodash";
import { MwButton, MwCtrl, MwDialog, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record } from "multiway";
import { useRef, useState } from "react";
import useEnumOptions from "@/hooks/useEnumOptions";
import { commonOptions } from "@/pages/shoppingBusiness/invoice/common/constants";
import { useStore } from "@/store";
import services from "../../services";
import CarryTaskDialog from "./carryTaskDialog";
import { EAuth } from "../constants";

interface IProps {
	record: Record;
	auth: EAuth;
}

export default function StocktakeLocationDialog({ record, auth }: IProps) {
	const { t } = useTranslation();
	const { goodsStore } = useStore();

	const { GetStocktakeDetail, postUpdateStocktakeRecord, BatchCreateCarryTask, InStockApply } = services;

	const tableRef = useRef(null);
	const [visible, setVisible] = useState(false);
	const [isCarryTaskDisabled, setIsCarryTaskDisabled] = useState(true);
	const [isCarryTaskLoading, setIsCarryTaskLoading] = useState(false);

	const api = () =>
		GetStocktakeDetail({ id: record.id }).then((res: any) => {
			const locationList = res?.resultData?.stocktakeLocationList ?? [];
			const recordList = res?.resultData?.stocktakeRecordList ?? [];
			return {
				content: locationList.map((location: any) => ({
					...location,
					recordList: recordList.filter((record: any) => record.locationCode === location.locationCode)
				})),
				totalCount: res?.resultData?.stocktakeLocationList?.length ?? 0,
				...res
			};
		});

	const handleUpdate = async (currentRecord: Record) => {
		await postUpdateStocktakeRecord([currentRecord]);
		tableRef.current?.refresh?.();
		message.success(t("提交成功"));
	};

	const handleSelectionChange = (selections: Record, values: string[]) => {
		setIsCarryTaskDisabled(isEmpty(values));
	};

	const handleBatchCreateCarryTask = async () => {
		setIsCarryTaskLoading(true);
		const selections = (tableRef?.current?.getSelection?.() ?? []).map(selection => selection.stocktakeLocationId);
		await BatchCreateCarryTask(selections).finally(() => setIsCarryTaskLoading(false));
		tableRef.current?.refresh?.();
		tableRef?.current?.clearSelection?.();
		message.success(t("批量搬运成功"));
	};

	const handleInStockApply = async ({ containerPositionCode, containerCode, ...other }: Record) => {
		await InStockApply({
			containerCode,
			fromLocationCode: containerPositionCode
		});
		tableRef.current?.refresh?.();
		message.success(t("生成回库任务成功"));
	};

	const fields: MwSearchTableField[] = [
		{
			title: t("被盘库位"),
			key: "customCode",
			width: 100
		},
		{
			title: t("容器编号"),
			key: "containerCode",
			width: 100
		},
		{
			title: t("容器位置"),
			key: "containerPosition",
			width: 100
		},
		{
			title: t("位置类型"),
			key: "containerPositionType",
			width: 100,
			options: goodsStore.positionTypeOptions
		},
		{
			title: t("允许回库"),
			key: "isAllowReturn",
			width: 80,
			options: commonOptions
		}
	];

	const ctrl: MwTableCtrlField = {
		title: t('operation'),
		width: 150,
		fixed: "right",
		render: (_, currentRecord: Record) => {
			if (auth === EAuth.None) {
				return null;
			}
			return (
				<MwCtrl>
					<CarryTaskDialog record={record} childRecord={currentRecord} />
					{currentRecord.isAllowReturn && <MwButton onClick={() => handleInStockApply(currentRecord)}>{t("回库")}</MwButton>}
				</MwCtrl>
			);
		}
	};

	const childFields: MwSearchTableField[] = [
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
			title: t("盘前数量"),
			key: "stocktakeQuantity",
			width: 100
		},
		{
			title: t("盘后数量"),
			key: "adjustedQuantity",
			width: 100,
			editable: auth === EAuth.All,
			renderType: auth === EAuth.All ? "editable-cell-number" : undefined,
			contentProps: {
				precision: 0,
				min: 1
			}
		},
		{
			title: t("盈亏状态"),
			key: "stocktakeRecordStatus",
			width: 100,
			options: goodsStore.stocktakeRecordStatusOptions
		},
		{
			title: t("盘点完成"),
			key: "isFinish",
			width: 80,
			options: commonOptions
		}
	];

	const childCtrl: MwTableCtrlField = {
		width: 150,
		fixed: "right",
		title: t('operation'),
		render: (_, currentRecord: Record) => {
			if (record?.stocktakeStatus !== 2) {
				return null;
			}
			return (
				<MwCtrl>{!currentRecord.isFinish && <MwButton onClick={() => handleUpdate(currentRecord)}>{t("提交")}</MwButton>}</MwCtrl>
			);
		}
	};

	const expandedRowRender = (record: Record) => {
		return (
			<MwSearchTable
				// ref={tableRef}
				title={t("盘点记录")}
				rowKey="id"
				editMode="col"
				// scrollX={1200}
				ctrl={auth === EAuth.None ? undefined : childCtrl}
				searchVisible={false}
				pagination={false}
				extraVisible={false}
				fields={childFields}
				data={record.recordList}
			/>
		);
	};

	return (
		<>
			<MwCtrl>
				<MwButton onClick={() => setVisible(true)}>{t("盘点库位")}</MwButton>
			</MwCtrl>
			<MwDialog
				width={1500}
				title={t("盘点库位")}
				visible={visible}
				confirmVisible={false}
				onClose={() => setVisible(false)}
				bodyStyle={{ overflowY: "auto", maxHeight: 650 }}
			>
				<MwSearchTable
					ref={tableRef}
					title={t("盘点库位")}
					rowKey="locationId"
					editMode="col"
					api={api}
					onSelectionChange={handleSelectionChange}
					selectionType={auth === EAuth.None ? undefined : "checkbox"}
					selectShowKey="locationCode"
					ctrl={auth === EAuth.None ? undefined : ctrl}
					searchVisible={false}
					pagination={false}
					extraVisible={false}
					fields={fields}
					tableExtend={{
						expandable: {
							defaultExpandAllRows: true,
							expandedRowRender
						}
					}}
				>
					{auth !== EAuth.None && (
						<MwButton
							type="primary"
							loading={isCarryTaskLoading}
							disabled={isCarryTaskDisabled}
							onClick={handleBatchCreateCarryTask}
						>
							{t("批量搬运")}
						</MwButton>
					)}
				</MwSearchTable>
			</MwDialog>
		</>
	);
}
