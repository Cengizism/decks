import Main from '@/components/main/main';
import { DESCRIPTION, HOME_OG_IMAGE_URL, TITLE } from '@/constants';
import { ContributorType, DeckType, NodesTreeType } from '@/interfaces/types';
import { getAllContributors, getAllDecks, getNodeTree } from '@/libraries/api';
import { FluentProviders } from '@/providers/fluent-providers';
import { StateProvider } from '@/providers/state-provider';
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
  const nodes: NodesTreeType = getNodeTree();
  const decks: DeckType[] = getAllDecks();
  const contributors: ContributorType[] = getAllContributors();

  const state = {
    nodes,
    decks,
    contributors,
  };

  return (
    <html lang='en'>
      <head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link
          rel='mask-icon'
          href='/favicon/safari-pinned-tab.svg'
          color='#000000'
        />
        <link rel='shortcut icon' href='/favicon/favicon.ico' />
        <meta name='msapplication-TileColor' content='#000000' />
        <meta
          name='msapplication-config'
          content='/favicon/browserconfig.xml'
        />
        <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
      </head>

      <body>
        <FluentProviders>
          <StateProvider state={state}>
            <Main>{children}</Main>
          </StateProvider>
        </FluentProviders>
      </body>
    </html>
  );
};

export default RootLayout;
