import Header from '@/components/header';
import { DESCRIPTION } from '@/lib/constants';

export default async function Index() {
  return (
    <>
      <Header title='Welcome to the platform' subTitle={DESCRIPTION} />
    </>
  );
}
