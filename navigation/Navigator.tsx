import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import {AuthContext} from '../context/AuthContext';
import FullSizeImage from '../screens/FullSizeImage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/Settings';
import Details from '../screens/Details';

export type TabParams = {
  HomeStack: StackParams;
  Settings: any;
}

export type StackParams = {
  Home: any;
  Details: any;
  FullSizeImage: {
    data: {
      url: string;
      id: string;
      author_fullname: string;
    };
  }
}

const HomeStack = createStackNavigator<StackParams>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
     <HomeStack.Screen name="Home" component={Home} />
     <HomeStack.Screen name="Details" component={Details} />                          
     <HomeStack.Screen name="FullSizeImage" component={FullSizeImage} />
    </HomeStack.Navigator>
   );
 }

const Tab = createBottomTabNavigator<TabParams>();

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
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeStack" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
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
