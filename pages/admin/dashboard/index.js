import Head from 'next/head';
import Dashboard from 'layouts/Admin/Dasboard';

const Index = () => {
  return (
    <>
      <Head>
        <title>The Goodness Land - Admin Dashboard</title>
        <meta name="description" content="The Goodness Land - Admin Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
};

export default Index;
