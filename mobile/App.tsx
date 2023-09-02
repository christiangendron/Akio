import {useEffect} from 'react';
import Navigator from './navigation/Navigator';
import {LogBox} from 'react-native';
import useLocalAuth from './hooks/useLocalAuth';
import {QueryClientProvider, QueryClient} from 'react-query';
import AuthContextProvider from './context/AuthContext';
import ErrorMessage from './components/ErrorMessage';
import SettingContextProvider from './context/SettingsContext';

const queryClient = new QueryClient();

export default function App() {
  const {allowed, checkAuth} = useLocalAuth();

  useEffect(() => {
    //checkAuth();
  }, []);

  const akioApp = !allowed ? <Navigator /> : <ErrorMessage message="You must be authentificated to view this content" actionMessage="Get Authentificated" action={checkAuth} />;

  LogBox.ignoreLogs(['Could not find image']);
  LogBox.ignoreLogs(['VirtualizedList: You have a large']);
  LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no']);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SettingContextProvider>
          {akioApp}
        </SettingContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
