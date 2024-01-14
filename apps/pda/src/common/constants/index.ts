import { t } from "i18next";
export const MIN_DATE = new Date();

export const CARRY_STATUS = [
  {
    value: 1,
    label: t("满托"),
  },
  {
    value: 2,
    label: t("半满"),
  },
  {
    value: 0,
    label: t("空托"),
  },
];

export const REQUIRE_RULES = [
  { required: true, message: t("必填"), validateTrigger: "onBlur" },
];
