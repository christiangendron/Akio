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
import FilterBox from '../components/FilterBox';

export type TabParams = {
  Home: any;
  HomeStack: StackParams;
  Search: any;
  SearchStack: StackParams;
  Account: any;
  Settings: any;
  Overview: any;
}

export type StackParams = {
  Home: any;
  Details: {
    data: string;
  };
  Overview: {
    data: string;
  };
  FullSizeImage: {
    data: {
      url: string;
      id: string;
      author_fullname: string;
    };
  };
  Subreddit: {
    data: string;
  };
  Search: any;
}

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
  const { token } = useContext(AuthContext);

  if (token.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (token.isError) {
    <View style={styles.container}>
      <ErrorMessage message="Error while getting the a token." actionMessage="Try again" action={token.refetch} />
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
                style={styles.icon}
                source={require('../assets/icons/home-selected.png')}
              /> : <Image
                style={styles.icon}
                source={require('../assets/icons/home.png')}
              />
            ),
            title: 'Home',
          }} />
        <Tab.Screen name="Account" component={Account} options={{
          tabBarIcon: ({ focused }) => (
            focused ? <Image
              style={styles.icon}
              source={require('../assets/icons/account-selected.png')}
            /> : <Image
              style={styles.icon}
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
                style={styles.icon}
                source={require('../assets/icons/search-selected.png')}
              /> : <Image
                style={styles.icon}
                source={require('../assets/icons/search.png')}
              />
            ),
            title: 'Search',
          }} />
        <Tab.Screen name="Settings" component={Settings} options={{
          tabBarIcon: ({ focused }) => (
            focused ? <Image
              style={styles.icon}
              source={require('../assets/icons/settings-selected.png')}
            /> : <Image
              style={styles.icon}
              source={require('../assets/icons/settings.png')}
            />
          ),
        }} />
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
  tab: {
    backgroundColor: AppTheme.lightgray,
  },
  icon: {
    marginTop: 10,
    width: 20,
    height: 20,
  },
});
