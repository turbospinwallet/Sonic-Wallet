import { createTranslationRoot } from '@/packages/translation-manager';

export interface ThisIsTranslateObject {
  staking: string;
  'connect wallet': string;
}

export const { defineTranslation } = createTranslationRoot<ThisIsTranslateObject>();
