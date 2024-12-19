import { API_BASE_URL, TEST_USER_TELEGRAM } from '@/common/constants/const';
import { createCatchResponseInterceptor } from '@/internals/network/interceptors/catch-response-interceptor';
import { createHttpClient } from '@/internals/network/network';
import { createMetadataInterceptor } from '@/internals/network/interceptors/metadata-interceptor';

export const authHttpClient = createHttpClient(
  {
    baseURL: API_BASE_URL,
    timeout: 15000,
  },
  {
    interceptors: [
      createMetadataInterceptor({
        getToken: () => {
          if (
            TEST_USER_TELEGRAM ||
            (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp)
          ) {
            const tgData = TEST_USER_TELEGRAM
              ? JSON.parse(TEST_USER_TELEGRAM)
              : window.Telegram.WebApp?.initDataUnsafe;
            if (tgData) {
              return Buffer.from(JSON.stringify(tgData), 'utf-8').toString('base64');
            }
          }
          return null;
        },
      }),
      createCatchResponseInterceptor(),
    ],
  }
);
