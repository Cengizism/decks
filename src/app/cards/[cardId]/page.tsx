import CoverImage from '@/components/card/cover-image';
import BreadCrumps from '@/components/navigation/bread-crumps';
import PageHeader from '@/components/page-header/page-header';
import { TITLE } from '@/constants';
import { findDeckByCardId, getCardById, indexCardIds } from '@/libraries/api';
import markdownToHtml from '@/libraries/markdown-to-html';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import markdownStyles from './page.module.css';

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

      <CoverImage
        src={deck ? `/api/content/${deck.id}/images/${card.coverImage}` : ''}
        title={card.title}
      />

      <article>
        <div
          className={markdownStyles.markdown}
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
