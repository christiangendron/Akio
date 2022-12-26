import {useEffect} from 'react';
import Navigator from './navigation/Navigator';
import Denied from './components/Denied';
import useLocalAuth from './hooks/useLocalAuth';

export default function App() {
  const {allowed, checkAuth} = useLocalAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const akioApp = allowed ? <Navigator /> : <Denied checkAuth={checkAuth} />;

  return (akioApp);
}
