import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from 'i18n/locales/en/translations.json';
import deTranslation from 'i18n/locales/de/translations.json';
import idTranslation from 'i18n/locales/id/translations.json';
import jaTranslation from 'i18n/locales/ja/translations.json';
import ruTranslation from 'i18n/locales/ru/translations.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translations: enTranslation,
  },
  de: {
    translations: deTranslation,
  },
  id: {
    translations: idTranslation,
  },
  ja: {
    translations: jaTranslation,
  },
  ru: {
    translations: ruTranslation,
  },
};

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // BACKEND
    // loadPath: './src/i18n/locales/{{lng}}/{{ns}}.json',
    // addPath: './src/i18n/locales/add/{{lng}}/{{ns}}',
    // crossDomain: true,
    fallbackLng: 'en',

    debug: true,
    resources,
    // lng: 'en', // <= Remove this to use LanguageDetector or ti will overwrite
    ns: ['translations'], // have a common namespace used around the full app
    defaultNS: 'translations',
    saveMissing: true, // send not translated keys to endpoint
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      wait: true,
    },
  });

export default i18n;
