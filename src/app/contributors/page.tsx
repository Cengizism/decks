import Contributor from '@/components/card/contributor';
import BreadCrumps from '@/components/navigation/bread-crumps';
import PageHeader from '@/components/page-header/page-header';
import { ContributorType } from '@/interfaces/types';
import { getAllContributors } from '@/libraries/';

import styles from '../page.module.css';

const ContributorsPage: React.FC = () => {
  const contributors: ContributorType[] = getAllContributors();

  return (
    <>
      <BreadCrumps />

      <PageHeader
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
