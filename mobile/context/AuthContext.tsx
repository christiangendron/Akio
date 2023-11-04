import { createContext, useState } from 'react';

export const AuthContext = createContext<any | null>(null);

export default function AuthContextProvider(props: any) {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const allowedContent: any = {
    userId,
    setUserId,
    isAuth,
    setIsAuth,
    userEmail,
    setUserEmail,
    isAdmin,
    setIsAdmin,
  };

  return (
    <AuthContext.Provider value={allowedContent}>
      {props.children}
    </AuthContext.Provider>
  );
}