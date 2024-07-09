import BreadCrumps from '@/components/bread-crumps';
import CoverImage from '@/components/cover-image';
import Header from '@/components/header';
import { getAllCards, getCardBySlug } from '@/lib/api';
import { TITLE } from '@/lib/constants';
import markdownToHtml from '@/lib/markdown-to-html';
import markdownStyles from '@/styles/markdown-styles.module.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Params {
  params: {
    slug: string;
  };
}

export default async function CardPage({ params }: Params) {
  const { slug } = params;
  const card = await getCardBySlug(slug);

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
        src={
          card.deck?.folder
            ? `/api/content/${card.deck.folder}/images/${card.coverImage}`
            : ''
        }
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

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = params;
  const card = await getCardBySlug(slug);

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
