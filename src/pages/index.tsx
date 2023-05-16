import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import { useLocaleContext } from '../context/locale.context';
import Welcome from '../components/Welcome/Welcome';
import MainHeader from '../components/MainHeader/MainHeader';
import Footer from '@/components/Footer/Footer';
import { useAuthContext } from '../context/auth.context';
import { ErrorToast } from '../components/ErrorToast/ErrorToast';

export default function Home() {
  const { authErrorMessage } = useAuthContext();
  const [showToast, setShowToast] = useState(false);
  const [locale] = useLocaleContext();
  const {
    home: { title },
    firebaseErrors,
  } = locale;

  useEffect(() => {
    if (authErrorMessage) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  }, [authErrorMessage]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {authErrorMessage && (
        <ErrorToast
          showToast={showToast}
          setShowToast={setShowToast}
          errorMessageToast={firebaseErrors[authErrorMessage] || authErrorMessage}
        />
      )}
      <MainHeader />
      <div className="bodyWelcomeWrapper">
        <Welcome />
      </div>
      <Footer />
    </>
  );
}
