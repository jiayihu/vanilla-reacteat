import { MenuItem } from '../restaurant/restaurant.types';

export interface Order {
  id: string;
  date: string;
  restaurantId: string;
  deliveryCharge: number;
  address: string;
  items: MenuItem[];
}
