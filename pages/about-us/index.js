import Head from 'next/head';
import AboutUs from 'layouts/AboutUs';

const Page = () => {
  return (
    <>
      <Head>
        <title>Taste of Persia - About Us</title>
        <meta name="description" content="Royal Plate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AboutUs />
    </>
  );
};

export default Page;
