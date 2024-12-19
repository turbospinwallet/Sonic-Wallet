import { useCallback } from 'react';
import useNotification from '@/hooks/useNotification';

export const formatError = (error: any) => {
  if (typeof error === 'string') {
    return error;
  }
  let msg = 'The system is maintenance. Please try again later';
  if (error?.message === 'Network Error') {
    msg = 'Your Wifi/4G/3G/GPRS connection is interrupted. Please check again!';
  } else if (error?.response?.data?.errors[0]?.msg) {
    msg = error?.response?.data?.errors[0]?.msg;
  } else if (typeof error?.response?.data?.message === 'string') {
    msg = error?.response?.data?.message;
  } else if (typeof error?.message === 'string') {
    msg = error.message;
  }
  return msg;
};
export const useHandleToastError = () => {
  const toast = useNotification();
  const showToastError = useCallback((error: any) => {
    toast(formatError(error), 'error');
  }, []);

  return {
    showToastError,
  };
};
