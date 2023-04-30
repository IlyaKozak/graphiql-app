import Head from 'next/head';

import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import { useLocaleContext } from '../../context/locale.context';

export default function Auth() {
  const [locale] = useLocaleContext();
  const {
    auth: { title, h1 },
  } = locale;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{h1}</h1>
      <SignIn />
      <SignUp />
    </>
  );
}
