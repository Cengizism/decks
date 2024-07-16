'use client';

import { UserType } from '@/interfaces';
import { Avatar as FluentAvatar } from '@fluentui/react-components';
import * as React from 'react';

interface AvatarProps {
  user: UserType | null;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return user ? (
    <FluentAvatar name={user.name} image={{ src: user.avatar }} />
  ) : (
    <FluentAvatar />
  );
};

export default React.memo(Avatar);

