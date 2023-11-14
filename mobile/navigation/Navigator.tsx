import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/Settings';
import { StackParams, TabParams } from '../types/Navigator';
import Account from '../screens/Account';
import { useColorScheme } from 'nativewind';
import { Ionicons } from '@expo/vector-icons'; 
import List from '../screens/PostsList';
import Details from '../screens/CommentList';
import CommunityList from '../screens/CommunityList';

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
      <HomeStack.Screen name="Community" component={List} initialParams={{ name: 'Home', id: 0, type: 'post', withSearch: true }}/>
      <HomeStack.Screen name="Details" component={Details} />
      <HomeStack.Screen name="Overview" component={List} />
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
      <CommunitiesStack.Screen name="Communities" component={CommunityList} initialParams={{ name: 'Communities', id: 0, type: 'community' }}/>
      <CommunitiesStack.Screen name="Details" component={Details} />
      <CommunitiesStack.Screen name="Overview" component={List} />
      <CommunitiesStack.Screen name="Community" component={List} />
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
      <AccountStack.Screen name="Details" component={Details} />
      <AccountStack.Screen name="Overview" component={List} />
      <CommunitiesStack.Screen name="Community" component={List} />
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