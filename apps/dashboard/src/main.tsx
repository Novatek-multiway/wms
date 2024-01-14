import './main.css';

import { createRoot } from 'react-dom/client';

import App from './App';
import { Provider, store } from 'store';
// import 'antd/dist/antd.css';

const container = document.getElementById('children-app');
const root = createRoot(container as HTMLDivElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
