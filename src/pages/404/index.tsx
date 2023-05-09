import Head from 'next/head';

import { useLocaleContext } from '../../context/locale.context';
import Custom404 from '../../components/Custom404/Custom404';

export default function Custom404Page() {
  const [locale] = useLocaleContext();
  const {
    404: { title },
  } = locale;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Custom404 />
    </>
  );
}
