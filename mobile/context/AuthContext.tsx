import { createContext, useEffect, useState } from 'react';
import AuthServices from '../services/AuthServices';

export const AuthContext = createContext<any | null>(null);

export default function AuthContextProvider(props: any) {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(0);
  const [username, setUsername] = useState(null);

  // Retrive user info on load
  useEffect(() => {
    AuthServices.getUserInfo()
    .then((res: any) => {
        if (res.user_id) {
          setIsAuth(true);
          setUserId(res.user_id);
          setUserEmail(res.email);
          setIsAdmin(res.is_admin);
          setUsername(res.username);
        } 
    })
    .catch((err: any) => {
      console.log(err);
    });
  }, []);

  const canDelete = (id: number) => {
    return userId === id || isAdmin;
  }

  const allowedContent: any = {
    userId,
    setUserId,
    isAuth,
    setIsAuth,
    userEmail,
    setUserEmail,
    isAdmin,
    setIsAdmin,
    canDelete,
    username,
    setUsername,
  };

  return (
    <AuthContext.Provider value={allowedContent}>
      {props.children}
    </AuthContext.Provider>
  );
}