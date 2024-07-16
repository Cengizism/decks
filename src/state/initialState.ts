import { StateType } from '@/interfaces/';
import { getAllContributors, getAllDecks, getNodeTree } from '@/libraries/api';

const initialState: StateType = {
  data: {
    nodes: getNodeTree(),
    decks: getAllDecks(),
    contributors: getAllContributors(),
  },
  interface: {
    theme: 'light', // TODO: When no preference is set, get it from the system
    selectedNavigationItem: '',
    isNavigationDrawerOpen: false,
  },
  settings: {},
};

export default initialState;
