import { useTranslation } from "react-i18next";
import React, { FC } from "react";
import { Result } from "antd";

const ErrorPage: FC = () => {
	const { t } = useTranslation();
	return (
	<Result style={{ height: "100vh" }} status="403" title="403" subTitle={t("抱歉，您无权访问此页面，如有疑问请联系管理员！")} />
)};

export default ErrorPage;
