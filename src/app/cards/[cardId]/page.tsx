import BreadCrumps from '@/components/bread-crumps';
import CoverImage from '@/components/cover-image';
import Header from '@/components/header';
import { CompleteNavigationTree } from '@/interfaces/types';
import {
  findDeckByCardId,
  getCardById,
  getCompleteNavigationTree,
  indexCardIds,
} from '@/lib/api';
import { TITLE } from '@/lib/constants';
import markdownToHtml from '@/lib/markdown-to-html';
import markdownStyles from '@/styles/markdown-styles.module.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

  const tree: CompleteNavigationTree = getCompleteNavigationTree();

  return (
    <>
      <BreadCrumps tree={tree} nodeId={cardId} nodeType='card' />

      <Header
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
