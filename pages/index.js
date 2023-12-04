import React, { useEffect } from 'react';
import Head from 'next/head';
import Home from 'layouts/Home';

const Page = () => {
  return (
    <>
      <Head>
        <title>Taste Of Persia</title>
        <meta name="description" content="The Goodness Land" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </>
  );
};

export default Page;
