import { useTranslation } from "react-i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { Button, Form, Input, NavBar, Toast } from "react-vant";
import Logo from "@/assets/logo.png";
import { ShieldO, UserO } from "@react-vant/icons";
import styles from "./index.module.scss";
import { AuthLogin, getApiAuthGetRefreshToken } from "apis";
import type { API } from "apis";
import md5 from "md5";
import { setStorage, TOKEN, REFRESH_TOKEN } from "utils";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<API.LoginModel>();
  const navigate = useNavigate();

  const onFinish = async (values: API.LoginModel) => {
    const body: API.LoginModel = {
      userName: values.userName,
      password: md5(values.password!),
    };
    const { resultData } = await AuthLogin(body);
    setStorage(TOKEN, resultData, 1000 * 60 * 60 * 24);
    getApiAuthGetRefreshToken().then((res: API.StringR) => {
      setStorage(REFRESH_TOKEN, res.resultData, 1000 * 60 * 60 * 24 * 80);
    });
    Toast.success(t("登录成功！"));
    navigate("/");
  };

  return (
    <div className={styles.login}>
      <NavBar title={t("登录")} leftText="" leftArrow="" />
      <main className="h-[calc(100vh-46px)] p-2 overflow-auto flex flex-col items-center">
        <img src={Logo} />
        <h1 className="mt-1">{t("WMS仓储管理系统")}</h1>
        <Form
          className="mt-1"
          form={form}
          onFinish={onFinish}
          footer={
            <div className="mt-2">
              <Button round nativeType="submit" type="primary" block>
                {t("提交")}
              </Button>
            </div>
          }
        >
          <Form.Item
            rules={[{ required: true, message: t("请输入用户名") }]}
            name="userName"
            label={t("用户名")}
            rightIcon={<UserO />}
          >
            <Input placeholder={t("请输入用户名")} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: t("请输入密码") }]}
            name="password"
            label={t("密码")}
            rightIcon={<ShieldO />}
          >
            <Input placeholder={t("请输入密码")} type="password" />
          </Form.Item>
        </Form>
      </main>
    </div>
  );
};

export default Login;
