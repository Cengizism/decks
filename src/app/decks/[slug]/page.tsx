import { getAllDecks, getCardsByDeck, getDeckBySlug } from '@/lib/api';
import { HOME_OG_IMAGE_URL, TITLE } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
      <h3>Cards of that deck</h3>
      <div>
        <Link href='/'>Home</Link>
        &nbsp;|&nbsp;
      </div>
      {cards.length > 0 ? (
        <div>
          {cards.map((card) => (
            <div key={card.slug}>
              <Link href={`/cards/${card.slug}`} passHref>
                <h4>{card.title}</h4>
                <Image
                  src={card.coverImage}
                  alt={card.title}
                  width={120}
                  height={60}
                />
              </Link>
            </div>
          ))}
        </div>
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
