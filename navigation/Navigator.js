import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {ActivityIndicator, View} from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import {AuthContext} from '../context/AuthContext';
import FullSizeImage from '../screens/FullSizeImage';

const Stack = createNativeStackNavigator();

export default function App() {
  const {token} = useContext(AuthContext);

  if (token.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
      </View>
    );
  }

  if (token.isError) {
    <View style={styles.container}>
      <ErrorMessage message="Error while getting the a token."/>
    </View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FullSizeImage" component={FullSizeImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
