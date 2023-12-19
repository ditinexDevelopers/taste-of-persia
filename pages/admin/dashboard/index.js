import Head from 'next/head';
import Dashboard from 'layouts/Admin/Dasboard';

const Index = () => {
  return (
    <>
      <Head>
        <title>Taste of Persia - Admin Dashboard</title>
        <meta name="description" content="Taste of Persia - Admin Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
};

export default Index;
