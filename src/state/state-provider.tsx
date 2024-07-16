'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { ActionType, reducer } from './reducer';
import { StateType } from './state-type';

const LOCAL_STORAGE_KEY = 'decks-state';

interface StateContextProps {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

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

export const StateProvider: React.FC<{
  initialState: StateType;
  children: React.ReactNode;
}> = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
