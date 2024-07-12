import Contributor from '@/components/card/contributor';
import Header from '@/components/header';
import BreadCrumps from '@/components/navigation/bread-crumps';
import { ContributorType } from '@/interfaces/types';
import { getAllContributors } from '@/libraries/api';

import styles from '../page.module.css';

const ContributorsPage: React.FC = () => {
  const contributors: ContributorType[] = getAllContributors();

  return (
    <>
      <BreadCrumps />

      <Header
        title='Contributors'
        subTitle='Here you can find all the contributors available in the platform.'
      />

      {contributors.length > 0 ? (
        <div className={styles.grid}>
          {contributors.map((contributor) => (
            <Contributor key={contributor.id} contributor={contributor} />
          ))}
        </div>
      ) : (
        <div>No paths available.</div>
      )}
    </>
  );
};

export default ContributorsPage;
