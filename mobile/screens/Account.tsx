import { View, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image, Text, StatusBar} from 'react-native';
import { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Login from '../components/account/Login';
import { AuthContext } from '../context/AuthContext';
import Logged from '../components/account/Logged';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import { Ionicons } from '@expo/vector-icons'; 
import { useColorScheme } from 'nativewind';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function Account() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const authContext = useContext(AuthContext);
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    navigation.setOptions({
      title: authContext.isAuth ? 'Account' : 'Login',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} className='mr-3'>
          <Ionicons name="ios-settings-outline" size={25} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, authContext.isAuth, colorScheme]);

  if (authContext.isAuth) return (
    <View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
      <ScrollView className='flex w-full'>
        <Logged />
      </ScrollView>
    </View>
  )

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className='bg-background dark:bg-backgroundDark'>
      <KeyboardAvoidingView className='flex flex-1 justify-center items-center' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <MaterialCommunityIcons name="account" size={100} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
        <Login />
        <TouchableOpacity onPress={() => navigation.navigate('Register')} className='mt-5'>
          <Text className='text-center dark:text-white'>No account ? Register.</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
