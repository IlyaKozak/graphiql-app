export default async function graphiQLService(
  endpoint: string,
  query: string | null,
  variables?: string | null,
  headers?: string | null
): Promise<string> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const responseJSON = await response.json();
  return responseJSON;
}

// export default async function graphiQLService(
//   endpoint: string,
//   query: string | null,
//   variables?: string | null,
//   headers?: string | undefined
// ): Promise<string> {
//   const requestHeaders: HeadersInit = new Headers(
//     JSON.parse(headers || '{"Content-Type":"application/json"}')
//   );

//   console.log(Object.fromEntries(requestHeaders));
//   const header = Object.fromEntries(requestHeaders);

//   const response = await fetch(endpoint, {
//     method: 'POST',
//     headers: header,
//     body: JSON.stringify({
//       query: { query },
//       variables: { variables },
//     }),
//   });

//   const responseJSON = await response.json();
//   return responseJSON;
// }
