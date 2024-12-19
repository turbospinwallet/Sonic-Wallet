import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import { translationManager } from '@/i18n/translation-manager';

export type ReturnTypeOfTranslation = ReturnType<typeof translationManager['ofLanguage']>;

const TranslationContext = createContext<{
  transInstance: ReturnTypeOfTranslation;
  changeLanguage: (lang: Parameters<typeof translationManager.ofLanguage>[0]) => void;
}>({
  transInstance: translationManager.ofLanguage('en'),
  changeLanguage: () => {}, // noop
});

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [transInstance, setTransInstance] = useState(() => translationManager.ofLanguage('en'));

  const value = useMemo(() => {
    return {
      transInstance,
      changeLanguage: (lang: Parameters<typeof translationManager.ofLanguage>[0]) => {
        setTransInstance(translationManager.ofLanguage(lang));
      },
    };
  }, [transInstance]);

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export const useTranslationProvider = () => useContext(TranslationContext);
