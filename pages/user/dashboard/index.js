import Head from 'next/head';
import Dashboard from 'layouts/User/Dashboard';

const Page = () => {
  return (
    <>
      <Head>
        <title>The Goodness Land - User Dashboard</title>
        <meta name="description" content="The Goodness Land - User Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
};

export default Page;
