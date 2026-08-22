import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useLocaleContext } from '@/context/locale.context';
import { useAuthContext } from '@/context/auth.context';
import AuthComponent from '@/components/Auth/Auth';
import Loader from '@/components/Loader/Loader';
import MainHeader from '@/components/MainHeader/MainHeader';
import Footer from '@/components/Footer/Footer';

export default function Auth() {
  const { authUser, authErrorMessage, isLoading } = useAuthContext();
  const router = useRouter();
  const [locale] = useLocaleContext();
  const {
    auth: { title },
  } = locale;

  useEffect(() => {
    if (authErrorMessage) router.push('/');
  }, [authErrorMessage, router]);

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
      <MainHeader />
      <div className="body-wrapper">
        {isLoading && <Loader />}
        {!isLoading && !authUser && (
          <>
            <AuthComponent />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
