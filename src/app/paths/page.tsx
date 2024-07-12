import Path from '@/components/card/path';
import Header from '@/components/header';
import BreadCrumps from '@/components/navigation/bread-crumps';
import { PathType } from '@/interfaces/types';
import { getAllPaths } from '@/libraries/api';

import styles from '../../styles/page.module.css';

const PathsPage: React.FC = () => {
  const paths: PathType[] = getAllPaths();

  return (
    <>
      <BreadCrumps />

      <Header
        title='Paths'
        subTitle='Follow the paths to learn more about a specific topic.'
      />

      {paths.length > 0 ? (
        <div className={styles.grid}>
          {paths.map((path) => (
            <Path key={path.id} path={path} />
          ))}
        </div>
      ) : (
        <div>No paths available.</div>
      )}
    </>
  );
};

export default PathsPage;
