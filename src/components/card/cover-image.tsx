'use client';

import { makeStyles } from '@fluentui/react-components';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CoverImageProps {
  title: string;
  src: string;
  slug?: string;
}

const IMAGE_HEIGHT = 400;

const useStyles = makeStyles({
  cover: {
    position: 'relative',
    width: '100%',
    height: `${IMAGE_HEIGHT}px !important`,
    minHeight: `${IMAGE_HEIGHT}px`,

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
});

const CoverImage: React.FC<CoverImageProps> = ({ title, src, slug }) => {
  const styles = useStyles();

  const image = (
    <div className={styles.cover}>
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

export default CoverImage;
