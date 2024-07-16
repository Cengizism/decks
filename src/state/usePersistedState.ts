import { StateType } from '@/interfaces/';
import { useEffect, useReducer } from 'react';

import { reducer } from './reducer';

const LOCAL_STORAGE_KEY = 'decks-state';

const loadState = (initialState: StateType) => {
  if (typeof window !== 'undefined') {
    const persistedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      return {
        ...initialState,
        ...parsedState,
        data: {
          ...initialState.data, // Always use initial data from the server
        },
      };
    }
  }
  return initialState;
};

const saveState = (state: StateType) => {
  const { interface: interfaceSettings, settings } = state;
  const stateToPersist = { interface: interfaceSettings, settings };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToPersist));
};

const usePersistedState = (initialState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initialState, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return [state, dispatch] as const;
};

export default usePersistedState;
