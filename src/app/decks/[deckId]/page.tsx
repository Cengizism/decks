// import BreadCrumps from '@/components/bread-crumps';
import Cards from '@/components/cards';
import Header from '@/components/header';
import { getCardsOfDeck, getDeckById, indexDeckIds } from '@/lib/api';
import { HOME_OG_IMAGE_URL, TITLE } from '@/lib/constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

  const cards = getCardsOfDeck(deck);

  return (
    <>
      {/* <BreadCrumps deck={deck} /> */}
      <Header title={deck.title} subTitle={deck.description} />

      {cards.length > 0 ? (
        <Cards cards={cards} />
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
