import Main from '@/components/main/main';
import PageHeader from '@/components/pageHeader/pageHeader';
import React from 'react';

const About: React.FC = () => {
  return (
    <Main>
      <PageHeader
        title='About'
        subTitle='A community based knowledge sharing platform'
      />

      {/* TODO: This content should come from a markdown as well */}
      <p>
        Alten Decks is designed to be a community-based knowledge sharing
        platform. Its content is driven by collaborators and consists of decks
        and cards. Decks are logical clusters of subject-related topics, which
        are represented by cards in this context. Each card provides crucial
        information on a topic and includes links to external resources for
        further reading. Users can read and bookmark cards, allowing them to
        return to them easily. In future iterations, the platform aims to
        facilitate conversations around card topics to share ideas and
        experiences.
      </p>
    </Main>
  );
};

export default About;
