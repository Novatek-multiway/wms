import { DesktopOutlined, TableOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import { MenuItem } from 'components';

const MenuData: {
  user: MenuItem[];
  admin: MenuItem[];
} = {
  user: [
    {
      label: 'User',
      key: 'user',
      path: '/user',
      icon: <DesktopOutlined />,
      filepath: 'pages/user/index.tsx',
    },
  ],
  admin: [
    // {
    //   label: t('收货'),
    //   key: 'receivingBusiness',
    //   path: '/receivingBusiness',
    //   icon: <span className="iconfont icon-shipmentBusiness"></span>,
    //   filepath: 'pages/ReceivingBusiness/index.tsx',
    // },
    {
      label: t('任务'),
      key: 'task',
      path: '/task',
      icon: <span className="iconfont icon-task"></span>,
      filepath: 'pages/Task/index.tsx',
    },
    // {
    //   label: t('申请入库'),
    //   key: 'InStockApply',
    //   path: '/inStockApply',
    //   icon: <span className="iconfont icon-shipmentBusiness"></span>,
    //   filepath: 'pages/InStockApply/index.tsx',
    //   isAdmin: true,
    // },
    // {
    //   label: t('批量解绑'),
    //   key: 'UnbindingBatch',
    //   path: '/unbindingBatch',
    //   filepath: 'pages/UnbindingBatch/index.tsx',
    // },
    // {
    //   label: t('库存'),
    //   key: 'repertory',
    //   path: '/repertory',
    //   icon: <span className="iconfont icon-repertory"></span>,
    //   filepath: 'pages/Repertory/index.tsx',
    // },
  ],
};
export { MenuData };
