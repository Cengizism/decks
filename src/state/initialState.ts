import { getAllContributors, getAllDecks, getNodeTree } from '@/libraries/api';

import { StateType } from '@/interfaces/';

const initialState: StateType = {
  data: {
    nodes: getNodeTree(),
    decks: getAllDecks(),
    contributors: getAllContributors(),
  },
  interface: {
    theme: 'light', // TODO: When no preference is set, get it from the system
  },
  settings: {},
};

export default initialState;
