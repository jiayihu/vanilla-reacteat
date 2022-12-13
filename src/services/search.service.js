import { request } from './request';

export function getSearchResults(query) {
  const { address } = query;
  console.log('Query', { address });

  return request(`restaurants`);
}

export function getPopularResults(query) {
  const { address } = query;
  console.log('Query', { address });

  return request(`popular`);
}
