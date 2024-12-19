import { useCallback } from 'react';
import type { ReturnTypeOfTranslation } from '@/i18n/TranslationProvider';
import { useTranslationProvider } from '@/i18n/TranslationProvider';
import type { TranslateOptions } from '@/packages/translation-manager';

export default function useTranslate() {
  const { transInstance } = useTranslationProvider();

  return useCallback(
    (key: Parameters<ReturnTypeOfTranslation['translate']>[0], options?: TranslateOptions) => {
      return transInstance.translate(key, options);
    },
    [transInstance]
  );
}
