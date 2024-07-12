import Card from '@/components/card/card';
import PageHeader from '@/components/page-header/page-header';
import BreadCrumps from '@/components/navigation/bread-crumps';
import { HOME_OG_IMAGE_URL, TITLE } from '@/constants';
import { getCardsOfDeck, getDeckById, indexDeckIds } from '@/libraries/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import styles from '../../page.module.css';

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
      <BreadCrumps node={deck} />

      <PageHeader title={deck.title} subTitle={deck.description} />

      {cards.length > 0 ? (
        <div className={styles.grid}>
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
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
