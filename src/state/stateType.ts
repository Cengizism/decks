import { ContributorType, DeckType, NodesTreeType } from '@/interfaces/types';

export interface InterfaceSettings {
  theme: 'light' | 'dark' | 'system';
}

export interface DataState {
  nodes: NodesTreeType;
  decks: DeckType[];
  contributors: ContributorType[];
}

export interface StateType {
  data: DataState;
  interface: InterfaceSettings;
  settings: any;
}
