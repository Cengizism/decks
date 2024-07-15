'use client';

import React, { createContext, useContext, useState } from 'react';

interface StateContextProps {
  state: any;
  setTheme: (theme: 'light' | 'dark') => void;
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
  const [state, setState] = useState(initialState);

  const setTheme = (theme: 'light' | 'dark') => {
    setState((prevState: any) => ({ ...prevState, theme }));
  };

  return (
    <StateContext.Provider value={{ state, setTheme }}>
      {children}
    </StateContext.Provider>
  );
};
