import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { CommonResponse } from '@/models/common-model';

export interface Logger {
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

export interface Options {
  defaultHeaders?: Record<string, any>;
  logger?: Logger;
}

class HttpClient {
  private readonly httpClient: AxiosInstance;
  private readonly options: Options;

  constructor(httpClient: AxiosInstance, options?: Options) {
    this.httpClient = httpClient;
    this.options = options || {};

    this.request = this.request.bind(this);
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
    this.patch = this.patch.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  async request<T>(url: `/${string}`, reqData?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.httpClient.post<T>(url, reqData, {
        ...config,
        headers: {
          ...this.options.defaultHeaders,
          ...config?.headers,
        },
      });
      return data;
    } catch (err: any) {
      this.options.logger?.error(url, reqData, JSON.stringify(err));
      throw err;
    }
  }

  async post<T>(
    url: `/${string}`,
    reqData?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<CommonResponse<T>> {
    try {
      const { data } = await this.httpClient.post<CommonResponse<T>>(url, reqData, {
        ...config,
        headers: {
          ...this.options.defaultHeaders,
          ...config?.headers,
        },
      });
      return data;
    } catch (err: any) {
      this.options.logger?.error(url, reqData, JSON.stringify(err));
      throw err;
    }
  }

  async put<T>(
    url: `/${string}`,
    reqData?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<CommonResponse<T>> {
    try {
      const { data } = await this.httpClient.put<CommonResponse<T>>(url, reqData, {
        ...config,
        headers: {
          ...this.options.defaultHeaders,
          ...config?.headers,
        },
      });
      return data;
    } catch (err: any) {
      this.options.logger?.error(url, reqData, JSON.stringify(err));
      throw err;
    }
  }

  async patch<T>(
    url: `/${string}`,
    reqData?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<CommonResponse<T>> {
    try {
      const { data } = await this.httpClient.patch<CommonResponse<T>>(url, reqData, {
        ...config,
        headers: {
          ...this.options.defaultHeaders,
          ...config?.headers,
        },
      });
      return data;
    } catch (err: any) {
      this.options.logger?.error(url, reqData, JSON.stringify(err));
      throw err;
    }
  }

  async get<T>(url: `/${string}`, config?: AxiosRequestConfig<any>): Promise<CommonResponse<T>> {
    try {
      const { data } = await this.httpClient.get<CommonResponse<T>>(url, {
        ...config,
        headers: {
          ...this.options.defaultHeaders,
          ...config?.headers,
        },
      });
      return data;
    } catch (err: any) {
      this.options.logger?.error(url, JSON.stringify(err));
      throw err;
    }
  }

  async delete<T>(url: `/${string}`, config?: AxiosRequestConfig<any>): Promise<CommonResponse<T>> {
    try {
      const { data } = await this.httpClient.delete<CommonResponse<T>>(url, {
        ...config,
        headers: {
          ...this.options.defaultHeaders,
          ...config?.headers,
        },
      });
      return data;
    } catch (err: any) {
      this.options.logger?.error(url, JSON.stringify(err));
      throw err;
    }
  }
}

export default HttpClient;
