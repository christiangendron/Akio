import { createContext, useState } from 'react';
import { useQuery } from 'react-query';
import TokenServices from '../services/TokenServices';
import { AuthContextProviderProps, AuthContextValue } from '../types/AuthContext';

export const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthContextProvider(props: AuthContextProviderProps) {
  const [isAuth, setIsAuth] = useState(false);

  const token = useQuery('token', () => TokenServices.getToken());
  
  const allowedContent: AuthContextValue = {
    isAuth,
    setIsAuth,
    token,
  };

  return (
    <AuthContext.Provider value={allowedContent}>
      {props.children}
    </AuthContext.Provider>
  );
}