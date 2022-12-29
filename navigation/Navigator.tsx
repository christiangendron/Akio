import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import {AuthContext} from '../context/AuthContext';
import FullSizeImage from '../screens/FullSizeImage';

export type StackParams = {
  FullSizeImage: {
    data: {
      url: string;
      id: string;
      author_fullname: string;
    };
  }
  Home: any;
}

const Stack = createNativeStackNavigator<StackParams>();

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
      <ErrorMessage message="Error while getting the a token." actionMessage="Try again" action={token.refetch}/>
    </View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FullSizeImage" component={FullSizeImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
