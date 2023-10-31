import { View, Platform, Button, KeyboardAvoidingView} from 'react-native';
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
        <Button
          onPress={() => navigation.navigate('Settings')}
          title="Settings"
        />
      ),
    });
  }, [navigation]);

  const LoginOrRegister = state == 'login' ? <Login /> : <Register />;

  if (authContext.isAuth) return (
    <View className='flex flex-1 justify-center items-center'>
      <Logged />
    </View>
  )

  return (
      <KeyboardAvoidingView className='flex flex-1 justify-center items-center' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className='flex flex-row'>
          <Button title='Login' onPress={() => setState('login')}/>
          <Button title='Register' onPress={() => setState('register')}/>
        </View>
        {LoginOrRegister}
      </KeyboardAvoidingView>
  );
}
