import { Dropdown, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setLocale } from 'store';
import { useNavigate } from 'react-router-dom';

const LocaleDropdown: React.FC = () => {
  const locale = useAppSelector((state) => state.user.locale);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 语言切换
  const handleSelect: MenuProps['onClick'] = ({ key }) => {
    if (locale !== key) {
      dispatch(setLocale(key));
      navigate('/');
      window.location.reload();
    }
  };

  const languageMenu: MenuProps = {
    items: [
      { label: '🇨🇳 简体中文', key: 'zh_CN' },
      { label: '🇬🇧 English', key: 'en_US' },
      // { label: "🇯🇵 にほんご", key: "ja_JP" },
      { label: '🇰🇷 한글', key: 'ko_KR' },
    ],
    onClick: handleSelect,
    selectedKeys: [locale],
  };

  return (
    <Dropdown menu={languageMenu} placement="bottomRight">
      <GlobalOutlined className="text-base" />
    </Dropdown>
  );
};

export default LocaleDropdown;
