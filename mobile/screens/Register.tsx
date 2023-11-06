import { Platform, KeyboardAvoidingView, ScrollView, Image, View, Button} from 'react-native';
import Register from '../components/account/Register';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import { useEffect } from 'react';
import AppTheme from '../styles/AppTheme';


export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  useEffect(() => {
    navigation.setOptions({
      title: 'Register',
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <KeyboardAvoidingView className='flex flex-1 justify-center items-center' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Image source={require('../assets/icons/register.png')} className='h-20 w-20 mb-5'/>
        <Register onComplete={() => navigation.pop()}/>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
