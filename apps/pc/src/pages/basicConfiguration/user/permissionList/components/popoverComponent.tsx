import { useTranslation } from "react-i18next";
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef, useContext } from "react";
import { Drawer, Form, Checkbox, Col, Row, Tag } from "antd";
import { AuthorizationStoreContext } from "../store";
import { observer } from "mobx-react-lite";

function PopoverComponent({ nodeData }, ref) {
	const { t } = useTranslation();
	const [btnValue, setBtnValue] = useState([]);
	const [visible, setVisible] = useState(false);
	const [currentBtnList, setCurrentBtnList] = useState({});
	const [form] = Form.useForm();
	const store = useContext(AuthorizationStoreContext);
	const { authorizationStore } = store;
	const getValue = checkedValue => {
		//TODO
		console.log("ess", checkedValue);
		console.log("currentBtnList>>", currentBtnList);
		console.log("authorizationStore", authorizationStore);
	};

	const renderBtnList = () => {
		return (
			<Checkbox.Group defaultValue={authorizationStore.functionListInfo} onChange={getValue}>
				{currentBtnList.functionList?.length > 0 &&
					currentBtnList.functionList.map(v => {
						return (
							<Row key={v.id}>
								<Col span={24}>
									<Checkbox value={v.id}>{v.functionName}</Checkbox>
								</Col>
							</Row>
						);
					})}
			</Checkbox.Group>
		);
	};
	useImperativeHandle(ref, () => ({
		showPopoverModal: showModal
	}));

	const showModal = (selectedKeys, e) => {
		// e.nativeEvent.stopPropagation();
		// setCurrentBtnList(e.node);
		// setVisible(true);
	};
	const handleCancel = () => {
		setVisible(false);
	};
	return (
		<span>
			<Drawer title={t("按钮权限分配")} open={visible} onClose={handleCancel} width={300}>
				<div>
					<Tag color="#13c2c2" style={{ marginBottom: 10 }}>
						{currentBtnList.menuTitle}
					</Tag>
				</div>
				{renderBtnList()}
			</Drawer>
		</span>
	);
}

export default observer(forwardRef(PopoverComponent));
