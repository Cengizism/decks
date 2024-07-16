import BreadCrumps from '@/components/breadCrumps/breadCrumps';
import Path from '@/components/card/path';
import PageHeader from '@/components/pageHeader/pageHeader';
import { PathType } from '@/interfaces/';
import { getAllPaths } from '@/libraries/api';

import styles from '../page.module.css';

const PathsPage: React.FC = () => {
  const paths: PathType[] = getAllPaths();

  return (
    <>
      <BreadCrumps />

      <PageHeader
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
