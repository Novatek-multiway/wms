import { message } from 'antd';
import { t } from 'i18next';
import {
    MwAction, MwCtrl, MwSearchTable, MwSearchTableField, MwTableCtrlField, Record, registerAction, setDefaultDataFilter, setDefaultSearchFilter
} from 'multiway';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useConvertorRequest from '@/hooks/useConvertorRequest';
import { getAreaData, GetAreaSelectItemList } from '@/pages/basicConfiguration/material/services/materialFile';
import services from '../services';
import BillTable from './components/dispatchBillTable';
import WaveInfoTable from './components/waveInfoTable';

const wavenumberStatusOptions = [
	{ label: t("新增"), value: 1 },
	{ label: t("激活"), value: 2 },
	{ label: t("分配"), value: 3 },
	{ label: t("完成"), value: 4 },
	{ label: t("取消"), value: 5 }
];

// 注册 MwCtrl 下的自定义事件，需要弹窗二次提醒
registerAction("confirm-action", props => {
	const { confirmtext, confirm } = props;
	return {
		confirm: true,
		confirmMsg: confirmtext,
		onConfirm: () => {
			typeof confirm === "function" && confirm();
		},
		...props
	};
});

export default function WaveTime() {
	const { t } = useTranslation();
	const areaOptions = useConvertorRequest(GetAreaSelectItemList, { label: "itemName", value: "itemId" }, ["resultData"]);
	setDefaultDataFilter((res: any) => {
		return {
			content: res.resultData.pageData,
			totalCount: res.resultData.totalCount,
			...res
		};
	});
	setDefaultSearchFilter((res: any) => {
		const {
			pagination: { current, pageSize },
			search
		} = res;
		return { pageSize, pageIndex: current, query: search };
	});
	const tableRef = useRef<any>(null);
	const dispatchBillTableRef = useRef<any>(null);

	const fields: Array<MwSearchTableField> = [
		{
			title: t("波次单头编号"),
			key: "wavenumberCode",
			search: true,
			dialog: {
				required: false,
				span: 12
			}
		},
		{
			title: t("波次单名称"),
			key: "wavenumberName",
			search: true,
			dialog: {
				required: true,
				span: 12
			}
		},
		{
			title: t("波次单状态"),
			key: "wavenumberStatus",
			type: "select",
			options: wavenumberStatusOptions,
			defaultValue: 1
		},
		{
			title: t("目标区域"),
			key: "toAreaId",
			table: false,
			type: "select",
			options: areaOptions,
			dialog: {
				required: true,
				span: 12
			}
		},
		{
			title: t("描述信息"),
			key: "waveHeaderDescription",
			type: "textarea",
			dialog: {
				required: false,
				span: 12
			}
		},
		{
			title: "",
			key: "billTable",
			type: "custom",
			table: false,
			renderContent: () => <BillTable ref={dispatchBillTableRef} />,
			hiddenMode: ["view"],
			dialog: {
				span: 24
			}
		},
		{
			title: t("创建时间"),
			key: "createTime"
		}
	];

	const refresh = () => {
		tableRef.current.refresh();
	};
	const handleAction = async (record: Record, type: number) => {
		try {
			const action = type === 1 ? "ActiveOrder" : type === 2 ? "AllocationOrder" : "WaveOrderExecute";
			await services[action]({ id: record.id });
			message.success(t("操作成功！"));
			refresh();
		} catch (e) {
			message.error(t("操作失败！"));
		}
	};

	const ctrl: MwTableCtrlField = {
title: t('operation'),
		width: 150,
		render: (_, record: Record) => {
			const actions = [];
			if (record.wavenumberStatus == 1) {
				actions.push(
					<MwAction confirmtext={t("确定激活？")} confirm={() => handleAction(record, 1)} record={record} action="confirm-action">
						{t("激活")}
					</MwAction>
				);
			} else if (record.wavenumberStatus == 2) {
				actions.push(
					<MwAction
						confirmtext={t("确定设置自动分配？")}
						confirm={() => handleAction(record, 2)}
						record={record}
						action="confirm-action"
					>
						{t("设置自动分配")}
					</MwAction>
				);
			} else if (record.wavenumberStatus == 3) {
				actions.push(
					<MwAction confirmtext={t("确定执行？")} confirm={() => handleAction(record, 3)} record={record} action="confirm-action">
						{t("执行")}
					</MwAction>
				);
			}
			actions.push(
				<MwAction record={record} danger action="delete" key="delete">
					{t("删除")}
				</MwAction>
			);
			return <MwCtrl>{actions}</MwCtrl>;
		}
	};
	const handleAdd = async (params: Record) => {
		const invoiceID = dispatchBillTableRef.current.getSelection().map((item: Record) => item.id);
		return await services.AddWaveHeader({ invoiceID, id: 0, ...params });
	};
	const renderExpand = (record: Record) => {
		return <WaveInfoTable record={record} />;
	};

	return (
		<MwSearchTable
			ref={tableRef}
			api={services.GetPageDataWaveHeader}
			fields={fields}
			rowKey="id"
			ctrl={ctrl}
			deleteApi={async res => {
				return await services.DelWaveHeader([res[0]]);
			}}
			dialogFormExtend={{
				fields: [...fields],
				addApi: handleAdd,
				width: "50%",
				span: 12,
				dialogOnly: true
			}}
			tableExtend={{
				expandable: {
					expandedRowRender: renderExpand,
					rowExpandable: (record: Record) => record.wavenumberLineList && record.wavenumberLineList.length
				}
			}}
		>
			<MwAction action="add">{t("新增")}</MwAction>
		</MwSearchTable>
	);
}
