import Head from 'next/head';
import SignUp from 'layouts/User/SignUp';

const Page = () => {
  return (
    <>
      <Head>
        <title>The Goodness Land - User SignUp</title>
        <meta name="description" content="The Goodness Land - User SignUp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <SignUp /> */}
      <h1>SignUp Page</h1>
    </>
  );
};

export default Page;
