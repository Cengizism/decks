'use client';

import { login } from '@/actions/userActions';
import { UserType } from '@/interfaces';
import {
  Divider,
  Persona,
  Title2,
  makeStyles,
} from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-list-preview';
import React from 'react';

const useStyles = makeStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
});

interface UsersListProps {
  users: UserType[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const styles = useStyles();

  const selectUser = async (userId: number) => {
    await login(userId);
  };

  return (
    <section className={styles.section}>
      <Title2>Choose a user</Title2>
      <Divider />

      <List navigationMode='items' className={styles.list}>
        {users.map((user) => (
          <ListItem
            key={user.id}
            aria-label={`${user.name}, available`}
            onClick={() => selectUser(user.id)}
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
    </section>
  );
};

export default UsersList;
