import { useTranslation } from "react-i18next";
import { message } from "antd";
import { MwButton, MwCtrl, MwDialogForm, MwDialogFormField, Record } from "multiway";
import { useEffect, useState } from "react";
import services from "../../services";

interface IProps {
	record: Record;
	childRecord: Record;
}

export default function CarryTaskDialog({ record, childRecord }: IProps) {
	const { t } = useTranslation();
	const { CreateCarryTask, GetLocationByAreaId } = services;
	const [visible, setVisible] = useState(false);
	const [locationOptions, setLocationOptions] = useState([]);

	const fields: Array<MwDialogFormField> = [
		{
			title: t("目标位置"),
			key: "targetLocation",
			type: "select",
			options: locationOptions,
			required: true
		}
	];

	//  搬运
	const handleCarryTask = (res: { targetLocation: string }) => {
		const params = {
			...res,
			id: childRecord.stocktakeLocationId
		};
		return CreateCarryTask(params);
	};

	const initData = async () => {
		const { resultData } = await GetLocationByAreaId({ areaId: record.targetAreaId });
		if (resultData?.length ?? 0) {
			const locationSelectItemList = resultData?.[0]?.locationSelectItemList?.map(item => ({
				...item,
				value: item.itemValue,
				label: item.itemName
			}));
			setLocationOptions(locationSelectItemList);
		}
	};

	useEffect(() => {
		if (visible) {
			initData();
		}
	}, [visible]);

	return (
		<>
			<MwCtrl>
				<MwButton onClick={() => setVisible(true)}>{t("搬运")}</MwButton>
			</MwCtrl>
			<MwDialogForm
				title={t("搬运")}
				visible={visible}
				fields={fields}
				centered
				okText={t("确认搬运")}
				addApi={handleCarryTask}
				onClose={() => setVisible(false)}
				onSuccess={() => message.success(t("搬运成功"))}
			/>
		</>
	);
}
