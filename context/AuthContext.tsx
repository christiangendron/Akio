import { createContext, useState } from 'react';
import { useQuery } from 'react-query';
import TokenServices from '../services/TokenServices';

export interface AuthContextValue {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  token: any;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuth: false,
  setIsAuth: () => {},
  token: {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

function AuthContextProvider(props: AuthContextProviderProps) {
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

export default AuthContextProvider;
