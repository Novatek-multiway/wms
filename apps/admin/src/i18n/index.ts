import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getStorage } from 'utils';
import zh from './locales/zh/translation';
import en from './locales/en/translation';
import jp from './locales/jp/translation';
import kr from './locales/kr/translation';

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
  jp: {
    translation: jp,
  },
  kr: {
    translation: kr,
  },
};

export const Language_Map = {
  en_US: 'en',
  zh_CN: 'zh',
  ja_JP: 'jp',
  ko_KR: 'kr',
};

const lang = getStorage('locale') as keyof typeof Language_Map;

i18n.use(initReactI18next).init({
  resources,
  lng: Language_Map?.[lang] ?? 'kr', // 缓存没有时默认韩文
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
