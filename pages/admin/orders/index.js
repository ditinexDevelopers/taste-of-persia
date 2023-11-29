import Head from 'next/head';
import Orders from 'layouts/Admin/Orders';

const Index = () => {
  return (
    <>
      <Head>
        <title>The Goodness Land - Admin Orders</title>
        <meta name="description" content="The Goodness Land - Admin Orders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Orders />
    </>
  );
};

export default Index;
