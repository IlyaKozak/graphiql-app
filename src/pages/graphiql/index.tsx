import Head from 'next/head';
import MainHeader from '@/components/MainHeader/MainHeader';
import graphiQLService from '@/models/GraphiQLService';
import { useEffect, useState } from 'react';
import { __Schema as Schema } from '@/types/schema';

export default function Main() {
  const [endpoint, setEndpoint] = useState('https://rickandmortyapi.com/graphql');
  const [schemaData, setSchemaData] = useState<Schema | null>(null);

  const handleSubmit = (endpoint: string) => {
    setEndpoint(endpoint);
  };

  useEffect(() => {
    graphiQLService(endpoint).then((data) => setSchemaData(data));
  }, [endpoint]);

  return (
    <>
      <Head>
        <title>GraphiQL Clone - Main Page</title>
        <meta name="description" content="GraphiQL Clone - Main Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHeader onSubmit={handleSubmit} />
      <h1>Main / GraphiQL Page</h1>
      <p>{JSON.stringify(schemaData?.mutationType)}</p>
    </>
  );
}
