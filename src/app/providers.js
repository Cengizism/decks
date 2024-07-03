'use client';

import {
  FluentProvider,
  RendererProvider,
  SSRProvider,
  createDOMRenderer,
  teamsLightTheme,
} from '@fluentui/react-components';
import { useEffect, useState } from 'react';

const renderer = createDOMRenderer();

export function Providers({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <RendererProvider renderer={renderer || createDOMRenderer()}>
      <SSRProvider>
        <FluentProvider theme={teamsLightTheme}>{children}</FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}
