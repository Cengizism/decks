import DeckCards from '@/components/deckCards';
import Main from '@/components/main/main';
import PageHeader from '@/components/pageHeader/pageHeader';
import { getActiveSession } from '@/libraries/api';
import { getBookmarksByUserId, getUserById } from '@/libraries/api';
import Image from 'next/image';
import React from 'react';

const Profile: React.FC = () => {
  const activeSessionUserId = getActiveSession();
  const user = getUserById(activeSessionUserId as number);

  const cards = getBookmarksByUserId(activeSessionUserId as number);

  return (
    <Main>
      <Image
        src={user?.avatar as string}
        alt={user?.name as string}
        width={200}
        height={200}
      />
      <PageHeader
        title={user?.name as string}
        subTitle={user?.id === 1 ? 'Learner' : 'Contributor'}
      />

      {cards.length > 0 ? (
        <DeckCards cards={cards} />
      ) : (
        <div>No bookmarks found for this user.</div>
      )}
    </Main>
  );
};

export default Profile;
