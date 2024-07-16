import BreadCrumps from '@/components/breadCrumps/breadCrumps';
import Cover from '@/components/cover/cover';
import PageHeader from '@/components/pageHeader/pageHeader';
import { TITLE } from '@/constants';
import { findDeckByCardId, getCardById, indexCardIds } from '@/libraries/api';
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

  const deck = findDeckByCardId(cardId);
  const content = await markdownToHtml(card.content || '');

  return (
    <>
      <BreadCrumps node={card} />

      <PageHeader
        title={card.title}
        subTitle={card.excerpt}
        date={card.lastModified}
      />

      <Cover
        src={deck ? `/api/content/${deck.id}/images/${card.coverImage}` : ''}
        title={card.title}
        variant='full'
      />

      <article>
        <div
          className={styles.markdown}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </>
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
