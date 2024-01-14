import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { Button, Divider, Select, Space, Spin } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { useRequest } from "ahooks";
import { tansformOptions } from "@/utils/transformSelect";
interface IProps {
	value: [];
	optionApi: any;
	shiftOptions: { value: string; label: string };
	pageSize: Number;
}
interface OData {
	resultData: {
		pageData: Array<{}>;
	};
}
const { Option } = Select;
const SelectSearch = (props: IProps) => {
	const { value, optionApi, shiftOptions, pageSize = 5 } = props;
	const [OptionData, setOptionData] = useState([]);
	const [Page, setPage] = useState(1);
	const [Total, setTotal] = useState(null);
	const { run: getOptions, loading } = useRequest(optionApi, {
		manual: true,
		onSuccess: (data: OData) => {
			const tData = tansformOptions(data?.resultData?.pageData, shiftOptions);
			setTotal(data.resultData?.totalCount);
			setOptionData([...OptionData, ...tData]);
		}
	});
	useEffect(() => {
		if (optionApi) {
			getOptions({
				pageSize: pageSize,
				pageIndex: Page
			});
		}
	}, [optionApi, Page]);

	// const onSearch = debounce(() => {}, 800);
	const renderOptions = () =>
		OptionData?.map(({ label, value }) => {
			return (
				<Option value={value} key={value} label={label}>
					{label}
				</Option>
			);
		});
	return (
		<>
			<Select
				// showSearch
				style={{ width: 200 }}
				// onSearch={onSearch}
				loading={loading}
				notFoundContent={loading ? <Spin size="small" /> : t("无")}
				placeholder={t("请选择")}
				defaultValue={value}
				filterOption={(input, option) => (option?.label ?? "")?.toLowerCase().includes(input.toLowerCase())}
				// {...props}
				value={props.value}
				onChange={props.onChange}
				dropdownRender={menu => (
					<>
						{menu}
						{OptionData.length === Total ? (
							""
						) : (
							<>
								<Divider style={{ margin: "8px 0" }} />
								<Space style={{ padding: "0 8px 4px" }}>
									<Button
										type="text"
										block
										icon={<RedoOutlined />}
										onClick={() => {
											setPage(Page + 1);
										}}
									>
										{t("更多")}
									</Button>
								</Space>
							</>
						)}
					</>
				)}
			>
				{renderOptions()}
			</Select>
		</>
	);
};
export default SelectSearch;
