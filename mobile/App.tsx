import Navigator from './navigation/Navigator';
import {LogBox} from 'react-native';
import {QueryClientProvider, QueryClient} from 'react-query';
import SettingContextProvider from './context/SettingsContext';

const queryClient = new QueryClient();

export default function App() {
  LogBox.ignoreLogs(['Could not find image']);
  LogBox.ignoreLogs(['VirtualizedList: You have a large']);
  LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no']);

  return (
    <QueryClientProvider client={queryClient}>
        <SettingContextProvider>
        <Navigator />
        </SettingContextProvider>
    </QueryClientProvider>
  );
}
