'use client';

import { Button, makeStyles, mergeClasses } from '@fluentui/react-components';
import React, { useEffect } from 'react';

import classes from './error.module.css';

const useStyles = makeStyles({
  errorContainerFontColor: {
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
    <div
      className={mergeClasses(
        classes.errorContainer,
        styles.errorContainerFontColor
      )}
    >
      <div className={classes.errorIcon}>⚠️</div>
      <p>{errorMessage}</p>
      {children && <div>{children}</div>}
      <Button className={classes.resetButton} onClick={reset}>
        Try again
      </Button>
    </div>
  );
};

export default Error;
