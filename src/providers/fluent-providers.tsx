'use client';

import {
  FluentProvider,
  RendererProvider,
  SSRProvider,
  createDOMRenderer,
  renderToStyleElements,
  teamsLightTheme,
} from '@fluentui/react-components';
import { useServerInsertedHTML } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

interface FluentProvidersProps {
  children: React.ReactNode;
}

export function FluentProviders({ children }: FluentProvidersProps) {
  const [renderer] = useState(() => createDOMRenderer());
  const didRenderRef = useRef(false);

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
        <FluentProvider theme={teamsLightTheme}>{children}</FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}
