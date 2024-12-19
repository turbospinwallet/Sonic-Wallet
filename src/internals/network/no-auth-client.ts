import { API_BASE_URL } from '@/common/constants/const';
import { createHttpClient } from '@/internals/network/network';

export const noAuthHttpClient = createHttpClient({
  baseURL: API_BASE_URL,
  timeout: 15000,
});
