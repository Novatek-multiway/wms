import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh_CN from "./locales/zh_CN";
import en_US from "./locales/en_US";
import ja_JP from "./locales/ja_JP";
import ko_KR from "./locales/ko_KR";

const resources = {
	en: {
		translation: en_US
	},
	zh: {
		translation: zh_CN
	},
	jp: {
		translation: ja_JP
	},
	kr: {
		translation: ko_KR
	}
};

export const Language_Map = {
	en_US: "en",
	zh_CN: "zh",
	ja_JP: "jp",
	ko_KR: "kr"
};

const lang = localStorage.getItem("locale") as keyof typeof Language_Map;
i18n.use(initReactI18next).init({
	resources,
	lng: Language_Map?.[lang] ?? "kr", // 缓存没有时默认韩文
	interpolation: {
		escapeValue: false
	}
});
export default i18n;
