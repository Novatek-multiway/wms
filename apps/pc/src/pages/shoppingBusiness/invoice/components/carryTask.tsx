import { useTranslation } from "react-i18next";
import { message } from "antd";
import { MwButton, MwCtrl, MwDialogForm, MwDialogFormField, Record } from "multiway";
import { useState } from "react";
import services from "../../services";

interface IProps {
	record: Record;
	locationOptions: any[];
}

export default function CarryTask({ record, locationOptions }: IProps) {
	const { t } = useTranslation();
	const { CreateCarryTask } = services;
	const [visible, setVisible] = useState(false);

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
			allocationId: record.id
		};
		return CreateCarryTask(params);
	};
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
				onSuccess={() => message.success(t("创建搬运任务成功"))}
			/>
		</>
	);
}
