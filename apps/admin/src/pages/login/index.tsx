import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, useAppDispatch } from 'hooks';
import { REFRESH_TOKEN, Settings, setStorage } from 'utils';
import styles from './index.module.scss';
import Logo from '@/assets/logo.png';
import md5 from 'md5';
import { API, getApiAuthGetRefreshToken } from "apis"
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation()
  const { signIn } = useContext(AuthContext);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async ({ userName, password }: any) => {
    try {
      setLoading(true);
      const data = {
        userName,
        password: md5(password),
      };
      await signIn(dispatch, data);
      getApiAuthGetRefreshToken().then((res: API.StringR) => {
        setStorage(REFRESH_TOKEN, res.resultData)
      })
      navigator('/');
    } finally {
      setLoading(false);
    }
  };
  const [form] = Form.useForm();
  return (
    <div id={styles.loginContainer}>
      <div className={styles.loginTop}>
        <img src={Logo} />
        <h2>{t('title')}</h2>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        size="large"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input allowClear prefix={<UserOutlined />} placeholder={t('username')!} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} type="password" placeholder={t('password')!} />
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
