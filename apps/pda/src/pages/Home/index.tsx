import { useTranslation } from 'react-i18next';
import routes from '@/router/routes';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, NavBar, Popup, List, Cell } from 'react-vant';
import { createFromIconfontCN } from '@react-vant/icons';
import styles from './index.module.scss';
import { setStorage } from 'utils';

const IconFont = createFromIconfontCN('/wms_pda/iconfont.js');

const menus = [
  { name: '🇨🇳 简体中文', value: 'zh_CN' },
  { name: '🇬🇧 English', value: 'en_US' },
  { name: '🇯🇵 にほんご', value: 'ja_JP' },
  { name: '🇰🇷 한글', value: 'ko_KR' },
];

type Item = typeof menus[number]

const Home: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const setLanguage = (item: Item) => {
    setVisible(false);
    setStorage('locale', item.value);
    window.location.reload();
  }
  
  return (
    <div className={styles.home}>
      <NavBar
        title={t('WMS仓储管理系统')}
        leftText=""
        leftArrow=""
        rightText={
          <IconFont name="icon-in" onClick={() => setVisible(true)} />
        }
      />
      <main className="h-[calc(100vh-46px)] p-2 overflow-auto">
        <Grid gutter={10} columnNum={2}>
          {routes.map((route) => (
            <Grid.Item
              key={route.path}
              text={route.label}
              icon={<IconFont name={route.icon} />}
              contentClassName={styles.gridTitle}
              onClick={() => navigate(route.path)}
            />
          ))}
        </Grid>
      </main>
      <Popup visible={visible} onClose={() => setVisible(false)}  position='top'>
        <List finished={true} onLoad={console.log}>
            {
              menus.map(m => (
                <Cell key={m.value} title={m.name} onClick={() => { setLanguage(m) }} />
              ))
            }
        </List>
      </Popup>
    </div>
  );
};

export default Home;
