import { dataType, __Schema as Schema } from '../types/schema';
import { QUERY } from '@/constants/queryToGetGraphQLSchema';

export default async function graphiQLService(endpoint: string): Promise<Schema> {
  const query = QUERY;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const responseJSON: dataType = await response.json();

  return responseJSON.data.__schema;
}
