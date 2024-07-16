import { getAllContributors, getAllDecks, getNodeTree } from '@/libraries/api';

import { StateType } from './state-type';

const initialState: StateType = {
  nodes: getNodeTree(),
  decks: getAllDecks(),
  contributors: getAllContributors(),
  theme: 'dark',
};

export default initialState;
