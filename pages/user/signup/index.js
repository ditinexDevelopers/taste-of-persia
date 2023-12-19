import Head from 'next/head';
import SignUp from 'layouts/User/SignUp';

const Page = () => {
  return (
    <>
      <Head>
        <title>Taste of Persia - SignUp</title>
        <meta name="description" content="The Goodness Land - User SignUp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUp />
    </>
  );
};

export default Page;
