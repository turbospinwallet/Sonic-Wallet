import type { AxiosInstance } from 'axios';
import axios from 'axios';

import type { GetQueryClientParams, HttpClientOptions, Interceptor } from './types';
import HttpClient from '@/packages/HttpClient';

export function applyInterceptors(ins: AxiosInstance, interceptors: Interceptor[]) {
  interceptors.forEach((interceptor) => {
    interceptor(ins);
  });
}

export function createHttpClient(configs: GetQueryClientParams, options?: HttpClientOptions) {
  const ins = axios.create(configs);

  if (options?.interceptors) {
    applyInterceptors(ins, options.interceptors);
  }

  return new HttpClient(ins);
}
