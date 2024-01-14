/* eslint-disable */
import { MenuData } from '@/common/mock';
import '@/multiway';
import '@/multiway/config';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import jaJP from 'antd/lib/locale/ja_JP';
import koKR from 'antd/lib/locale/ko_KR';
import {
  AuthContext,
  signIn,
  signOut,
  useAppDispatch,
  useAppSelector,
  useLocationListen,
} from 'hooks';
import { cloneDeep } from 'lodash';
import { setLanguage } from 'multiway';
import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { setMenu, setScannerMap } from 'store';
import './App.scss';
import { defaultRoutes, filepathToElement } from './routes';
import { useTranslation } from 'react-i18next';

const m = {
  en_US: enUS,
  zh_CN: zhCN,
  ja_JP: jaJP,
  ko_KR: koKR,
};
function App() {
  const dispatch = useAppDispatch();
  const {
    user: { token, menu, locale, currentUser },
  } = useAppSelector((state) => state);
  console.log('🚀 ~ file: app.tsx ~ line 38 ~ App ~ locale', locale);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAdmin = currentUser?.isAdmin ?? false;

  const cloneDefaultRoutes = cloneDeep(defaultRoutes);
  cloneDefaultRoutes[0].children = [...filepathToElement(menu), ...cloneDefaultRoutes[0].children];

  useLocationListen((r) => {
    document.title = t('title');
  });

  const element = useRoutes(cloneDefaultRoutes);

  useEffect(() => {
    /**
     * @deprecated 权限菜单控制
     * 以下简单的示例展示管理员和普通用户的菜单渲染
     */
    if (token) {
      if (isAdmin) {
        dispatch(setMenu([...MenuData.admin]));
      } else {
        dispatch(setMenu([...MenuData.admin.filter((item) => !item.isAdmin)]));
      }
    } else {
      dispatch(setMenu([...MenuData.user]));
      navigate('/login');
    }
  }, [token, isAdmin]);

  useEffect(() => {
    if (locale) {
      setLanguage(locale);
    }
    // @ts-ignore
    window.getScanData = (res) => {
      dispatch(setScannerMap(res.data));
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
          fontSize: 18,
        },
      }}
      locale={m?.[locale] ?? zhCN}
    >
      <AuthContext.Provider value={{ signIn, signOut }}>{element}</AuthContext.Provider>
    </ConfigProvider>
  );
}

export default App;
