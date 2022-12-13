import React, { createContext, useContext, useState, useMemo } from 'react';

const AddressContext = createContext();

export function useAddress() {
  const address = useContext(AddressContext);

  if (!address) {
    throw new Error('Cannot be used outside of a CartProvider');
  }

  return address;
}

export function AddressProvider(props) {
  const [address, setAddress] = useState(null);
  const value = useMemo(() => [address, setAddress], [address]);

  return (
    <AddressContext.Provider value={value} {...props}>
      {props.children}
    </AddressContext.Provider>
  );
}
