import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAuthContext } from '@/context/auth.context';
import EndpointSection from '@/components/EndpointSection/EndpointSection';
import MainHeader from '@/components/MainHeader/MainHeader';
import GraphiQLInitialService from '@/services/GraphiQLInitialService';
import { __Schema as Schema } from '@/types/schema';
import ResponseSection from '@/components/ResponseSection/ResponseSection';
import EditorSection from '@/components/EditorSection/EditorSection';
import Docs from '@/components/Docs/Docs';
import { DEFAULT_GRAPHQL_ENDPOINT } from '@/constants/defaultGraphQLEndpoint';
import Loader from '@/components/Loader/Loader';

export default function Main() {
  const { authUser, isLoading } = useAuthContext();
  const router = useRouter();
  const [endpoint, setEndpoint] = useState(DEFAULT_GRAPHQL_ENDPOINT);
  const [schemaData, setSchemaData] = useState<Schema | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const handleEndpointSubmit = (endpoint: string) => {
    setEndpoint(endpoint);
  };

  useEffect(() => {
    if (!isLoading && !authUser) router.push('/');
  }, [authUser, isLoading, router]);

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

      {isLoading && <Loader />}
      {authUser ? (
        <>
          <MainHeader />
          <EndpointSection onEndpointSubmit={handleEndpointSubmit} endpoint={endpoint} />
          <div className="container-main">
            <EditorSection setResponse={setResponse} endpoint={endpoint} />
            <ResponseSection response={response} />
            <Docs schema={schemaData} />
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}
