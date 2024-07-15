'use client';

import React from 'react';

import { StateProvider } from './state-provider';

interface ClientStateProviderProps {
  initialState: any;
  children: React.ReactNode;
}

const ClientStateProvider: React.FC<ClientStateProviderProps> = ({
  initialState,
  children,
}) => {
  return <StateProvider initialState={initialState}>{children}</StateProvider>;
};

export default ClientStateProvider;
