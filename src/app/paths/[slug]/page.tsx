import BreadCrumps from '@/components/bread-crumps';
import Decks from '@/components/decks';
import Header from '@/components/header';
import { getAllPaths, getDecksByPathId, getPathById } from '@/lib/api';
import { HOME_OG_IMAGE_URL, TITLE } from '@/lib/constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import path from 'path';

interface Params {
  params: {
    slug: string;
  };
}

export default async function PathPage({ params }: Params) {
  const { slug } = params;
  const path = await getPathById(slug);

  if (!path) {
    return notFound();
  }

  const decks = await getDecksByPathId(path.id);

  return (
    <>
      <BreadCrumps path={path} />
      <Header title={path.title} subTitle={path.description} />

      {decks.length > 0 ? (
        <Decks decks={decks} />
      ) : (
        <div>No decks found for this path.</div>
      )}
    </>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = params;
  const path = await getPathById(slug);

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

export async function generateStaticParams() {
  const paths = await getAllPaths();

  return paths.map((path) => ({
    slug: path.id,
  }));
}
