import Navigator from './navigation/Navigator';
import {LogBox} from 'react-native';
import {QueryClientProvider, QueryClient} from 'react-query';
import SettingContextProvider from './context/SettingsContext';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
});

export default function App() {
  LogBox.ignoreLogs(['Could not find image']);
  LogBox.ignoreLogs(['VirtualizedList: You have a large']);
  LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no']);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
          <SettingContextProvider>
            <Navigator />
          </SettingContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
