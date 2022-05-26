import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as enJson from '../locale/en.json';
import * as deJson from '../locale/de.json';

const resources = {
  en: { translation: enJson },
  de: { translation: deJson },
};

// eslint-disable-next-line no-void
void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
});
