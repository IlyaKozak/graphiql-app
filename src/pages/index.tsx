import Head from 'next/head';
import React from 'react';

import { useLocaleContext } from '../context/locale.context';
import Welcome from '../components/Welcome/Welcome';
import MainHeader from '../components/MainHeader/MainHeader';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  const [locale] = useLocaleContext();
  const {
    home: { title },
  } = locale;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHeader />
      <div className="bodyWelcomeWrapper">
        <Welcome />
      </div>
      <Footer />
    </>
  );
}
