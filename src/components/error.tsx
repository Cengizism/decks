'use client';

import { Button, makeStyles } from '@fluentui/react-components';
import React, { useEffect } from 'react';

const useStyles = makeStyles({
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.75rem',
    height: '100vh',
    textAlign: 'center',
    color: '#d9534f', // TODO: Get it from tokens
  },
  errorIcon: {
    fontSize: '50px',
    marginBottom: '1rem',
  },
  resetButton: {
    marginTop: '.5rem',
  },
});

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  message?: string;
  children?: React.ReactNode;
}

const Error: React.FC<ErrorProps> = ({ error, reset, message, children }) => {
  const styles = useStyles();

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
    <div className={styles.errorContainer}>
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
