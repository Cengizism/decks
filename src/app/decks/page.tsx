import BreadCrumps from '@/components/breadCrumps/breadCrumps';
import Deck from '@/components/card/deck';
import PageHeader from '@/components/pageHeader/pageHeader';
import { DeckType } from '@/interfaces/types';
import { getAllDecks } from '@/libraries/api';

import styles from '../page.module.css';

const DecksPage: React.FC = () => {
  const decks: DeckType[] = getAllDecks();

  return (
    <>
      <BreadCrumps />

      <PageHeader
        title='Decks'
        subTitle='Here you can find all the decks available in the platform.'
      />

      {decks.length > 0 ? (
        <div className={styles.grid}>
          {decks.map((deck) => (
            <Deck key={deck.id} deck={deck} />
          ))}
        </div>
      ) : (
        <div>No decks available.</div>
      )}
    </>
  );
};

export default DecksPage;
