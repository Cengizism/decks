'use client';

import { Link as FluentLink, mergeClasses } from '@fluentui/react-components';
import Link from 'next/link';
import React from 'react';

import styles from './link.module.css';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const LinkComponent: React.FC<LinkProps> = ({
  href,
  className: styleOverrides,
  children,
}) => {
  return (
    <Link
      href={href}
      className={mergeClasses(styles.link, styleOverrides)}
      passHref
    >
      <FluentLink className={styles.link}>{children}</FluentLink>
    </Link>
  );
};

export { LinkComponent };
