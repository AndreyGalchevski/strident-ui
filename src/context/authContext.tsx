import React, { createContext, useContext, useReducer, ReactElement } from 'react';

import { initialState, reducer } from './authReducer';

const AuthContext = createContext({});

export function useAuthContext(): any {
  return useContext(AuthContext);
}

export interface AuthProviderProps {
  children: ReactElement[];
}

export function AuthProvider(props: AuthProviderProps): ReactElement {
  const { children } = props;

  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AuthContext.Provider>
  );
}
