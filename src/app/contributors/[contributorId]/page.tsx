import Deck from '@/components/card/deck';
import BreadCrumps from '@/components/navigation/bread-crumps';
import PageHeader from '@/components/page-header/page-header';
import { HOME_OG_IMAGE_URL, TITLE } from '@/constants';
import {
  getContributorById,
  getDecksByContributorId,
  indexContributorIds,
} from '@/libraries/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import styles from '../../page.module.css';

interface Params {
  params: {
    contributorId: string;
  };
}

export default function ContributorPage({ params }: Params) {
  const { contributorId } = params;
  const contributor = getContributorById(contributorId);

  if (!contributor) {
    return notFound();
  }

  const decks = getDecksByContributorId(contributor.id);

  return (
    <>
      <BreadCrumps node={contributor} />

      <PageHeader title={contributor.name} subTitle={contributor.bio} />

      {decks.length > 0 ? (
        <div className={styles.grid}>
          {decks.map((deck) => (
            <Deck key={deck.id} deck={deck} />
          ))}
        </div>
      ) : (
        <div>No decks found for this path.</div>
      )}
    </>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const { contributorId } = params;
  const contributor = getContributorById(contributorId);

  if (!contributor) {
    return notFound();
  }

  const title = `${contributor.name} | ${TITLE}`;

  return {
    title,
    openGraph: {
      title,
      images: [HOME_OG_IMAGE_URL],
    },
  };
}

export function generateStaticParams() {
  const contributorIds = indexContributorIds();

  return contributorIds.map(({ contributorId }) => ({
    contributorId,
  }));
}
