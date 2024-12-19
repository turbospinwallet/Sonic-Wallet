import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { Logger } from '@/internals/network/interceptors/catch-response-interceptor';

function appendAuthHeader(config: AxiosRequestConfig, token: string) {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = token;
}

export function createMetadataInterceptor({
  getToken,
  logger,
}: {
  getToken: () => string | null;
  logger?: Logger;
}) {
  return function metadataInterceptor(ins: AxiosInstance) {
    ins.interceptors.request.use(
      (config) => {
        const token = getToken();
        logger?.log('[Hasura request]', config.data);
        if (token) {
          appendAuthHeader(config, token);
        }

        if (!config.headers) {
          config.headers = {} as any;
        }

        return config;
      },
      (error) => {
        throw error;
      }
    );
  };
}
