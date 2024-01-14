import './main.css';
import '@/assets/icons/iconfont.css';
import '@/i18n';
import { message } from 'antd';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider, store } from 'store';
import App from './app';
import 'dayjs/locale/zh-cn';

window.message = message;

const container = document.getElementById('root');
const root = createRoot(container as HTMLDivElement);
root.render(
  <Provider store={store}>
    <HashRouter basename={'/'}>
      <App />
    </HashRouter>
  </Provider>
);
