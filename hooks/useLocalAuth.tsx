import {useState} from 'react';
import LocalAuth from '../services/LocalAuth';

export default function useLocalAuth() {
  const [allowed, setAllowed] = useState(false);

  function checkAuth() {
    LocalAuth.getAuth().then((res) => {
      if (res.success) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
    });
  }

  return {
    allowed,
    checkAuth,
  };
};
