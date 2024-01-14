import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
export interface IlocationStatusItem {
  status: string;
  color: string;
}

export const locationStatusMap: Record<string, IlocationStatusItem> = {
  1: {
    status: t('报警'),
    color: '#DC143C',
  },
  2: {
    status: t('取空异常'),
    color: '#00BFFF',
  },
  3: {
    status: t('占位异常'),
    color: '#DB7093',
  },
  4: {
    status: t('维修'),
    color: '#DA70D6',
  },
  5: {
    status: t('空库位入库锁定'),
    color: '#D8BFD8',
  },
  6: {
    status: t('满库位空托托盘出库锁定'),
    color: '#DDA0DD',
  },
  7: {
    status: t('满库位满托盘出库锁定'),
    color: '#EE82EE',
  },
  8: {
    status: t('满库位满托盘'),
    color: '#800080',
  },
  9: {
    status: t('满库位空托托盘'),
    color: '#FF00FF',
  },
  10: {
    status: t('空库位'),
    color: '#fff',
  },
};
