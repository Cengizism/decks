// import BreadCrumps from '@/components/bread-crumps';
import Decks from '@/components/decks';
import Header from '@/components/header';
import {
  // getAllPaths,
  getDecksByPathId,
  getPathById,
  indexPathIds,
} from '@/lib/api';
import { HOME_OG_IMAGE_URL, TITLE } from '@/lib/constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import path from 'path';

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
    <>
      {/* <BreadCrumps path={path} /> */}
      <Header title={path.title} subTitle={path.description} />

      {decks.length > 0 ? (
        <Decks decks={decks} />
      ) : (
        <div>No decks found for this path.</div>
      )}
    </>
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
