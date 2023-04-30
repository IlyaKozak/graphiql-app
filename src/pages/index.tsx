import Head from 'next/head';

import Welcome from '../components/Welcome/Welcome';
import { useLocaleContext } from '../context/locale.context';
import { useAuthContext } from '../context/auth.context';
import WelcomeHeader from '../components/WelcomeHeader/WelcomeHeader';

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
      <WelcomeHeader />
      <Welcome />
    </>
  );
}
