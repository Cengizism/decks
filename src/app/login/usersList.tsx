'use client';

import { UserType } from '@/interfaces';
import { Persona } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-list-preview';
import * as React from 'react';

interface UsersListProps {
  users: UserType[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const selectUser = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      console.log('User selected:', user);
    } else {
      console.log('User not found');
    }
  };

  return (
    <List navigationMode='items'>
      {users.map((user) => (
        <ListItem
          key={user.id}
          aria-label={`${user.name}, available`}
          onAction={() => selectUser(user.id)}
          value={user.name}
        >
          <Persona
            name={user.name}
            secondaryText={user.id === 1 ? 'Learner' : 'Contributor'}
            avatar={{
              image: {
                src: user.avatar,
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default UsersList;
