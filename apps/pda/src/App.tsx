import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider } from 'react-vant';
import enUS from 'react-vant/es/locale/lang/en-US';
import zhCN from 'react-vant/es/locale/lang/zh-CN';
import jaJP from 'react-vant/es/locale/lang/ja-JP';
import { getStorage } from 'utils';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const koKR = {
  name: '명칭',
  tel: '전화',
  save: '저장',
  confirm: '확인',
  cancel: '취소',
  delete: '삭제',
  vanPicker: {
    select: '선택하기'
  },
  vanPagination: {
    prev: '上一页',
    next: '下一页'
  },
};

const m = {
	'en_US': enUS,
	'zh_CN': zhCN,
	'ja_JP': jaJP,
	'ko_KR': koKR,
}


const locale = getStorage('locale')

function App() {
  const { t } = useTranslation();
  useEffect(() => {
		document.title = t('WMS仓储管理系统')
	}, [])
  return <RouterProvider router={router}></RouterProvider>;
}

export default () => (
  <ConfigProvider locale={m?.[locale] ?? zhCN}>
    <App />
  </ConfigProvider>
)