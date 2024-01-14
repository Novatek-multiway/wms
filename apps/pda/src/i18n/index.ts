import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getStorage } from 'utils';
import zh from './locales/zh/translation.json';
import en from './locales/en/translation.json';
import jp from './locales/jp/translation.json';
import kr from './locales/kr/translation.json';

const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  },
  jp: {
    translation: jp
  },
  kr: {
    translation: kr
  }
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
  lng: Language_Map?.[lang] ?? 'zh', // 缓存没有时默认中文
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
