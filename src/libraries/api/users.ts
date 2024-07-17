import type { UserType } from '@/interfaces';

import { getActiveSession, getUserById } from '../db';

export function getUser(): UserType | null {
  const userIdOfActiveSession = getActiveSession();
  if (userIdOfActiveSession === null) {
    return null;
  }
  return getUserById(userIdOfActiveSession);
}
