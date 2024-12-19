import { useTranslationProvider } from '@/i18n/TranslationProvider';

function useChangeLanguage() {
  const { changeLanguage, transInstance } = useTranslationProvider();

  return {
    currentLanguage: transInstance.getLanguage,
    changeLanguage,
  };
}

export default useChangeLanguage;
