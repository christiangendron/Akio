import { createContext, useState } from 'react';
import { useQuery } from 'react-query';
import TokenServices from '../services/TokenServices';
import { AuthContextProviderProps, AuthContextValue } from '../types/AuthContext';

export default function AuthContextProvider(props: AuthContextProviderProps) {
  const [isAuth, setIsAuth] = useState(false);

  let token = useQuery('token', () => TokenServices.getToken());
  
  if (!token.isError && token.data) {
    token = token;
  }

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

export const AuthContext = createContext<AuthContextValue>({
  isAuth: false,
  setIsAuth: () => {},
  token: {},
});