import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useLocaleContext } from '../../context/locale.context';
import { useAuthContext } from '../../context/auth.context';
import AuthComponent from '../../components/Auth/Auth';
import Loader from '../../components/Loader/Loader';

export default function Auth() {
  const { authUser, isLoading } = useAuthContext();
  const router = useRouter();
  const [locale] = useLocaleContext();
  const {
    auth: { title, h1 },
  } = locale;

  useEffect(() => {
    if (authUser) router.push('/graphiql');
  }, [authUser, router]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && <Loader />}
      {!isLoading && !authUser && (
        <>
          <h1>{h1}</h1>
          <AuthComponent />
        </>
      )}
    </>
  );
}
