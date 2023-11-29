import Head from 'next/head';
import Menu from 'layouts/Admin/Menu';

const Index = () => {
  return (
    <>
      <Head>
        <title>The Goodness Land - Admin Menus</title>
        <meta name="description" content="Royal Plate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
    </>
  );
};

export default Index;
