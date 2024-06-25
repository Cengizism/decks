'use client';

import Link from 'next/link';
import * as React from 'react';

import Menu from './components/menu';

export default function Main(props: { children: React.ReactNode }) {
  return (
    <main>
      <header>
        <Link href='/'>
          <h2>Alten Decks</h2>
        </Link>
      </header>
      <nav>
        <Menu />
      </nav>
      <div>{props.children}</div>
    </main>
  );
}
