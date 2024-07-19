import { getAllUsers } from '@/libraries/api';
import * as React from 'react';

import styles from './page.module.css';
import UsersList from './usersList';

const Login: React.FC = () => {
  const users = getAllUsers();

  return (
    <main className={styles.main}>
      <UsersList users={users} />
    </main>
  );
};

export default Login;
