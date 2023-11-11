import Navigator from './navigation/Navigator';
import {LogBox} from 'react-native';
import {QueryClientProvider, QueryClient} from 'react-query';
import SettingContextProvider from './context/SettingsContext';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthContextProvider from './context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
});

export default function App() {
  console.log('BACKEND_URL', process.env.BACKEND_URL);
  console.log('BACKEND_IMAGE_URL', process.env.BACKEND_IMAGE_URL)

  const { colorScheme } = useColorScheme();

  const statusBar = colorScheme === 'dark' ? <StatusBar style="light" /> : <StatusBar style="dark" />
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <SettingContextProvider>
            {statusBar}
            <Navigator />
          </SettingContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
