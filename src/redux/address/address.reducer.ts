import type { GlobalAction, GlobalState } from '..';

export type AddressState = string;

export const initialState: AddressState = '';

export function addressReducer(state = initialState, action: GlobalAction) {
  switch (action.type) {
    case 'SET_ADDRESS':
      return action.payload.address;
    default:
      return state;
  }
}

export function selectAddress(state: GlobalState): AddressState {
  return state.address;
}
