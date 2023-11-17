import Navigator from './navigation/Navigator';
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
