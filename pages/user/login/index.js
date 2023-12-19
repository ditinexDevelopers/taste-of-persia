import Head from 'next/head';
import LogIn from 'layouts/User/LogIn';

const Page = () => {
  return (
    <>
      <Head>
        <title>Taste of Persia - Login</title>
        <meta name="description" content="The Goodness Land - User Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LogIn />
    </>
  );
};

export default Page;
