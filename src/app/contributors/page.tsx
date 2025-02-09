import BreadCrumps from '@/components/breadCrumps/breadCrumps';
import Contributor from '@/components/card/contributor';
import Main from '@/components/main/main';
import PageHeader from '@/components/pageHeader/pageHeader';
import type { ContributorType } from '@/interfaces/';
import { getAllContributors } from '@/libraries/api';

import styles from '../page.module.css';

const ContributorsPage: React.FC = () => {
  const contributors: ContributorType[] = getAllContributors();

  return (
    <Main>
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
    </Main>
  );
};

export default ContributorsPage;
