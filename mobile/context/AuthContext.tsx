import { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext<any | null>(null);

export type UserInfo = {
  id: number;
  username: string;
  email: string;
  is_admin: number;
  avatar: string;
  created_at: string;
}

/**
 * AuthContextProvider : used to save any user information used everywhere in the app.
 * @param props UserInfo
 * @returns JSX.Element
 */
export default function AuthContextProvider(props: any) {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({id: 0, username: '', email: '', is_admin: 0, avatar: '', created_at: ''})

  // Retrive user info on load
  useEffect(() => {
    SecureStore.getItemAsync('user_info')
    .then((res: any) => {
      const parsed = JSON.parse(res);
      
      if (parsed) {
        setIsAuth(true);
        setUserInfo(parsed);
      } 
    })
    .catch((err: any) => {
      console.log(err);
    });
  }, []);

  const onLogging = (data: UserInfo) => {
    setIsAuth(true);
    setUserInfo(data);
  }

  const onLogout = () => {
    setIsAuth(false);
    setUserInfo({id: 0, username: '', email: '', is_admin: 0, avatar: '', created_at: ''});
  }

  const canDelete = (item_id: number) => {
    return userInfo.id === item_id || userInfo.is_admin === 1;
  }

  const isAdmin = () => {
    return userInfo.is_admin === 1;
  }

  const allowedContent: any = {
    isAuth,
    setIsAuth,
    userInfo,
    onLogging,
    onLogout,
    canDelete,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={allowedContent}>
      {props.children}
    </AuthContext.Provider>
  );
}