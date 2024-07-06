import BreadCrumps from '@/components/bread-crumps';
import Cards from '@/components/cards';
import Header from '@/components/header';
import { getAllDecks, getCardsByDeck, getDeckBySlug } from '@/lib/api';
import { HOME_OG_IMAGE_URL, TITLE } from '@/lib/constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Params {
  params: {
    slug: string;
  };
}

export default async function DeckPage({ params }: Params) {
  const { slug } = params;
  const deck = await getDeckBySlug(slug);

  if (!deck) {
    return notFound();
  }

  const cards = await getCardsByDeck(deck.folder);

  return (
    <>
      <BreadCrumps deck={deck} />
      <Header title={deck.title} subTitle={deck.description} />

      {cards.length > 0 ? (
        <Cards cards={cards} />
      ) : (
        <div>No cards found for this deck.</div>
      )}
    </>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = params;
  const deck = await getDeckBySlug(slug);

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
