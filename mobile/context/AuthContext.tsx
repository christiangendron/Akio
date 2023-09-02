import { createContext, useState } from 'react';
import { AuthContextProviderProps, AuthContextValue } from '../types/AuthContext';

export const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthContextProvider(props: AuthContextProviderProps) {
  const [isAuth, setIsAuth] = useState(false);
  
  const allowedContent: AuthContextValue = {
    isAuth,
    setIsAuth,
  };

  return (
    <AuthContext.Provider value={allowedContent}>
      {props.children}
    </AuthContext.Provider>
  );
}