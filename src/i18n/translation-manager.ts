import { createTranslationManager } from '@/packages/translation-manager';
import en from '@/i18n/sources/en';

export const translationManager = createTranslationManager(
  {
    en,
  },
  {
    defaultLanguage: 'en',
  }
);
