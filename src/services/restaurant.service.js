import { request } from './request';

export function getRestaurant(id) {
  return request(`restaurants/${id}`);
}
