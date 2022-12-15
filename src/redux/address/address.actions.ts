export const setAddress = (address: string) => {
  return { type: 'SET_ADDRESS', payload: { address } } as const;
};

export type AddressAction = ReturnType<typeof setAddress>;
