import Header from '@/components/header';
import * as React from 'react';

export default function About() {
  return (
    <>
      <Header title='About' subTitle='A community based knowledge sharing platform' />

      <p>
        Alten Decks is meant to be a community based knowledge sharing platform. It’s
        content is driven by the collaborators. It consists of decks and cards.
        Decks are the logical cluster of subject related topics, which are cards
        in this context. A card comes with the crucial information to know and
        attract attention of/to the topic. Card has links to external resources
        for further reading as well. Users can read and bookmark cards so they
        can always come back to them. In the future iterations, idea is to make
        it open for conversations around the card topics for sharing ideas and
        experiences.
      </p>
    </>
  );
}
