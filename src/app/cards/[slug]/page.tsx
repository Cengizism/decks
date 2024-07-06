import BreadCrumps from '@/components/bread-crumps';
import CoverImage from '@/components/cover-image';
import Header from '@/components/header';
import { getAllCards, getCardBySlug } from '@/lib/api';
import { TITLE } from '@/lib/constants';
import markdownToHtml from '@/lib/markdown-to-html';
import markdownStyles from '@/styles/markdown-styles.module.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Params = {
  params: {
    slug: string;
  };
};

export default async function CardPage({ params }: Params) {
  const card = await getCardBySlug(params.slug);

  if (!card) {
    return notFound();
  }

  const content = await markdownToHtml(card.content || '');

  return (
    <>
      <BreadCrumps card={card} />
      <Header
        title={card.title}
        subTitle={card.excerpt}
        date={card.lastModified}
      />

      <CoverImage
        src={`/api/content/${card.deck.folder}/images/${card.coverImage}`}
        title={card.title}
      />

      <article>
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const card = await getCardBySlug(params.slug);

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

export async function generateStaticParams() {
  const cards = await getAllCards();

  return cards.map((card) => ({
    slug: card.slug,
  }));
}
