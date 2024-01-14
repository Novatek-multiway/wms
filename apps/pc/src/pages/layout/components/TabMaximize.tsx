import { useTranslation } from "react-i18next";
import type { AppDispatch, RootState } from "@/store";
import { Tooltip } from "antd";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMaximize } from "@/store/tabs";

function TabMaximize() {
	const { t } = useTranslation();
	const dispatch: AppDispatch = useDispatch();
	// 是否窗口最大化
	const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize);

	/** 点击最大化/最小化 */
	const onClick = () => {
		dispatch(toggleMaximize(!isMaximize));
	};

	return (
		<Tooltip title={isMaximize ? t("最小化") : t("最大化")} placement="bottom">
			<Icon
				className={`
          flex
          items-center
          justify-center
          text-lg
          cursor-pointer
        `}
				icon={isMaximize ? "ant-design:compress-outlined" : "ant-design:expand-outlined"}
				onClick={onClick}
			/>
		</Tooltip>
	);
}

export default TabMaximize;
