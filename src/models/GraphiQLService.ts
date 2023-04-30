export default async function graphiQLService(
  endpoint: string,
  query: string | null
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
