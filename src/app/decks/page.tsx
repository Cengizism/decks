import BreadCrumps from '@/components/bread-crumps';
import Decks from '@/components/decks';
import Header from '@/components/header';
import { getAllDecks } from '@/lib/api';

export default async function DecksPage() {
  const decks = await getAllDecks();

  return (
    <>
      <BreadCrumps />
      <Header
        title='Decks'
        subTitle='Here you can find all the decks available in the platform.'
      />

      {decks.length > 0 && <Decks decks={decks} />}
    </>
  );
}
