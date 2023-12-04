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

  let responseJSON;
  let responseText;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headersObject
      ? headersObject
      : {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
    body: JSON.stringify({ query, variables: variablesObject ? variablesObject : {} }),
  });

  if (response.status >= 400 && response.status <= 499) {
    responseJSON = await response.json();
    throw new Error(
      `Error Status Code ${response.status}:\n${JSON.stringify(responseJSON, null, 2)}`
    );
  } else if (response.status >= 500 && response.status <= 599) {
    responseText = await response.text();
    throw new Error(`Error Status Code ${response.status}: ${responseText}`);
  } else {
    responseJSON = await response.json();
    return responseJSON;
  }
}
