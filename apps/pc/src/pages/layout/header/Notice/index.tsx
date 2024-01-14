import { useTranslation } from "react-i18next";
import { FC, useState, useEffect } from "react";
import { Tabs, Dropdown, Badge, Spin, List, Avatar, Tag, Tooltip } from "antd";
import { LoadingOutlined, BellOutlined } from "@ant-design/icons";
import { GetAllNotic } from "@/http/modules/layout";
import { Notice, EventStatus } from "@/interface/layout/notice.interface";
import { useRequest } from "ahooks";
const { TabPane } = Tabs;

interface Inotification {
	message: string;
}
const interval = 1000 * 60 * 30;
const HeaderNoticeComponent: FC = () => {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<any>({
		alarmList: [],
		messageList: []
	});
	useRequest(GetAllNotic, {
		pollingInterval: interval,
		onSuccess: data => {
			const alarmList: Inotification[] = [];
			const messageList: Inotification[] = [];
			data.resultData.forEach((item: Record<string, any>) => {
				if (item.type === 1) {
					alarmList.push({ message: item.message });
				} else if (item.type === 2) {
					messageList.push({ message: item.message });
				}
			});
			setData((state: Record<string, any>) => ({ ...state, alarmList, messageList }));
		}
	});
	const tabs = (
		<div>
			<Tabs defaultActiveKey="1">
				<TabPane tab={t("告警({{length}})", { length: data.alarmList.length })} key="1">
					<List
						dataSource={data.alarmList}
						renderItem={item => (
							<List.Item>
								<List.Item.Meta avatar={<Avatar />} title={<a></a>} description={item.message} />
							</List.Item>
						)}
					/>
				</TabPane>

				<TabPane tab={t("消息({{length}})", { length: data.messageList.length })} key="2">
					<List
						dataSource={data.messageList}
						renderItem={item => (
							<List.Item>
								<List.Item.Meta avatar={<Avatar />} title={<a></a>} description={item.message} />
							</List.Item>
						)}
					/>
				</TabPane>
				{/* <TabPane tab={`待办(${noticeListFilter("event").length})`} key="3">
        	<List
        		dataSource={noticeListFilter("event")}
        		renderItem={item => (
        			<List.Item>
        				<List.Item.Meta
        					title={
        						<div className="notice-title">
        							<div className="notice-title-content">{item.title}</div>
        							<Tag color={EventStatus[item.status]}>{item.extra}</Tag>
        						</div>
        					}
        					description={item.description}
        				/>
        			</List.Item>
        		)}
        	/>
        </TabPane> */}
			</Tabs>
		</div>
	);

	return (
		<Dropdown
			overlay={tabs}
			overlayClassName="bg-2"
			placement="bottomRight"
			trigger={["click"]}
			open={visible}
			onOpenChange={v => setVisible(v)}
			overlayStyle={{
				width: 336,
				boxShadow: "0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)",
				padding: 8,
				borderRadius: 4
			}}
		>
			<Tooltip title={t("通知")}>
				<Badge className=" !text-white " count={data.alarmList.length + data.messageList.length} overflowCount={999}>
					<span className="notice" id="notice-center">
						<BellOutlined className="text-base" />
					</span>
				</Badge>
			</Tooltip>
		</Dropdown>
	);
};

export default HeaderNoticeComponent;
