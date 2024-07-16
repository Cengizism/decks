import { ContributorType, DeckType, NodesTreeType } from '@/interfaces/types';

export interface InterfaceSettings {
  theme: 'light' | 'dark';
}

export interface StateType {
  nodes: NodesTreeType;
  decks: DeckType[];
  contributors: ContributorType[];
  interface: InterfaceSettings;
  settings: any;
}
