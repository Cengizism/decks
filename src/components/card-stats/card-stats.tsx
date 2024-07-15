import React from 'react';

import styles from './card-stats.module.css';

interface CardStatsProps {
  children: React.ReactNode;
}

const CardStats: React.FC<CardStatsProps> = ({ children }) => {
  return <footer className={styles.flex}>{children}</footer>;
};

export default CardStats;
