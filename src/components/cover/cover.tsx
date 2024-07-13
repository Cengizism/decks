'use client';

import { makeStyles, mergeClasses } from '@fluentui/react-components';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from './cover.module.css';

interface CoverProps {
  title: string;
  src: string;
  slug?: string;
}

const IMAGE_HEIGHT = 400;

const useInlineStyles = makeStyles({
  cover: {
    height: `${IMAGE_HEIGHT}px !important`,
    minHeight: `${IMAGE_HEIGHT}px`,
  },
});

const Cover: React.FC<CoverProps> = ({ title, src, slug }) => {
  const inlineStyles = useInlineStyles();

  const image = (
    <div className={mergeClasses(styles.cover, inlineStyles.cover)}>
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        fill
        sizes='100%'
        quality={80}
        priority
      />
    </div>
  );

  return slug ? <Link href={`/cards/${slug}`}>{image}</Link> : image;
};

export default Cover;
