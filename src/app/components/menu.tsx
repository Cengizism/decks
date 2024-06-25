import Link from 'next/link';
import React from 'react';

export default function Menu() {
  return (
    <div>
      <Link href='/'>Decks</Link>
      &nbsp;|&nbsp;
      <Link href='/about'>About</Link>
    </div>
  );
}
