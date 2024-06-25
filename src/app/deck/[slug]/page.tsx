import { getAllDecks, getCardsByDeck, getDeckBySlug } from '@/lib/api';
import { HOME_OG_IMAGE_URL } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Params = {
  params: {
    slug: string;
  };
};

export default async function Deck({ params }: Params) {
  const deck = await getDeckBySlug(params.slug);

  if (!deck) {
    return notFound();
  }

  const cards = await getCardsByDeck(deck.folder);

  return (
    <>
      <h3>{deck.title}</h3>

      <div>
        <Link href='/'>Home</Link>
        &nbsp;|&nbsp;
        <span>{deck.title}</span>
      </div>

      <p>{deck.description}</p>

      {cards.length > 0 && (
        <div>
          {cards.map((card, index) => {
            return (
              <div key={index}>
                <Link href={`/card/${card.slug}`} passHref>
                  <h4>{card.title}</h4>

                  <Image
                    src={card.coverImage}
                    alt={card.title}
                    width={120}
                    height={60}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const deck = await getDeckBySlug(params.slug);

  if (!deck) {
    return notFound();
  }

  const title = `${deck.title} | Alten Decks - Deck`;

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
