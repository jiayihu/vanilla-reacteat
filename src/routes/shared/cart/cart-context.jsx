import React, { useCallback, useContext, useMemo, useReducer, useState } from 'react';

const CartContext = React.createContext();

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('Cannot be used outside of a CartProvider');
  }

  return context;
}

const initialState = {
  restaurant: null,
  items: [],
};

export function reducer(state, action) {
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
    default:
      return state;
  }
}

export function CartProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setRestaurant = useCallback(
    (restaurant) => dispatch({ type: 'SET_RESTAURANT', payload: { restaurant } }),
    [],
  );

  const addItem = useCallback((item) => dispatch({ type: 'ADD_ITEM', payload: { item } }), []);

  const removeItem = useCallback(
    (item) => dispatch({ type: 'REMOVE_ITEM', payload: { item } }),
    [],
  );

  const cartAPI = useMemo(() => {
    return { setRestaurant, addItem, removeItem };
  }, [setRestaurant, addItem, removeItem]);

  const value = useMemo(() => [state, cartAPI], [state, cartAPI]);

  return (
    <CartContext.Provider value={value} {...props}>
      {props.children}
    </CartContext.Provider>
  );
}

function UseStateCartProvider(props) {
  const [items, setItems] = useState([]);

  const addItem = useCallback((item) => setItems((items) => [...items, item]), []);

  const removeItem = useCallback(
    (item) => setItems((items) => items.filter((i) => i.id !== item.id)),
    [],
  );

  const cartAPI = useMemo(() => {
    return { addItem, removeItem };
  }, [addItem, removeItem]);

  const value = useMemo(() => [items, cartAPI], [items, cartAPI]);

  return (
    <CartContext.Provider value={value} {...props}>
      {props.children}
    </CartContext.Provider>
  );
}
