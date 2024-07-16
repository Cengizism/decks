import { ContributorType, DeckType, NodesTreeType } from '@/interfaces/types';

export interface StateType {
  nodes: NodesTreeType;
  decks: DeckType[];
  contributors: ContributorType[];
  theme: 'light' | 'dark';
}
