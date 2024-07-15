'use client';

import Image from 'next/image';
import Link from '@/components/link/link';
import React from 'react';

import styles from './cover.module.css';

interface CoverProps {
  title: string;
  src: string;
  variant?: 'small' | 'large' | 'full';
  id?: string;
}

const Cover: React.FC<CoverProps> = ({ title, src, variant = 'large', id }) => {
  const coverClass = styles[variant];

  const image = (
    <div className={`${styles.cover} ${coverClass}`}>
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        quality={80}
        priority
      />
    </div>
  );

  return id ? <Link href={`/cards/${id}`}>{image}</Link> : image;
};

export default Cover;
