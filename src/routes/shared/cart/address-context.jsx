import { createContext, useContext, useState } from 'react';

const AddressContext = createContext();
const AddressAPIContext = createContext();

export function useAddress() {
  const address = useContext(AddressContext);

  if (!address) {
    throw new Error('Cannot be used outside of a CartProvider');
  }

  return address;
}

export function useAddressAPI() {
  const addressAPI = useContext(AddressAPIContext);

  if (!addressAPI) {
    throw new Error('Cannot be used outside of a CartProvider');
  }

  return addressAPI;
}

export function AddressProvider(props) {
  const [address, setAddress] = useState(null);

  return (
    <AddressContext.Provider value={address} {...props}>
      <AddressAPIContext.Provider value={setAddress}>{props.children}</AddressAPIContext.Provider>
    </AddressContext.Provider>
  );
}
