import React, { createContext, useContext, FunctionComponent, useReducer } from 'react';

import { initialState, reducer } from './authReducer';

const AuthContext = createContext({});

export function useAuthContext(): any {
  return useContext(AuthContext);
}

export const AuthProvider: FunctionComponent = ({ children }) => {
  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AuthContext.Provider>
  );
};
