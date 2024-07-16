'use client';

import {
  FluentProvider as FluentProviderBase,
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

interface FluentProviderProps {
  children: React.ReactNode;
}

export function FluentProvider({ children }: FluentProviderProps) {
  const [renderer] = useState(() => createDOMRenderer());
  const didRenderRef = useRef(false);

  const { state } = useStateContext();
  const theme =
    state.interface.theme === 'dark' ? teamsDarkTheme : teamsLightTheme;

  const [hasMounted, setHasMounted] = useState(false);

  // TODO: Investigate if it is really needed
  // TODO: Also investigate if the fluent-app-next directive library is needed
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
        <FluentProviderBase theme={theme}>{children}</FluentProviderBase>
      </SSRProvider>
    </RendererProvider>
  );
}
