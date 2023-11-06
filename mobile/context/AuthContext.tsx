import { createContext, useEffect, useState } from 'react';
import AuthServices from '../services/AuthServices';

export const AuthContext = createContext<any | null>(null);

export default function AuthContextProvider(props: any) {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    AuthServices.getUserInfo()
    .then((res: any) => {
        if (res.user_id) {
          setIsAuth(true);
          setUserId(res.user_id);
          setUserEmail(res.email);
          setIsAdmin(res.is_admin);
        } 
    })
    .catch((err: any) => {
      console.log(err);
    });
  }, []);


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