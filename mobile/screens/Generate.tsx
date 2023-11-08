import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import AppTheme from '../styles/AppTheme';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import GenerateButton from '../components/GenerateButton';
import { AuthContext } from '../context/AuthContext';
import NotAuth from '../components/account/NotAuth';

type GenerateNavigationProps = {
  route: {
    params: {
      type: string;
      id: number;
      invalidate: string;
    }
  }
}

export default function Generate(props: GenerateNavigationProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [inspiration, setInspiration] = useState('');
  const authContext = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
      title: 'Generate',
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
    });
  }, [navigation]);

  if (!authContext.isAuth) return (
    <NotAuth />
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <KeyboardAvoidingView className='flex flex-1 justify-center items-center' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text className='text-center text-lg mb-3'>Generate a {props.route.params.type}</Text>
        <View className='w-full'>
          <CustomInput placeholder='Inspiration for the generation (optional)' onChangeText={setInspiration} value={inspiration} isError={false} />
          <GenerateButton id={props.route.params.id} type={props.route.params.type} inspiration={inspiration} onComplete={() => navigation.goBack()} keyToInvalidate={props.route.params.invalidate} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
