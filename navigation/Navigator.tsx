import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import { ActivityIndicator, View, StyleSheet, Image, Button } from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import { AuthContext } from '../context/AuthContext';
import FullSizeImage from '../screens/FullSizeImage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/Settings';
import Details from '../screens/Details';
import Subreddit from '../screens/Subreddit';
import Account from '../screens/Account';
import AppTheme from '../styles/AppTheme';
import Overview from '../screens/Overview';
import Search from '../screens/Search';
import { StackParams, TabParams } from '../types/Navigator';

const HomeStack = createStackNavigator<StackParams>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Details" component={Details} />
      <HomeStack.Screen name="Overview" component={Overview} />
      <HomeStack.Screen name="FullSizeImage" component={FullSizeImage} />
      <HomeStack.Screen name="Subreddit" component={Subreddit} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator<StackParams>();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="Details" component={Details} />
      <SearchStack.Screen name="Overview" component={Overview} />
      <SearchStack.Screen name="FullSizeImage" component={FullSizeImage} />
      <SearchStack.Screen name="Subreddit" component={Subreddit} />
    </SearchStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabParams>();

export default function App() {
  const authcontext = useContext(AuthContext);

  if (authcontext?.token.isLoading) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ActivityIndicator />
      </View>
    );
  }

  if (authcontext?.token.isError) {
    <View className='flex flex-1 justify-center items-center'>
      <ErrorMessage message="Error while getting the a token." actionMessage="Try again" action={authcontext?.token.refetch} />
    </View>;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tab,
          tabBarActiveTintColor: AppTheme.black,
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              focused ? <Image
              className='w-5 h-5 mt-5'
                source={require('../assets/icons/home-selected.png')}
              /> : <Image
              className='w-5 h-5 mt-5'
                source={require('../assets/icons/home.png')}
              />
            ),
            title: 'Home',
          }} />
        <Tab.Screen name="Account" component={Account} options={{
          tabBarIcon: ({ focused }) => (
            focused ? <Image
            className='w-5 h-5 mt-5'
              source={require('../assets/icons/account-selected.png')}
            /> : <Image
            className='w-5 h-5 mt-5'
              source={require('../assets/icons/account.png')}
            />
          ),
        }} />
        <Tab.Screen
          name="SearchStack"
          component={SearchStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              focused ? <Image
              className='w-5 h-5 mt-5'
                source={require('../assets/icons/search-selected.png')}
              /> : <Image
                className='w-5 h-5 mt-5'
                source={require('../assets/icons/search.png')}
              />
            ),
            title: 'Search',
          }} />
        <Tab.Screen name="Settings" component={Settings} options={{
          tabBarIcon: ({ focused }) => (
            focused ? <Image
            className='w-5 h-5 mt-5'
              source={require('../assets/icons/settings-selected.png')}
            /> : <Image
            className='w-5 h-5 mt-5'
              source={require('../assets/icons/settings.png')}
            />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: AppTheme.lightgray,
  },
});
