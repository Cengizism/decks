import { DESCRIPTION, HOME_OG_IMAGE_URL, TITLE } from '@/constants';
import { FluentProvider } from '@/state/fluentProvider';
import initialState from '@/state/initialState';
import { StateProvider } from '@/state/stateProvider';
import type { Metadata } from 'next';
import * as React from 'react';

import './globals.css';

export const metadata: Metadata = {
  // TODO: "metadataBase" needs to be updated with env variables
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
  metadataBase: process.env.SITE_URL
    ? new URL(process.env.SITE_URL)
    : undefined,
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          rel='icon'
          href='/icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
        <link
          rel='apple-touch-icon'
          href='/apple-icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
        {/* <meta name='msapplication-TileColor' content='#000000' />
        <meta
          name='msapplication-config'
          content='/browserconfig.xml'
        />
        <link rel='alternate' type='application/rss+xml' href='/feed.xml' /> */}
      </head>

      <body>
        <StateProvider initialState={initialState}>
          <FluentProvider>{children}</FluentProvider>
        </StateProvider>
      </body>
    </html>
  );
};

export default RootLayout;
