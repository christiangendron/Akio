import { View, Platform, Button, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image, Text} from 'react-native';
import { useContext, useEffect } from 'react';
import AppTheme from '../styles/AppTheme';
import { useNavigation } from '@react-navigation/native';
import Login from '../components/account/Login';
import { AuthContext } from '../context/AuthContext';
import Logged from '../components/account/Logged';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';

export default function Account() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
      title: authContext.isAuth ? 'Account' : 'Login',
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image source={require('../assets/icons/settings.png')} className='h-5 w-5 mr-3'/>
        </TouchableOpacity>
      ),
    });
  }, [navigation, authContext.isAuth]);

  if (authContext.isAuth) return (
    <View className='flex flex-1 justify-center items-center'>
      <ScrollView className='flex w-full'>
        <Logged />
      </ScrollView>
    </View>
  )

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <KeyboardAvoidingView className='flex flex-1 justify-center items-center' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Image source={require('../assets/icons/account.png')} className='h-20 w-20 mb-5'/>
        <Login />
        <TouchableOpacity onPress={() => navigation.navigate('Register')} className='mt-5'>
          <Text className='text-center'>No account ? Register.</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
