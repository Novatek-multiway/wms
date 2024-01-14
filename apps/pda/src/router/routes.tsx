import { t } from "i18next";

const routes = [
  {
    label: t("组盘"),
    icon: "icon-bind",
    path: "/combine",
    filepath: "pages/Combine/index.tsx",
    key: "combine",
  },
  {
    label: t("拣选"),
    icon: "icon-pick",
    path: "/pick",
    filepath: "pages/Pick/index.tsx",
    key: "pick",
  },
  {
    label: t("入库申请"),
    icon: "icon-instock",
    path: "/InStockApply",
    filepath: "pages/InStockApply/index.tsx",
    key: "InStockApply",
  },
  {
    label: t("呼叫空托"),
    icon: "icon-call",
    path: "/EmptyTrayOut",
    filepath: "pages/EmptyTrayOut/index.tsx",
    key: "EmptyTrayOut",
  },
  {
    label: t("搬运"),
    icon: "icon-carry",
    path: "/CarryTask",
    filepath: "pages/CarryTask/index.tsx",
    key: "CarryTask",
  },
  {
    label: t("解盘"),
    icon: "icon-unbind",
    path: "/Unbinding",
    filepath: "pages/Unbinding/index.tsx",
    key: "Unbinding",
  },
  {
    label: t("盘点"),
    icon: "icon-inventory",
    path: "/Stocktake",
    filepath: "pages/Stocktake/index.tsx",
    key: "Stocktake",
  },
  {
    label: t("抽样盘点"),
    icon: "icon-sample",
    path: "/StocktakeBySampling",
    filepath: "pages/StocktakeBySampling/index.tsx",
    key: "StocktakeBySampling",
  },
];

export default routes;
