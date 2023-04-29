import Head from 'next/head';
import { useRouter } from 'next/router';

import { useAuthContext } from '../../context/auth.context';
import { useEffect } from 'react';

export default function Main() {
  const { authUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) router.push('/');
  }, [authUser, router]);

  return (
    <>
      <Head>
        <title>GraphiQL Clone - Main Page</title>
        <meta name="description" content="GraphiQL Clone - Main Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {authUser ? <h1>Main / GraphiQL Page</h1> : ''}
    </>
  );
}
