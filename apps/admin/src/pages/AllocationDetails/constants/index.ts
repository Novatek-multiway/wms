import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
export const DEFAULT_MATIERAL_DES = [
  {
    key: ['materialCode', 'materialName'],
    label: t('物料编号'),
  },
  {
    key: 'materialSize',
    label: t('物料规格'),
  },
  {
    key: 'materialTypeName',
    label: t('物料类型'),
  },
  {
    key: 'quantity',
    label: t('应发数量'),
  },
  {
    key: ['outboundAreaCode', 'outboundAreaName'],
    label: t('出库区域'),
  },
];

/** 发货状态为以下状态时展示分配明细操作按钮
 * 2 待分配
 * 5 出库中
 */
export const SHOW_DETAIL_STATUS = [2, 5];
