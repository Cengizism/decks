'use client';

import React, { createContext, useContext } from 'react';

interface StateContextProps {
  state: any;
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
  state: any;
  children: React.ReactNode;
}> = ({ state, children }) => {
  return (
    <StateContext.Provider value={{ state }}>{children}</StateContext.Provider>
  );
};
