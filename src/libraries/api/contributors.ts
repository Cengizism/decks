import { ContributorType } from '@/interfaces/types';

import { contributors } from './data';

export function getAllContributors(): ContributorType[] {
  return contributors;
}

export function getContributorById(id: string): ContributorType | null {
  return contributors.find((contributor) => contributor.id === id) || null;
}
