import React from 'react';

import styles from './loading.module.css';

interface LoadingProps {
  children?: React.ReactNode;
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({
  children,
  message = 'Loading...',
}) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>{message}</p>
      {children && <div className={styles.childrenContainer}>{children}</div>}
    </div>
  );
};

export default Loading;
