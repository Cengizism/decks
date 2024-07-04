import BreadCrumps from '@/components/bread-crumps';
import CoverImage from '@/components/cover-image';
import Header from '@/components/header';
import { getAllCards, getCardBySlug, getDeckTitle } from '@/lib/api';
import { TITLE } from '@/lib/constants';
import markdownToHtml from '@/lib/markdown-to-html';
import markdownStyles from '@/styles/markdown-styles.module.css';
import { Metadata } from 'next';
// import Link from 'next/link';
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
      {/* <div>
        <Link href='/'>Home</Link>
        &nbsp;|&nbsp;
        <Link href={`/decks/${card.deck.folder}`}>
          {getDeckTitle(card.deck.folder)}
        </Link>
        &nbsp;|&nbsp;
        <span>{card.title}</span>
      </div> */}

      <BreadCrumps />
      <Header title={card.title} subTitle={card.excerpt} />

      <CoverImage title={card.title} src={card.coverImage} />

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
      images: card.ogImage ? [card.ogImage.url] : [],
    },
  };
}

export async function generateStaticParams() {
  const cards = await getAllCards();

  return cards.map((card) => ({
    slug: card.slug,
  }));
}
