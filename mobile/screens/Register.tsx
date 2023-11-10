import { Platform, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import Register from '../components/account/Register';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useColorScheme } from 'nativewind';

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    navigation.setOptions({
      title: 'Register',
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className='bg-background dark:bg-backgroundDark'>
      <KeyboardAvoidingView className='flex flex-1 justify-center items-center mb-5' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <MaterialCommunityIcons name="account-edit" size={100} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
        <Register onComplete={() => navigation.pop()}/>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
