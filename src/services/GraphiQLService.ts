export default async function graphiQLService(
  endpoint: string,
  query: string | null,
  variables?: string | null,
  headers?: string | null
): Promise<string> {
  let variablesObject;
  if (variables) {
    variablesObject = JSON.parse(variables);
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: query, variables: variablesObject ? variablesObject : {} }),
  });

  const responseJSON = await response.json();
  return responseJSON;
}
