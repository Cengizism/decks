import { ContributorType, DeckType, NodesTreeType } from './index';

export interface InterfaceSettings {
  theme: 'light' | 'dark' | 'system';
  isNavigationDrawerOpen: boolean;
  selectedNavigationItem: string;
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
