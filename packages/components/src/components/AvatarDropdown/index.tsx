// import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
// import { history, useModel } from '@umijs/max';
import { Spin } from 'antd';
// import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import { useNavigate } from 'react-router-dom';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
  signOut?: any;
  label: string;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children, signOut, label }) => {
  const navigate = useNavigate();
  /**
   * 退出登录，并且将当前的 url 保存
   */
  //   const loginOut = async () => {
  //     await outLogin();
  //     const { search, pathname } = window.location;
  //     const urlParams = new URL(window.location.href).searchParams;
  //     /** 此方法会跳转到 redirect 参数所在的位置 */

  //     // Note: There may be security issues, please note

  //       history.replace({
  //         pathname: '/login',
  //       });
  //     }
  //   };
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  //   const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(async (event: any) => {
    const { key } = event;
    if (key === 'logout') {
      await signOut?.();
      navigate('/login');
      // flushSync(() => {
      //   setInitialState((s) => ({ ...s, currentUser: undefined }));
      // });
      // loginOut();
      return;
    }
    //   history.push(`/account/${key}`);
  }, []);

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  //   if (!initialState) {
  //     return loading;
  //   }

  //   const { currentUser } = initialState;

  //   if (!currentUser || !currentUser.name) {
  //     return loading;
  //   }

  const menuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label,
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
      trigger={['click']}
    >
      {children}
    </HeaderDropdown>
  );
};
