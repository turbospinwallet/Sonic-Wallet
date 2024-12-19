### How to provide translation for our app

#### 1. Update the `ThisIsTranslateObject` in src/i18n/translation-interfaces.ts

We need to update this file to keep the consistency of the translation object:

- All language translations will have same interface = `ThisIsTranslateObject`

#### 2. Update translation key lives in `src/i18n/sources`

You will need to update the key for all languages

#### 3. If you want to add new language, please follow the steps below:

- Clone the `en.ts` file and rename it to the language you want to add
- Import the file to `src/translation-manager.ts`

```ts
export const translationManager = createTranslationManager(
  {
    en,
    ja, // <== Add new language here
  },
  {
    defaultLanguage: 'en',
  }
);
```
