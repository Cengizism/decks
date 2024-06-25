'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Card = {
  slug: string;
  title: string;
  coverImage: string;
};

const Deck = ({ deckName }: { deckName: string }) => {
  const [cardsOfDeck, setCardsOfDeck] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when the component mounts or params.slug changes
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/decks/${deckName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const cards = await response.json();
        setCardsOfDeck(cards);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deckName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h3>Cards of that deck</h3>
      <div>
        <Link href='/'>Home</Link>
        &nbsp;|&nbsp;
      </div>
      {cardsOfDeck.length > 0 ? (
        <div>
          {cardsOfDeck.map((card) => (
            <div key={card.slug}>
              <Link href={`/card/${card.slug}`} passHref>
                <h4>{card.title}</h4>
                <Image
                  src={card.coverImage}
                  alt={card.title}
                  width={120}
                  height={60}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>No cards found for this deck.</div>
      )}
    </>
  );
};

export default Deck;
