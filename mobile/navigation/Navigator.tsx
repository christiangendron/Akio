import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/Settings';
import Details from '../screens/Details';
import Community from '../screens/Community';
import AppTheme from '../styles/AppTheme';
import Overview from '../screens/Overview';
import Communities from '../screens/Communities';
import { StackParams, TabParams } from '../types/Navigator';
import Account from '../screens/Account';
import RegisterScreen from '../screens/Register';
import Generate from '../screens/Generate';

const HomeStack = createStackNavigator<StackParams>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Community" component={Community} initialParams={{ name: 'Home', id: 0 }}/>
      <HomeStack.Screen name="Details" component={Details} />
      <HomeStack.Screen name="Overview" component={Overview} />
      <SearchStack.Screen name="Generate" component={Generate} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator<StackParams>();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Communities" component={Communities} />
      <SearchStack.Screen name="Details" component={Details} />
      <SearchStack.Screen name="Overview" component={Overview} />
      <SearchStack.Screen name="Community" component={Community} />
      <SearchStack.Screen name="Generate" component={Generate} />
    </SearchStack.Navigator>
  );
}

const AccountStack = createStackNavigator<StackParams>();

function AccountStackScreen() {
  return (
    <SearchStack.Navigator>
      <AccountStack.Screen name="AccountHome" component={Account} />
      <SearchStack.Screen name="Settings" component={Settings} />
      <SearchStack.Screen name="Register" component={RegisterScreen} />
    </SearchStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabParams>();

export default function App() {

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
            title: 'Communities',
          }} />
        <Tab.Screen name="Account" 
        component={AccountStackScreen} 
        options={{
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: AppTheme.lightgray,
  },
});
