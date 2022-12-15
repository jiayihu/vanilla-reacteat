import type { GlobalAction, GlobalState } from '..';
import { MenuItem, Restaurant } from '../../routes/restaurant/restaurant.types';

export type CartState = {
  restaurant: Restaurant | null;
  items: MenuItem[];
};

export const initialState: CartState = {
  restaurant: null,
  items: [],
};

export function cartReducer(state = initialState, action: GlobalAction) {
  switch (action.type) {
    case 'SET_RESTAURANT': {
      const { restaurant } = action.payload;

      return {
        ...state,
        restaurant,
      };
    }
    case 'ADD_ITEM': {
      const { item } = action.payload;

      return {
        ...state,
        items: [...state.items, item],
      };
    }
    case 'REMOVE_ITEM': {
      const { item } = action.payload;
      const firstIndex = state.items.findIndex((cartItem) => cartItem.id === item.id);

      if (firstIndex === -1) return state;

      return {
        ...state,
        items: state.items.filter((_, i) => i !== firstIndex),
      };
    }
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export function selectCart(state: GlobalState): CartState {
  return state.cart;
}

export function selectRestaurant(state: GlobalState): CartState['restaurant'] {
  return state.cart.restaurant;
}

export function selectCartItems(state: GlobalState): CartState['items'] {
  return state.cart.items;
}

export function selectDrinkItems(state: GlobalState): MenuItem[] {
  return state.cart.items.filter((item) => item.type === 'drink');
}
