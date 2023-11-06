import { View, Platform, Button, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import AppTheme from '../styles/AppTheme';
import { useNavigation } from '@react-navigation/native';
import Login from '../components/account/Login';
import Register from '../components/account/Register';
import { AuthContext } from '../context/AuthContext';
import Logged from '../components/account/Logged';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';

export default function Account() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [state, setState] = useState('login');
  const authContext = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
      title: 'Account',
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
  }, [navigation]);

  const LoginOrRegister = state == 'login' ? <Login /> : <Register />;
  const LoginOrRegisterButton = state == 'login' ? <Button title='Register' onPress={() => setState('register')} /> : <Button title='Login' onPress={() => setState('login')}/>;

  if (authContext.isAuth) return (
    <View className='flex flex-1 justify-center items-center'>
      <Logged />
    </View>
  )

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <KeyboardAvoidingView className='flex flex-1 justify-center items-center' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {LoginOrRegisterButton}
        {LoginOrRegister}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
