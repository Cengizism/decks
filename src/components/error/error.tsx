'use client';

import { Button, makeStyles, mergeClasses } from '@fluentui/react-components';
import React, { useEffect } from 'react';

import styles from './error.module.css';

const useInlineStyles = makeStyles({
  errorContainer: {
    color: '#d9534f', // TODO: Get it from tokens
  },
});

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  message?: string;
  children?: React.ReactNode;
}

const Error: React.FC<ErrorProps> = ({ error, reset, message, children }) => {
  const inlineStyles = useInlineStyles();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const errorMessage = message || (
    <>
      An unexpected error occurred while fetching the data. <br />
      Try refreshing the page or check back later.
    </>
  );

  return (
    <div
      className={mergeClasses(
        styles.errorContainer,
        inlineStyles.errorContainer
      )}
    >
      <div className={styles.errorIcon}>⚠️</div>
      <p>{errorMessage}</p>
      {children && <div>{children}</div>}
      <Button className={styles.resetButton} onClick={reset}>
        Try again
      </Button>
    </div>
  );
};

export default Error;
