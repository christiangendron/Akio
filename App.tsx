import {useEffect} from 'react';
import Navigator from './navigation/Navigator';
import {LogBox} from 'react-native';
import useLocalAuth from './hooks/useLocalAuth';
import {QueryClientProvider, QueryClient} from 'react-query';
import AuthContextProvider from './context/AuthContext';
import ErrorMessage from './components/ErrorMessage';

const queryClient = new QueryClient();

export default function App() {
  const {allowed, checkAuth} = useLocalAuth();

  useEffect(() => {
    //checkAuth();
  }, []);

  const akioApp = !allowed ? <Navigator /> : <ErrorMessage message="You must be authentificated to view this content" actionMessage="Get Authentificated" action={checkAuth} />;

  LogBox.ignoreLogs(['Could not find image']);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {akioApp}
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
