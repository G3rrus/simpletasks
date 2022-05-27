import React from 'react';
import { useTranslation } from 'react-i18next';

/* eslint-disable import/no-default-export */
export default function NotFoundPage() {
  const { t, i18n } = useTranslation();
  return (
    <main style={{ padding: '1rem' }}>
      <p>{t('main.nothingFound')}</p>
    </main>
  );
}
