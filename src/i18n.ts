import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import translationEN from './locales/en/translation.json';
import translationIT from './locales/it/translation.json';

const resources = {
   en: {
      translation: translationEN,
   },
   it: {
      translation: translationIT,
   },
};

i18n
   .use(HttpApi)
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      resources,
      fallbackLng: 'it',
      debug: true,
      interpolation: {
         escapeValue: false,
      },
      backend: {
         loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
   });

export default i18n;
