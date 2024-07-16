import { getAllContributors, getAllDecks, getNodeTree } from '@/libraries/api';
import { StateType } from './state-type';

const initialState: StateType = {
  nodes: getNodeTree(),
  decks: getAllDecks(),
  contributors: getAllContributors(),
  interface: {
    theme: 'dark',
  },
  settings: {},
};

export default initialState;
