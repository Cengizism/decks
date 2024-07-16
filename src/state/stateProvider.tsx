'use client';

import { StateType } from '@/interfaces/';
import React, { createContext, useContext } from 'react';

import { ActionType } from './reducer';
import usePersistedState from './usePersistedState';

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

export const StateProvider: React.FC<{
  initialState: StateType;
  children: React.ReactNode;
}> = ({ initialState, children }) => {
  const [state, dispatch] = usePersistedState(initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
