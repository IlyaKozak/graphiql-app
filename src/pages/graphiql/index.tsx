import Head from 'next/head';
import MainHeader from '@/components/MainHeader/MainHeader';
import GraphiQLInitialService from '@/models/GraphiQLInitialService';
import { useEffect, useState } from 'react';
import { __Schema as Schema } from '@/types/schema';
import ResponseSection from '@/components/ResponseSection/ResponseSection';
import EditorSection from '@/components/EditorSection/EditorSection';

export default function Main() {
  const [endpoint, setEndpoint] = useState('https://rickandmortyapi.com/graphql');
  const [schemaData, setSchemaData] = useState<Schema | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const handleEndpointSubmit = (endpoint: string) => {
    setEndpoint(endpoint);
  };

  useEffect(() => {
    GraphiQLInitialService(endpoint).then((data) => {
      if (typeof data !== 'string') {
        setSchemaData(data);
      } else {
        setSchemaData(null);
      }
    });
  }, [endpoint]);

  return (
    <>
      <Head>
        <title>GraphiQL Clone - Main Page</title>
        <meta name="description" content="GraphiQL Clone - Main Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHeader onEndpointSubmit={handleEndpointSubmit} endpoint={endpoint} />
      <div className="container-main">
        <EditorSection setResponse={setResponse} endpoint={endpoint} />
        <ResponseSection response={response} />
      </div>
    </>
  );
}
