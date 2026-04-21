import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { msTranslations } from './translations';

const savedLanguage = localStorage.getItem('app-language');
const initialLanguage = savedLanguage === 'ms' || savedLanguage === 'en' ? savedLanguage : 'en';

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {},
    },
    ms: {
      translation: msTranslations,
    },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
  keySeparator: false,
  nsSeparator: false,
  parseMissingKeyHandler: (key) => key,
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('app-language', lng);
});

export default i18n;
