import Main from '@/components/main/main';
import PageHeader from '@/components/pageHeader/pageHeader';
import { getPageContent } from '@/libraries/api';
import markdownToHtml from '@/libraries/utilities/markdownToHtml';
import React from 'react';

import styles from '../cards/[cardId]/page.module.css';

const About: React.FC = async () => {
  const { data, content } = getPageContent('about') ?? {
    data: null,
    content: '',
  };
  const article = await markdownToHtml(content !== null ? content : '');

  return (
    <Main>
      <PageHeader title={data?.title} subTitle={data?.subTitle} />

      <article>
        <div
          className={styles.markdown}
          dangerouslySetInnerHTML={{ __html: article }}
        />
      </article>
    </Main>
  );
};

export default About;
