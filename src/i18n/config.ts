import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import enHeader from './locales/en/header.json';
import enFeatures from './locales/en/features.json';
import frCommon from './locales/fr/common.json';
import frHeader from './locales/fr/header.json';
import frFeatures from './locales/fr/features.json';

const resources = {
  en: {
    common: enCommon,
    header: enHeader,
    features: enFeatures,
  },
  fr: {
    common: frCommon,
    header: frHeader,
    features: frFeatures,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || navigator.language.split('-')[0] || 'en',
    fallbackLng: 'en',
    ns: ['common', 'header', 'features'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
