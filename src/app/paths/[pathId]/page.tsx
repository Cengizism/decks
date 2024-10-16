import BreadCrumps from '@/components/breadCrumps/breadCrumps';
import Deck from '@/components/card/deck';
import Main from '@/components/main/main';
import PageHeader from '@/components/pageHeader/pageHeader';
import { HOME_OG_IMAGE_URL, TITLE } from '@/constants';
import { getDecksByPathId, getPathById, indexPathIds } from '@/libraries/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import path from 'path';

import styles from '../../page.module.css';

interface Params {
  params: {
    pathId: string;
  };
}

export default function PathPage({ params }: Params) {
  const { pathId } = params;
  const path = getPathById(pathId);

  if (!path) {
    return notFound();
  }

  const decks = getDecksByPathId(path.id);

  return (
    <Main>
      <BreadCrumps node={path} />

      <PageHeader title={path.title} subTitle={path.description} />

      {decks.length > 0 ? (
        <div className={styles.grid}>
          {decks.map((deck) => (
            <Deck key={deck.id} deck={deck} />
          ))}
        </div>
      ) : (
        <div>No decks found for this path.</div>
      )}
    </Main>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const { pathId } = params;
  const path = getPathById(pathId);

  if (!path) {
    return notFound();
  }

  const title = `${path.title} | ${TITLE}`;

  return {
    title,
    openGraph: {
      title,
      images: [HOME_OG_IMAGE_URL],
    },
  };
}

export function generateStaticParams() {
  const pathIds = indexPathIds();

  return pathIds.map(({ pathId }) => ({
    pathId,
  }));
}
