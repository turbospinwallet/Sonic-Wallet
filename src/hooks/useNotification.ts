import { toast } from 'react-toastify';
import type { ReactNode } from 'react';
import { useCallback } from 'react';

function useNotification() {
  return useCallback(
    (
      message: string | ReactNode,
      type: 'success' | 'error' | 'info' | 'warning' = 'success',
      position:
        | 'top-right'
        | 'top-center'
        | 'top-left'
        | 'bottom-right'
        | 'bottom-center'
        | 'bottom-left' = 'top-center'
    ) => {
      toast(message, { type, position });
    },
    []
  );
}

export default useNotification;
