import axios from 'axios';
import NProgress from '../config/nprogress';
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import ErrorHandle from './errorHandler';
import { ResponseCode, ResponseKey } from './enum';
import { checkStatus } from '../helper/checkStatus';
import { LOCALE, TOKEN, getStorage, setStorage, REFRESH_TOKEN } from 'utils';

const Language_Map = {
	'en_US': 'en-US',
	'zh_CN': 'zh-CN',
	'ja_JP': 'ja-JP',
	'ko_KR': 'ko-KR',
}

type RequestFn = {
  resolve: () => void;
  reject: () => void;
};

const defaultResult: Result<undefined> = {
  message: '',
  data: undefined,
  result: undefined,
  code: 200,
  resultData: undefined,
  statusCode: 200,
}

class NRequest {
  protected instance: AxiosInstance | null = null;
  protected showProgress = true;
  public isRetrying: boolean = false;
	public retryRequests: RequestFn[] = [];

  constructor(config: AxiosRequestConfig, prefix = '', showProgress = true) {
    const { baseURL, ...rest } = config;

    // 创建实例
    this.instance = axios.create({
      baseURL: prefix ? baseURL + prefix : baseURL,
      timeout: 1000 * 20,
      withCredentials: true,
      ...rest,
    });
    this.showProgress = showProgress;

    this.requestInterceptor();
    this.responseInterceptor();
  }

  private requestInterceptor() {
    this.instance!.interceptors.request.use(
      (config: AxiosRequestConfig = {}) => {
        this.showProgress && NProgress.start();
        // 设置请求头
        if (config.headers) {
          const lang = getStorage(LOCALE);
          config.headers.Authorization = 'Bearer ' + getStorage(TOKEN);
          config.headers['Accept-Language'] = Language_Map?.[lang] ?? "zh-CN";
        }

        return config;
      },
      (error: AxiosError) => {
        message?.error?.(error.message);
        return Promise.reject(error);
      }
    );
  }

  private responseInterceptor() {
    this.instance!.interceptors.response.use(
      (response: AxiosResponse): Promise<Result> => {
        this.showProgress && NProgress.done();
        return new Promise((resolve, reject) => {
          const { status, data, headers, config } = response;
          // 说明axios 都失败了
          if (status !== 200) reject(data);

          if (data[ResponseKey.CODE] === 402) {
            const callback = () => resolve(this.request(config))
						this.retryRequests.push({
              resolve: callback,
              reject: () => resolve(defaultResult)
            });
            if (!this.isRetrying) {
							this.isRetrying = true
							this.refreshToken().then(refreshRes => {
								const newToken = refreshRes.resultData;
								setStorage(TOKEN, newToken);
								this.retryRequests.forEach(retryRequest => retryRequest.resolve());
								//	获取新的refreshToken
								this.getRefreshToken();
								this.resetRetry();
							})
						}
          } else {
            // refreshToken过期时为401，释放为403时收集的resolve callback
            if (data[ResponseKey.CODE] === 401) {
              this.retryRequests.forEach(retryRequest => retryRequest.reject());
              this.resetRetry();
            }
            // 不是成功状态码
            // 新增文件类型不判断状态码
            if (
              data[ResponseKey.CODE] !== ResponseCode.SUCCESS &&
              headers['content-type'] !== 'application/octet-stream'
            ) {
              message?.error?.(data[ResponseKey.MESSAGE]);
              
              ErrorHandle[data[ResponseKey.CODE] as keyof typeof ErrorHandle]();
              reject(data);
            }
  
            // 成功返回
            resolve(data);
          }
        });
      },
      (error) => {
        const { response } = error;
        NProgress.done();
        if (response) checkStatus(response.status);
        return Promise.reject(error);
      }
    );
  }

  public request<T>(config: AxiosRequestConfig<T>): Promise<Result<T>> {
    return this.instance!.request(config);
  }

  public get = <T>(
    url: string,
    params: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<Result<T>> => {
    const option: AxiosRequestConfig = {
      url,
      method: 'GET',
      params,
      ...config,
    };
    return this.request(option);
  };

  public post = <T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<Result<T>> => {
    const option: AxiosRequestConfig = {
      url,
      method: 'POST',
      data,
      ...config,
    };
    return this.request(option);
  };

  public put = <T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<Result<T>> => {
    const option: AxiosRequestConfig = {
      url,
      method: 'put',
      data,
      ...config,
    };
    return this.request(option);
  };
  public del = <T>(
    url: string,
    params: any = {},
    config: AxiosRequestConfig = {},
    data: any = {}
  ): Promise<Result<T>> => {
    const option: AxiosRequestConfig = {
      url,
      method: 'delete',
      params,
      data,
      ...config,
    };
    return this.request(option);
  };

  //	使用refreshToken刷新Token
	public refreshToken() {
		return this.get<string>('/api/Auth/RefreshToken', { refreshToken: getStorage(REFRESH_TOKEN) || "" })
	};

	public getRefreshToken() {
		this.get<string>('/api/Auth/GetRefreshToken').then(res => {
			setStorage(REFRESH_TOKEN, res.resultData)
		})
	}

  public resetRetry() {
    this.retryRequests = [];
    this.isRetrying = false;
  }
}

const { get, post, del, put } = new NRequest({
  // baseURL: import.meta.env.VITE_APP_API
  baseURL: '',
});

export { get, post, del, put };

export default NRequest;
