import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Feed from '../screens/Feed';
import AuthContextProvider from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Livefeed" component={Feed} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
};
