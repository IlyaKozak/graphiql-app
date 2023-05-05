import { dataType, __Schema as Schema } from '../types/schema';
import { QUERY } from '@/constants/queryToGetGraphQLSchema';

export default async function GraphiQLInitialService(endpoint: string): Promise<Schema | string> {
  const query = QUERY;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const responseJSON: dataType = await response.json();

    if (response.status === 400 || response.status === 404) {
      throw new Error(`Error: ${response.status} (${response.statusText})`);
    } else {
      return responseJSON.data.__schema;
    }
  } catch (error) {
    return 'Invalid Endpoint - No Schema Available';
  }
}
