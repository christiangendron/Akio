import {useEffect} from 'react';
import Navigator from './navigation/Navigator';
import Denied from './components/Denied';
import {LogBox} from 'react-native';
import useLocalAuth from './hooks/useLocalAuth';
import {QueryClientProvider, QueryClient} from 'react-query';
import AuthContextProvider from './context/AuthContext';

const queryClient = new QueryClient();

export default function App() {
  const {allowed, checkAuth} = useLocalAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const akioApp = allowed ? <Navigator /> : <Denied checkAuth={checkAuth} />;

  LogBox.ignoreLogs(['Could not find image']);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {akioApp}
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
