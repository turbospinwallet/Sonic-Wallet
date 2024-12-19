import get from 'lodash/get';
import type { DotNestedKeys } from '@/typings/support-types';

export type GetTranslation<ITranslation> = (translateValues: ITranslation) => ITranslation;

interface TranslationFile<ITranslation> {
  defineTranslation: GetTranslation<ITranslation>;
}

export function createTranslationRoot<
  ITranslation extends Record<any, any>
>(): TranslationFile<ITranslation> {
  const defineTranslation: GetTranslation<ITranslation> = (translateValues) => {
    return translateValues;
  };

  return {
    defineTranslation,
  };
}

export interface OfLanguage<ILanguage, T> {
  getLanguage: () => ILanguage;
  translate: <K extends DotNestedKeys<T>>(key: K, options?: TranslateOptions) => string;
}

interface TranslationManager<ILanguage extends string, T extends Record<any, any>> {
  ofLanguage: (language: ILanguage) => OfLanguage<ILanguage, T>;
}

export interface TranslateOptions {}

export function createTranslationManager<ILanguage extends string, T extends Record<any, any>>(
  obj: Record<ILanguage, T>,
  options: { defaultLanguage: string }
): TranslationManager<ILanguage, T> {
  const allTranslations = obj;

  return {
    ofLanguage(language: ILanguage) {
      const currentLanguage = language ?? options.defaultLanguage;
      return {
        getLanguage: () => currentLanguage,
        translate: <K extends DotNestedKeys<T>>(key: K, _opts?: TranslateOptions): string => {
          return get(allTranslations[currentLanguage ?? options.defaultLanguage], key);
        },
      };
    },
  };
}
