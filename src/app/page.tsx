import { getAllDecks } from '@/lib/api';
import Link from 'next/link';
import * as React from 'react';

export default async function Index() {
  const allDecks = await getAllDecks();

  return (
    <>
      <h3>Decks</h3>

      {allDecks.length > 0 && (
        <div>
          {allDecks.map((deck, index) => {
            return (
              <div key={index}>
                <Link href={`/deck/${deck.folder}`} passHref>
                  <h4>{deck.title}</h4>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
