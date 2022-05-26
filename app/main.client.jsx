import React, { Suspense } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Routes } from './ui/common/Routes';
import { Spinner } from '@chakra-ui/react';
import i18n from 'meteor/universe:i18n';

/**
 * This is the client-side entry point
 */
Meteor.startup(() => {
  document.documentElement.setAttribute('lang', 'en');
  const rootElement = document.getElementById('react-target');
  i18n.setOptions({  // <--- 6
    defaultLocale: 'de-DE'
  });
  // eslint-disable-next-line no-console
  i18n.setLocale('de-DE');
  console.log(i18n.getLocale());
  render(
    <Suspense fallback={<Spinner />}>
      <Routes />
    </Suspense>,
    rootElement
  );
});
