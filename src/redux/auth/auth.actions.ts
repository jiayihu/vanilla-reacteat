export const logout = () => {
  return { type: 'LOGOUT' } as const;
};

export type AuthAction = ReturnType<typeof logout>;
