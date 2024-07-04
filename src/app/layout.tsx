import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { GeistSans } from 'geist/font/sans';
import React from 'react';

import '@mantine/notifications/styles.css';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

import { theme } from '@/theme';

import RQProviders from '../components/utils/Providers/index';

type Props = {
  children: React.ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  return (
    <html lang="id">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </head>
      <body className={GeistSans.className}>
        <RQProviders>
          <MantineProvider theme={theme}>
            <Notifications position="top-center" />
            <NavigationProgress aria-label="Progress Load Bar" />
            {children}
          </MantineProvider>
        </RQProviders>
      </body>
    </html>
  );
}
