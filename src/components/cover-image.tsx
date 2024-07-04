'use client';

import { makeStyles } from '@fluentui/react-components';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const useStyles = makeStyles({
  cover: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: 'auto',
  },
  image: {
    width: '100%',
    minHeight: '400px',
    objectFit: 'cover',
  },
});

const CoverImage = ({ title, src, slug }: Props) => {
  const styles = useStyles();

  const image = (
    <div className={styles.cover}>
      <div className={styles.image}>
        <Image src={src} alt={`Cover Image for ${title}`} fill />
      </div>
    </div>
  );
  return (
    <div>
      {slug ? (
        <Link href={`/cards/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
