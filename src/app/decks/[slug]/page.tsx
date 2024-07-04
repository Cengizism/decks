import CardsListing from '@/components/cards/cards-listing';
import DeckHeader from '@/components/decks/deck-header';
import { getAllDecks, getCardsByDeck, getDeckBySlug } from '@/lib/api';
import { HOME_OG_IMAGE_URL, TITLE } from '@/lib/constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Params = {
  params: {
    slug: string;
  };
};

export default async function DeckPage({ params }: Params) {
  const deck = await getDeckBySlug(params.slug);

  if (!deck) {
    return notFound();
  }

  const cards = await getCardsByDeck(deck.folder);

  return (
    <>
      <DeckHeader deck={deck} />

      {cards.length > 0 ? (
        <CardsListing cards={cards} />
      ) : (
        <div>No cards found for this deck.</div>
      )}
    </>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const deck = await getDeckBySlug(params.slug);

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

export async function generateStaticParams() {
  const decks = await getAllDecks();

  return decks.map((deck) => ({
    slug: deck.folder,
  }));
}
