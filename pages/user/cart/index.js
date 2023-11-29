import Head from 'next/head';
import Cart from 'layouts/User/Cart';

const Page = () => {
  return (
    <>
      <Head>
        <title>The Goodness Land - User Cart</title>
        <meta name="description" content="The Goodness Land - User Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cart />
    </>
  );
};

export default Page;
