import BreadCrumps from '@/components/bread-crumps';
import Decks from '@/components/decks';
import Header from '@/components/header';
import { CompleteNavigationTree, DeckType } from '@/interfaces/types';
import { getAllDecks, getCompleteNavigationTree } from '@/lib/api';

const DecksPage: React.FC = () => {
  const decks: DeckType[] = getAllDecks();

  const tree: CompleteNavigationTree = getCompleteNavigationTree();

  return (
    <>
      <BreadCrumps tree={tree} />
      <Header
        title='Decks'
        subTitle='Here you can find all the decks available in the platform.'
      />

      {decks.length > 0 ? (
        <Decks decks={decks} />
      ) : (
        <div>No decks available.</div>
      )}
    </>
  );
};

export default DecksPage;
