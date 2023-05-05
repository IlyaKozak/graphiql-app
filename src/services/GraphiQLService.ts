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

  let headersObject;
  if (headers) {
    headersObject = JSON.parse(headers);
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headersObject
      ? headersObject
      : {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
    body: JSON.stringify({ query: query, variables: variablesObject ? variablesObject : {} }),
  });
  const responseJSON = await response.json();

  if (response.status === 400 || response.status === 404) {
    throw new Error(`${JSON.stringify(responseJSON, null, 2)}`);
  } else {
    return responseJSON;
  }
}
