import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { NavigationProgress } from '@mantine/nprogress';
import { GeistSans } from 'geist/font/sans';
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

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={GeistSans.className}>
        <ReactQueryProviders>
          <MantineProvider theme={theme}>
            <NavigationProgress />
            {children}
          </MantineProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
