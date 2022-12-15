import { Restaurant } from '../routes/restaurant/restaurant.types';
import { request } from './request';

export function getRestaurant(id: string): Promise<Restaurant> {
  return request(`restaurants/${id}`);
}
