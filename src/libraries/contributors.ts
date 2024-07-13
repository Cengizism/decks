import { ContributorType } from '@/interfaces/types';

import { contributorsData } from './data';

export function getAllContributors(): ContributorType[] {
  return contributorsData;
}

export function getContributorById(id: string): ContributorType | null {
  return contributorsData.find((contributor) => contributor.id === id) || null;
}
