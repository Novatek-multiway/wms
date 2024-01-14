import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { DEFAULT_MATIERAL_DES } from "../constants";

interface IProps {
	record: Record<string, any>;
	parentRecord: Record<string, any>;
	otherDatas: any[];
	statusOptions: any[];
}

interface IDescriptionsItem {
	label: string;
	value: string | number;
}

export default function useMaterialDescriptions({ record, otherDatas, parentRecord, statusOptions }: IProps) {
	const { t } = useTranslation();
	return useMemo<IDescriptionsItem[]>(() => {
		const defaultDescriptions: IDescriptionsItem[] = DEFAULT_MATIERAL_DES.map(({ label, key }) => ({
			label,
			value: record?.[key] ?? t("空")
		}));

		const totalQuantity = otherDatas?.reduce((acc, cur) => {
			acc += cur.quantity;
			return acc;
		}, 0);

		const qualityStatusText = statusOptions?.find?.(opt => opt.value === parentRecord.qualityStatus)?.label ?? t("空");

		return [
			...defaultDescriptions,
			{
				label: t("已分配库存"),
				value: totalQuantity
			},
			{
				label: t("出库区域"),
				value: parentRecord.outboundAreaName
			},
			{
				label: t("质量状态"),
				value: qualityStatusText
			}
		];
	}, [record, parentRecord, otherDatas, statusOptions]);
}
