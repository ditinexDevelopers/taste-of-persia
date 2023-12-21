import Head from 'next/head';
import Cart from 'layouts/User/Cart';

const Page = () => {
  return (
    <>
      <Head>
        <title>Taste of Persia - User Cart</title>
        <meta name="description" content="Taste of Persia - User Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cart />
    </>
  );
};

export default Page;
