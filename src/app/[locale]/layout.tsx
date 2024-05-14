import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { NavigationProgress } from '@mantine/nprogress';
import { GeistSans } from 'geist/font/sans';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import React from 'react';

import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';

import ReactQueryProviders from '@/components/utils/Providers';

import { theme } from '@/theme';

export const metadata = {
  title: 'Caelus - Opinionated Next.js Starter',
  description: 'I am using Mantine with Next.js!',
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages(locale);
  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </head>
      <body className={GeistSans.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProviders>
            <MantineProvider theme={theme}>
              <NavigationProgress aria-label="Progress Load Bar" />
              {children}
            </MantineProvider>
          </ReactQueryProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
