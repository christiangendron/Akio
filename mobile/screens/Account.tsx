import { View, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Login from '../components/account/Login';
import { AuthContext } from '../context/AuthContext';
import Logged from '../components/account/Logged';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import { Ionicons } from '@expo/vector-icons'; 
import { useColorScheme } from 'nativewind';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Register from '../components/account/Register';
import Icon from '../components/shared/Icon';

type AccountScreenProps = {
  route: {
    params: {
      showRegister: boolean;
      showSettings: boolean
    }
  }
};

export default function Account(props: AccountScreenProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const authContext = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(props.route.params.showRegister);
  const { colorScheme } = useColorScheme();

  const settings = <Icon icon={<Ionicons name="ios-settings-outline" size={25} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />} handler={() => navigation.navigate('Settings')} extraStyles='mr-3'/>

  useEffect(() => {
    navigation.setOptions({
      title: authContext.isAuth ? 'Account' : showRegister ? 'Register' : 'Login',
      headerRight: () => (
        props.route.params.showSettings ? settings : null
      ),
    });
  }, [navigation, authContext.isAuth, colorScheme, showRegister]);

  if (authContext.isAuth) return (
    <View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
      <ScrollView className='flex w-full'>
        <Logged />
      </ScrollView>
    </View>
  )

  const view = showRegister ? <Register /> : <Login />
  const text = showRegister ? 'You have an account ? Login' : 'No account ? Register'

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className='bg-background dark:bg-backgroundDark'>
      <KeyboardAvoidingView className='flex flex-1 justify-center items-center' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <MaterialCommunityIcons name="account" size={100} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
        {view}
        <TouchableOpacity onPress={() => setShowRegister(!showRegister)} className='mt-5'>
          <Text className='text-center dark:text-white'>{text}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
