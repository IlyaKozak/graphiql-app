import Head from 'next/head';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState, lazy } from 'react';
import { useAuthContext } from '@/context/auth.context';
import EndpointSection from '@/components/EndpointSection/EndpointSection';
import MainHeader from '@/components/MainHeader/MainHeader';
import GraphiQLInitialService from '@/services/GraphiQLInitialService';
import { __Schema as Schema } from '@/types/schema';
import ResponseSection from '@/components/ResponseSection/ResponseSection';
import EditorSection from '@/components/EditorSection/EditorSection';
import Loader from '@/components/Loader/Loader';
import { useLocaleContext } from '@/context/locale.context';
import classes from '../../components/Docs/docs.module.css';

const LazyDocs = lazy(() => import('../../components/Docs/Docs'));

export default function Main() {
  const { authUser, isLoading } = useAuthContext();
  const router = useRouter();
  const [endpoint, setEndpoint] = useState('');
  const [schemaData, setSchemaData] = useState<Schema | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [isLoadingSchema, setIsLoadingSchema] = useState(false);

  const [locale] = useLocaleContext();
  const {
    main: { docsLable },
  } = locale;

  const handleLableClick = () => {
    if (schemaData) {
      setActive(!active);
    }
  };

  const handleEndpointSubmit = (endpoint: string) => {
    setEndpoint(endpoint);
    setResponse(null);
  };

  useEffect(() => {
    if (!isLoading && !authUser) router.push('/');
  }, [authUser, isLoading, router]);

  useEffect(() => {
    if (endpoint) {
      setIsLoadingSchema(true);
      GraphiQLInitialService(endpoint).then((data) => {
        if (typeof data !== 'string') {
          setSchemaData(data);
        } else {
          setSchemaData(null);
          setResponse(data);
        }
        setIsLoadingSchema(false);
      });
    }
  }, [endpoint]);

  useEffect(() => {
    if (schemaData === null) {
      setActive(false);
    }
  }, [schemaData]);

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
          <EndpointSection
            onEndpointSubmit={handleEndpointSubmit}
            endpoint={endpoint}
            isLoadingSchema={isLoadingSchema}
          />
          <div className="container-main">
            <div
              onClick={handleLableClick}
              className={schemaData ? classes.lable : classes.lableDisabled}
            >
              {docsLable}
            </div>
            <EditorSection setResponse={setResponse} endpoint={endpoint} />
            <ResponseSection response={response} />
            <div className={active && schemaData ? classes.docsVisible : classes.docsInvisible}>
              <Suspense fallback={<Loader />}>
                {schemaData && <LazyDocs handleLableClick={handleLableClick} schema={schemaData} />}
              </Suspense>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}
