import { ContributorType, DeckType, NodesTreeType, UserType } from './index';

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
  user: UserType | null;
  interface: InterfaceSettings;
  settings: any;
}
