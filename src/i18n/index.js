import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from 'i18n/locales/en/translations.json';
import deTranslation from 'i18n/locales/de/translations.json';
import idTranslation from 'i18n/locales/id/translations.json';

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
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    resources,
    lng: 'en',
    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
