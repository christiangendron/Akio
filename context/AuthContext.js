import {createContext, useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from 'react-query';
import TokenServices from '../services/TokenServices';

export const AuthContext = createContext('default');

function AuthContextProvider(props) {
  const [isAuth, setIsAuth] = useState(false);

  const token = useQuery('token', () => TokenServices.getToken());

  const allowedContent = {
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

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthContextProvider;
