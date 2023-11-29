import Head from 'next/head';
import ContactUs from 'layouts/ContactUs';

const Page = () => {
  return (
    <>
      <Head>
        <title>The Goodness Land - About Us</title>
        <meta name="description" content="Royal Plate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContactUs />
    </>
  );
};

export default Page;
