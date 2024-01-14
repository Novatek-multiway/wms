import React from 'react';
import {
  DashboardOutlined,
  GithubFilled,
  InfoCircleFilled,
  LoginOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { ProBreadcrumb, ProConfigProvider, ProSettings } from '@ant-design/pro-components';
import ProLayout from '@ant-design/pro-layout';
import { Avatar, Input, Switch, Tooltip } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOCALE, Settings, getStorage } from 'utils';

import {
  AuthContext,
  useAppDispatch,
  useAppSelector,
  KeepAlive,
  useLocationListen,
  shallowEqual,
} from 'hooks';
import { getOperatingSystem, treeRouter } from 'utils';
import Logo from '../../assets/logo.png';

import { Settings as layoutSetting } from '../../config/defaultSetting';
import { AvatarDropdown } from '../AvatarDropdown';
import LocaleDropdown from '../LocaleDropdown';

const locale = getStorage(LOCALE) as keyof typeof i18nResources;

const i18nResources = {
  zh_CN: {
    home: '首页',
    logOut: '退出登录',
    title: '仓库管理系统',
  },
  en_US: {
    home: 'Home',
    logOut: 'Log Out',
    title: 'WMS',
  },
  ja_JP: {
    home: 'ホームページ',
    logOut: 'ログアウト',
    title: '倉庫管理システム',
  },
  ko_KR: {
    home: '홈',
    logOut: '로그아웃',
    title: '창고 관리 시스템',
  },
};

function t(key: 'home' | 'logOut' | 'title') {
  return (i18nResources?.[locale] ?? i18nResources.ko_KR)[key];
}

export const baseRouterList = [
  {
    label: t('home'),
    key: 'dashboard',
    path: 'dashboard',
    icon: <DashboardOutlined />,
    filepath: 'pages/dashboard/index.tsx',
  },
];
export default () => {
  const { menu, currentUser, locale } = useAppSelector(
    (state) => ({
      menu: state.user.menu,
      currentUser: state.user.currentUser,
      locale: state.user.locale,
    }),
    shallowEqual
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const dispatch = useAppDispatch();
  const { signOut } = useContext(AuthContext);
  const [dark, setDark] = useState(
    getOperatingSystem() === 'mac' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useLocationListen((listener) => {
    setPathname(listener.pathname);
  });

  const settings: ProSettings | undefined = {
    title: t('title'),
    ...layoutSetting,
    logo: Logo,
  };

  useEffect(() => {
    // 监听 Macos系统 颜色切换
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (event.matches) {
        setDark(true);
      } else {
        setDark(false);
      }
    });
  }, []);

  return (
    <ProConfigProvider dark={dark}>
      <div
        id="admin-pro-layout"
        style={{
          height: '100vh',
        }}
      >
        <ProLayout
          siderWidth={245}
          logo={Logo}
          className="h-full"
          ErrorBoundary={false}
          route={{
            path: '/',
            routes: treeRouter([...baseRouterList, ...menu]),
          }}
          {...settings}
          location={{
            pathname,
          }}
          waterMarkProps={{
            content: Settings.title,
          }}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            return [
              props.layout !== 'side' && document.body.clientWidth > 1400 ? <></> : undefined,
              <LocaleDropdown />,
              <AvatarDropdown signOut={() => signOut(dispatch)} label={t('logOut')}>
                <div style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
                  <Avatar
                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                    size="small"
                  />
                  <span style={{ color: '#000', marginLeft: 4 }}>{currentUser?.realName}</span>
                </div>
              </AvatarDropdown>,
            ];
          }}
          menuFooterRender={(props) => {
            if (props?.collapsed || props?.isMobile) return undefined;
            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <QuestionCircleFilled key="QuestionCircleFilled" />
                <InfoCircleFilled key="InfoCircleFilled" />
              </div>
            );
          }}
          menuItemRender={(item, dom) => (
            <Link
              to={item?.path || '/'}
              onClick={() => {
                setPathname(item.path || '/');
              }}
            >
              {dom}
            </Link>
          )}
          onMenuHeaderClick={() => navigate('/')}
        >
          <ErrorBoundary>
            <KeepAlive include={[]} keys={[]} />
          </ErrorBoundary>
        </ProLayout>
      </div>
    </ProConfigProvider>
  );
};
