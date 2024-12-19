import type { AxiosError, AxiosInstance } from 'axios';
import { NetworkError } from '@/internals/network/errors';
import type { Logger } from '@/internals/network/interceptors/catch-response-interceptor';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

// keep it async to be consistent with grpc
// async function appendAuthHeader(config: AxiosRequestConfig, token: string) {
//   if (!config.headers) {
//     config.headers = {};
//   }
//
//   config.headers.Authorization = `Bearer ${token}`;
// }

export function createRefreshTokenInterceptor({
  // refreshToken,
  logger,
  shouldRefreshToken,
}: {
  shouldRefreshToken: (error: AxiosError) => Promise<boolean>;
  // refreshToken: () => Promise<void>;
  // getToken: () => Promise<string | null>;
  logger?: Logger;
}) {
  return function refreshTokenInterceptor(ins: AxiosInstance) {
    ins.interceptors.response.use(
      (response) => {
        return response;
      },
      async (axiosError) => {
        if (!(await shouldRefreshToken(axiosError)) || axiosError.config._retry) {
          throw axiosError;
        }

        try {
          // await refreshToken();
          // await sessionManager.invalidateSession('redirect', '/login');
        } catch (e) {
          logger?.error('Failed to refresh session', e);
          throw new NetworkError({ message: (e as Error).message, error: e, code: 401 });
        }

        // const userAuth = await clientStorage.get('AUTH');
        // if (!userAuth) {
        //   return axiosError;
        // }
        //
        // await appendAuthHeader(axiosError.config, userAuth.token);

        axiosError.config._retry = true;
        return ins(axiosError.config);
      }
    );
  };
}
