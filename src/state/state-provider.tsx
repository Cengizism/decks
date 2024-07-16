'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { reducer } from './reducer';

interface StateContextProps {
  state: any;
  dispatch: React.Dispatch<any>;
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
  initialState: any;
  children: React.ReactNode;
}> = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    if (typeof window !== 'undefined') {
      const persistedState = localStorage.getItem('appState');
      return persistedState ? JSON.parse(persistedState) : initial;
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
