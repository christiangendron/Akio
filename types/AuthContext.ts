export interface AuthContextValue {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
    token: any;
  }