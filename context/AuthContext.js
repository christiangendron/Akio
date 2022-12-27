import {createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext('default');

function AuthContextProvider(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);

  const allowedContent = {
    isAuth,
    setIsAuth,
    token,
    setToken,
  };

  return (
    <AuthContext.Provider value={allowedContent}>
      {props.children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthContextProvider;
