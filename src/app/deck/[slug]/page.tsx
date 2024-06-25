// 'use client';
// import { getAllDecks, getCardsByDeck, getDeckBySlug } from '@/lib/api';
import { HOME_OG_IMAGE_URL } from '@/lib/constants';
import { Metadata } from 'next';
import React from 'react';

import Deck from '../deck';

type Params = {
  params: {
    slug: string;
  };
};

export default async function DeckPage({ params }: Params) {
  // const deck = await getDeckBySlug(params.slug);

  // if (!deck) {
  //   return notFound();
  // }

  // const cards = await getCardsByDeck(deck.folder);

  return <Deck deckName={params.slug} />;
}

// export async function generateMetadata({ params }: Params): Promise<Metadata> {
//   const deck = await getDeckBySlug(params.slug);

//   if (!deck) {
//     return notFound();
//   }

//   const title = `${deck.title} | Alten Decks - Deck`;

//   return {
//     title,
//     openGraph: {
//       title,
//       images: [HOME_OG_IMAGE_URL],
//     },
//   };
// }

export async function generateStaticParams() {
  // Use environment variable to get the base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/decks`);
  const decks = await response.json();

  return decks.map((deck) => ({
    slug: deck.folder,
  }));
}
