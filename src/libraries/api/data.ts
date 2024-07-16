import { ContributorType, DeckType, PathType } from '@/interfaces/';

import contributorsData from '../../../content/contributors.json';
import decksData from '../../../content/decks.json';
import pathsData from '../../../content/paths.json';
import { initializeCardFilesCache } from './cardFilesCache';

export const contributors: ContributorType[] = contributorsData;
export const decks: DeckType[] = decksData;
export const paths: PathType[] = pathsData;

initializeCardFilesCache(decks);
