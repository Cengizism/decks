import type { StateType } from '@/interfaces/';
import {
  getAllContributors,
  getAllDecks,
  getNodeTree,
  getUser,
} from '@/libraries/api';

const initialState: StateType = {
  data: {
    nodes: getNodeTree(),
    decks: getAllDecks(),
    contributors: getAllContributors(),
  },
  user: getUser(),
  interface: {
    theme: 'light', // TODO: When no preference is set, get it from the system
    selectedNavigationItem: '',
    isNavigationDrawerOpen: false,
  },
  settings: {},
};

export default initialState;
