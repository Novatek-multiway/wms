import 'lib-flexible';
import './main.css';
import './i18n';
import { createRoot } from 'react-dom/client';
// import '@/assets/icons/iconfont.css';
import { Notify } from 'react-vant';
import App from './App';

window.message = {
  error: (msg: string) => Notify.show({ type: 'danger', message: msg }),
};

const container = document.getElementById('root');
const root = createRoot(container as HTMLDivElement);
root.render(<App />);
