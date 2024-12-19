import type { AxiosRequestConfig } from 'axios';

export type Interceptor = (...args: any[]) => any;

export type GetQueryClientParams = Partial<AxiosRequestConfig>;

export interface HttpClientOptions {
  interceptors?: Interceptor[];
}
