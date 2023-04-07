export interface AuthContextValue {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
    token: any;
  }

export interface AuthContextProviderProps {
  children: React.ReactNode;
}