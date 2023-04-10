import { UseQueryResult } from "react-query";

export interface AuthContextValue {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
  }

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export type RedditAccessTokenResponse = {
  access_token: string
  token_type: string
  device_id: string
  expires_in: number
  scope: string
}