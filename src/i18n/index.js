import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next',
    },
  },
  ua: {
    translation: {
      'Welcome to React': 'Bienvenue à React et react-i18next',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    lng: 'ua',
    fallbackLng: 'ua',
    resources: {
      en: {
        translation: require('./locales/en').default,
      },
      ua: {
        translation: require('./locales/ua').default,
      },
    },
  });

export default i18n;
