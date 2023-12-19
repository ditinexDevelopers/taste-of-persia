import Head from 'next/head';
import Orders from 'layouts/Admin/Orders';

const Index = () => {
  return (
    <>
      <Head>
        <title>Taste of Persia - Admin Orders</title>
        <meta name="description" content="Taste of Persia - Admin Orders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Orders />
    </>
  );
};

export default Index;
