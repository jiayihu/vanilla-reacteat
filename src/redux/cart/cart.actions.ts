import { MenuItem, Restaurant } from '../../routes/restaurant/restaurant.types';

export const setCartRestaurant = (restaurant: Restaurant) => {
  return { type: 'SET_RESTAURANT', payload: { restaurant } } as const;
};

export const addItem = (item: MenuItem) => {
  const date = new Date();

  return { type: 'ADD_ITEM', payload: { item, date } } as const;
};

export const removeItem = (item: MenuItem) => {
  return { type: 'REMOVE_ITEM', payload: { item } } as const;
};

export type CartAction =
  | ReturnType<typeof setCartRestaurant>
  | ReturnType<typeof addItem>
  | ReturnType<typeof removeItem>;
