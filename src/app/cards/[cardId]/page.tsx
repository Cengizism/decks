import BreadCrumps from '@/components/breadCrumps/breadCrumps';
import Cover from '@/components/cover/cover';
import Main from '@/components/main/main';
import PageHeader from '@/components/pageHeader/pageHeader';
import { TITLE } from '@/constants';
import { getCardById, indexCardIds, traceDeckByCardId } from '@/libraries/api';
import markdownToHtml from '@/libraries/utilities/markdownToHtml';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import styles from './page.module.css';

interface Params {
  params: {
    cardId: string;
  };
}

export default async function CardPage({ params }: Params) {
  const { cardId } = params;
  const card = getCardById(cardId);

  if (!card) {
    return notFound();
  }

  const deck = traceDeckByCardId(cardId);
  const content = await markdownToHtml(card.content || '');

  return (
    <Main>
      <BreadCrumps node={card} />

      <PageHeader
        title={card.title}
        subTitle={card.excerpt}
        date={card.lastModified}
      />

      <Cover
        src={deck ? `/api/content/decks/${deck.id}/images/${card.coverImage}` : ''}
        title={card.title}
        variant='full'
      />

      <article>
        <div
          className={styles.markdown}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </Main>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const { cardId } = params;
  const card = getCardById(cardId);

  if (!card) {
    return notFound();
  }

  const title = `${card.title} | ${TITLE}`;

  return {
    title,
    openGraph: {
      title,
      images: card.coverImage ? [card.coverImage] : [],
    },
  };
}

export function generateStaticParams() {
  const cardIds = indexCardIds();

  return cardIds.map(({ cardId }) => ({
    cardId,
  }));
}
