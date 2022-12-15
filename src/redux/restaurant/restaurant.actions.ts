import { Dispatch } from 'redux';
import { getRestaurant as fetchRestaurant } from '../../services/restaurant.service';
import { setCartRestaurant } from '../cart/cart.actions';

export const getRestaurant = (restaurantId: string) => {
  return (dispatch: Dispatch) =>
    fetchRestaurant(restaurantId).then((restaurant) => {
      dispatch(setCartRestaurant(restaurant));
    });
};
