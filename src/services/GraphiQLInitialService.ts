import { dataType, __Schema as Schema } from '@/types/schema';
import { QUERY } from '@/constants/queryToGetGraphQLSchema';

export default async function GraphiQLInitialService(endpoint: string): Promise<Schema> {
  const query = QUERY;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (response.status >= 500 && response.status <= 599) {
    throw new Error('500 Internal Server Error');
  }

  const responseJSON: dataType = await response.json();

  return responseJSON.data.__schema;
}
