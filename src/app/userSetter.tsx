'use client';

import { UserType } from '@/interfaces';
import { useStateContext } from '@/state/stateProvider';
import * as React from 'react';

interface UserSetterProps {
  user: UserType | null;
}

const UserSetter: React.FC<UserSetterProps> = ({ user }) => {
  const { dispatch } = useStateContext();

  React.useEffect(() => {
    if (user) {
      dispatch({ type: 'SET_USER', payload: user });
    }
  }, [user, dispatch]);

  return null;
};

export default UserSetter;
