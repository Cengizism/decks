import BreadCrumps from '@/components/bread-crumps';
import Header from '@/components/header';
import Paths from '@/components/paths';
import { PathType } from '@/interfaces/types';
import { getAllPaths } from '@/lib/api';

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
        <Paths paths={paths} />
      ) : (
        <div>No paths available.</div>
      )}
    </>
  );
};

export default PathsPage;
