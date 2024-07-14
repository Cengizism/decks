import BreadCrumps from '@/components/bread-crumps/bread-crumps';
import PageHeader from '@/components/page-header/page-header';
import { HOME_OG_IMAGE_URL, TITLE } from '@/constants';
import { getCardsOfDeck, getDeckById, indexDeckIds } from '@/libraries/';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DeckCards from './deck-cards';

interface Params {
  params: {
    deckId: string;
  };
}

export default function DeckPage({ params }: Params) {
  const { deckId } = params;
  const deck = getDeckById(deckId);

  if (!deck) {
    return notFound();
  }

  // Customize this to give meta data back only
  const cards = getCardsOfDeck(deck);

  return (
    <>
      <BreadCrumps node={deck} />

      <PageHeader title={deck.title} subTitle={deck.description} />

      {cards.length > 0 ? (
        <DeckCards cards={cards} />
      ) : (
        <div>No cards found for this deck.</div>
      )}
    </>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const { deckId } = params;
  const deck = getDeckById(deckId);

  if (!deck) {
    return notFound();
  }

  const title = `${deck.title} | ${TITLE}`;

  return {
    title,
    openGraph: {
      title,
      images: [HOME_OG_IMAGE_URL],
    },
  };
}

export function generateStaticParams() {
  const deckIds = indexDeckIds();

  return deckIds.map(({ deckId }) => ({
    deckId,
  }));
}
