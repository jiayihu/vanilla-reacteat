import { applyMiddleware, combineReducers, compose, createStore, Middleware } from 'redux';
import { AddressAction } from './address/address.actions';
import { addressReducer, AddressState } from './address/address.reducer';
import { AuthAction } from './auth/auth.actions';
import { CartAction } from './cart/cart.actions';
import { cartReducer, CartState } from './cart/cart.reducer';

export type GlobalState = {
  address: AddressState;
  cart: CartState;
};

export type GlobalAction = AddressAction | CartAction | AuthAction;

// (rootState, action) => rootState
//   (stateAddress, action) => stateAddress
//   (stateCart, action) => stateCart

/**
 * 1. initialState
 * 2. composizione di reducer
 */
const rootReducer = combineReducers<GlobalState>({
  address: addressReducer,
  cart: cartReducer,
});

// const action = { type: "@@INIT" }
// rootReducer(undefined, action) => { address: addressReducer(undefined, action), cart: cartReducer(undefined, action) } => { address: "", cart: { restaurant: null, items: [] } }

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const thunkMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('Caught action', action);

  if (typeof action === 'function') {
    return action(store.dispatch);
  }

  return next(action);
};

const historyMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('Caught action', action);

  if (action.type === 'REDIRECT') {
    window.location.replace(action.payload.url);
    return;
  }

  return next(action);
};

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, historyMiddleware)),
);
