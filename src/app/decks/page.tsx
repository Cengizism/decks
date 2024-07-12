import BreadCrumps from '@/components/bread-crumps';
import Deck from '@/components/deck';
import Header from '@/components/header';
import { DeckType } from '@/interfaces/types';
import { getAllDecks } from '@/lib/api';

import styles from '../../styles/page.module.css';

const DecksPage: React.FC = () => {
  const decks: DeckType[] = getAllDecks();

  return (
    <>
      <BreadCrumps />

      <Header
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
