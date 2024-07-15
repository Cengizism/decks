'use client';

import {
  FluentProvider,
  RendererProvider,
  SSRProvider,
  createDOMRenderer,
  renderToStyleElements,
  teamsDarkTheme,
  teamsLightTheme,
} from '@fluentui/react-components';
import { useServerInsertedHTML } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { useStateContext } from './state-provider';

interface FluentProvidersProps {
  children: React.ReactNode;
}

export function FluentProviders({ children }: FluentProvidersProps) {
  const [renderer] = useState(() => createDOMRenderer());
  const didRenderRef = useRef(false);
  const { state } = useStateContext();

  const [theme, setTheme] = useState(state.theme);
  useEffect(() => {
    setTheme(state.theme === 'dark' ? teamsDarkTheme : teamsLightTheme);
  }, [state.theme]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useServerInsertedHTML(() => {
    if (didRenderRef.current) {
      return null;
    }
    didRenderRef.current = true;
    return <>{renderToStyleElements(renderer)}</>;
  });

  if (!hasMounted) {
    return null;
  }

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <FluentProvider theme={theme}>{children}</FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}
