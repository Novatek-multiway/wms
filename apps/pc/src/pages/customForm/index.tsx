import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { MwForm, MwButton, FormValues } from "multiway";
import { GetParamInfo, EditParamInfo, WmsClearData } from "./services";
import { useRequest } from "ahooks";
import { Tabs, Card, message, List, Popconfirm, Button } from "antd";
import "./index.module.less";

interface IgroupInfoItem {
	group: string;
	info: IinfoItem[];
}

interface IinfoItem {
	id: number;
	group: string;
	name: string;
	key: string;
	type: 1 | 2 | 3 | 4;
	value: string;
	isConfigurable: boolean;
	isDisable: boolean;
}

enum FormItemType {
	checkbox = 1,
	input,
	number,
	textarea
}

export default function CustomForm() {
	const { t } = useTranslation();
	const [tabs, setTabs] = useState<any[]>([]);
	const handleClear = async () => {
		try {
			await WmsClearData();
			message.success(t("清除成功！"));
		} catch (e) {
			message.error(t("清除失败！"));
		}
	};
	const baseTabs = [
		{
			key: "dataManagement",
			label: t("数据管理"),
			children: (
				<Popconfirm placement="topLeft" title={t("确认清除？")} okText={t("是")} cancelText={t("否")} onConfirm={handleClear}>
					<Button>{t("清除数据")}</Button>
				</Popconfirm>
			)
		}
	];

	const handleConfirm = async (form: FormValues) => {
		const { ...params } = form;
		try {
			if (params.type === FormItemType.checkbox) {
				params.value = Number(params.value) + "";
			} else if (params.type === FormItemType.number) {
				params.value = params.value + "";
			}
			await EditParamInfo(params);
			message.success(t("保存成功！"));
		} catch (e) {
			console.log(e);
			message.error(t("保存失败！"));
		}
	};
	useRequest<Result<IgroupInfoItem[]>, any>(GetParamInfo, {
		onSuccess: res => {
			const tabs = res.resultData.map(group => {
				const formList: any[] = [];
				group.info.forEach(info => {
					const fields = [
						{
							title: info.name,
							key: "value",
							disabled: info.isDisable,
							defaultValue: info.value,
							type: FormItemType[info.type]
						},
						{
							title: t("是否可配置"),
							type: "checkbox",
							key: "isConfigurable",
							defaultValue: info.isConfigurable
						},
						{
							type: "input",
							key: "id",
							defaultValue: info.id,
							hidden: true
						},
						{
							type: "input",
							key: "group",
							defaultValue: group.group,
							hidden: true
						},
						{
							type: "input",
							key: "name",
							defaultValue: info.name,
							hidden: true
						},
						{
							type: "input",
							key: "key",
							defaultValue: info.key,
							hidden: true
						},
						{
							type: "number",
							key: "type",
							defaultValue: info.type,
							hidden: true
						},
						{
							type: "checkbox",
							key: "isDisable",
							defaultValue: info.isDisable,
							hidden: true
						}
					];

					formList.push(
						<MwForm
							className="custom-form"
							formLayout="inline"
							fields={fields}
							onConfirm={handleConfirm}
							style={{ width: 620, margin: "0 auto" }}
						>
							<MwButton type="primary" htmlType="submit">
								{t("保存")}
							</MwButton>
						</MwForm>
					);
				});
				return {
					key: group.group,
					label: group.group,
					children: (
						<List
							style={{ width: 650, margin: "0 auto" }}
							size="large"
							bordered
							dataSource={formList}
							renderItem={item => <List.Item>{item}</List.Item>}
						/>
					)
				};
			});
			setTabs([...baseTabs, ...tabs]);
		}
	});
	return (
		<>
			<Card>
				<Tabs defaultActiveKey="dataManagement" items={tabs} tabPosition="left"></Tabs>
			</Card>
		</>
	);
}
