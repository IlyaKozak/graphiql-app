import Head from 'next/head';

import Welcome from '../components/Welcome/Welcome';

export default function Home() {
  return (
    <>
      <Head>
        <title>GraphiQL Clone - NextFireTeam</title>
        <meta name="description" content="GraphiQL Clone - NextFireTeam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Welcome />
    </>
  );
}
