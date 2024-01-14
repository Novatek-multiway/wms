import { ResponseCode } from './enum';
import { removeStorage, TOKEN } from 'utils';

const ErrorHandle = {
  [ResponseCode.Fail]() {
    console.log('失败');
  },
  [ResponseCode.BAD_REQUEST]() {
    console.log('坏请求');
  },
  [ResponseCode.No_AUTHENTICATION]() {
    removeStorage(TOKEN);
    window.location.hash = '/login';
    // console.log('没有token');
  },
};

export default ErrorHandle;
