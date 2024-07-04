import DeckHeader from '@/components/decks/deck-header';
import { getAllDecks } from '@/lib/api';
import Link from 'next/link';

export default async function DecksPage() {
  const decks = await getAllDecks();

  return (
    <>
      <DeckHeader />
      
      {decks.length > 0 && (
        <div>
          {decks.map((deck, index) => (
            <div key={index}>
              <Link href={`/decks/${deck.folder}`} passHref>
                <h4>{deck.title}</h4>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
