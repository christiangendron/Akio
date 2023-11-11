import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/Settings';
import Details from '../screens/Details';
import Community from '../screens/Community';
import Overview from '../screens/Overview';
import Communities from '../screens/Communities';
import { StackParams, TabParams } from '../types/Navigator';
import Account from '../screens/Account';
import { useColorScheme } from 'nativewind';
import { Ionicons } from '@expo/vector-icons'; 

const HomeStack = createStackNavigator<StackParams>();

function HomeStackScreen() {
  const { colorScheme } = useColorScheme();
  
  return (
    <HomeStack.Navigator
      screenOptions={{
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: colorScheme === 'dark' ? '#181818' : '#ffffff',
      },
      headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
      }}>
      <HomeStack.Screen name="Community" component={Community} initialParams={{ name: 'Home', id: 0 }}/>
      <HomeStack.Screen name="Details" component={Details} />
      <HomeStack.Screen name="Overview" component={Overview} />
      <HomeStack.Screen name="Account" component={Account} />
    </HomeStack.Navigator>
  );
}

const CommunitiesStack = createStackNavigator<StackParams>();

function SearchStackScreen() {
  const { colorScheme } = useColorScheme();

  return (
    <CommunitiesStack.Navigator
      screenOptions={{
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: colorScheme === 'dark' ? '#181818' : '#ffffff',
      },
      headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
      }}>
      <CommunitiesStack.Screen name="Communities" component={Communities} />
      <CommunitiesStack.Screen name="Details" component={Details} />
      <CommunitiesStack.Screen name="Overview" component={Overview} />
      <CommunitiesStack.Screen name="Community" component={Community} />
      <CommunitiesStack.Screen name="Account" component={Account} />
    </CommunitiesStack.Navigator>
  );
}

const AccountStack = createStackNavigator<StackParams>();

function AccountStackScreen() {
  const { colorScheme } = useColorScheme();

  return (
    <AccountStack.Navigator
      screenOptions={{
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: colorScheme === 'dark' ? '#181818' : '#ffffff',
      },
      headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
      }}>
      <AccountStack.Screen name="AccountHome" component={Account} initialParams={{ showRegister: false, showSettings: true }} />
      <AccountStack.Screen name="Settings" component={Settings} />
    </AccountStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabParams>();

export default function App() {
  const { colorScheme } = useColorScheme();
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? '#181818' : '#ffffff',
            borderTopWidth:0
          }
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              focused ? <View className='mt-3'><Ionicons name="ios-home-sharp" size={25} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} /></View>
               : <View className='mt-3'><Ionicons name="ios-home-outline" size={25} color={colorScheme === 'dark' ? '#ffffff' : '#000000'}  /></View>
            ),
            title: 'Home',
          }} />
        <Tab.Screen
          name="SearchStack"
          component={SearchStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              focused ? <View className='mt-3'><Ionicons name="ios-list-circle" size={25} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} /></View>
               : <View className='mt-3'><Ionicons name="ios-list-circle-outline" size={25} color={colorScheme === 'dark' ? '#ffffff' : '#000000'}  /></View>
            ),
            title: 'Communities',
          }} />
        <Tab.Screen name="Account" 
        component={AccountStackScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <View className='mt-3'><Ionicons name="ios-person-sharp" size={25} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} /></View>
            : <View className='mt-3'><Ionicons name="ios-person-outline" size={25} color={colorScheme === 'dark' ? '#ffffff' : '#000000'}  /></View>
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};