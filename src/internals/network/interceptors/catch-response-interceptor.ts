import type { AxiosInstance } from 'axios';

export interface Logger {
  log(...args: any[]): void;
  error(...args: any[]): void;
  warn(...args: any[]): void;
}

export function createCatchResponseInterceptor(logger?: Logger) {
  return function catchResponseInterceptor(ins: AxiosInstance) {
    ins.interceptors.response.use(
      (response) => {
        const { data } = response;
        logger?.log('[Hasura response]', data);

        if (response.status < 300 && response.status >= 200) {
          return response;
        }

        // throw new NetworkError({
        //   code: extensions.code,
        //   message,
        //   errors: mainError,
        // });

        return response;
      },
      (error) => {
        throw error;
      }
    );
  };
}
