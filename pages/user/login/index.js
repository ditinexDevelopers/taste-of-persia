import Head from 'next/head';
import LogIn from 'layouts/User/LogIn';

const Page = () => {
  return (
    <>
      <Head>
        <title>The Goodness Land - User Login</title>
        <meta name="description" content="The Goodness Land - User Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <LogIn /> */}
      <h1>Login Page</h1>
    </>
  );
};

export default Page;
