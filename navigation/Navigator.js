import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AuthContextProvider from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
};
