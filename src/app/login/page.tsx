import { getAllUsers } from '@/libraries/db';
import * as React from 'react';

import UsersList from './usersList';

const Login: React.FC = () => {
  const users = getAllUsers();

  return (
    <>
      <UsersList users={users} />
    </>
  );
};

export default Login;
