export function request(resource, options) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const headers = new Headers();

  headers.set('Content-Type', 'application/json');

  return fetch(`${BASE_URL}/${resource}`, {
    headers,
    ...options,
  }).then((response) => {
    if (!response.ok) throw new Error(response.statusText);

    return response.json();
  });
}
