import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Switch} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import AppTheme from '../styles/AppTheme';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/shared/CustomInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import GenerateButton from '../components/shared/GenerateButton';
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
  const [withImage, setWithImage] = useState(false);

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

  const withImageOption = <View className='flex flex-row bg-gray-200 p-3 justify-between items-center mb-1'>
    <View>
      <Text className='text-lg'>Generate with an image</Text>
      <Text className='text-xsm text-gray-400'>Takes much longer...</Text>
    </View>
    <Switch value={withImage} onValueChange={() => setWithImage(!withImage)}/>
  </View>

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <KeyboardAvoidingView className='flex flex-1 justify-center items-center' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text className='text-center text-lg mb-3'>Generate a {props.route.params.type}</Text>
        <View className='w-full'>
          <CustomInput placeholder='Inspiration for the generation (optional)' onChangeText={setInspiration} value={inspiration} isError={false} />
          {props.route.params.type === 'post' || props.route.params.type === 'community' ? withImageOption: null}
          <GenerateButton 
            id={props.route.params.id} 
            type={props.route.params.type} 
            inspiration={inspiration} 
            onComplete={() => navigation.goBack()}
            with_image={withImage} 
            keyToInvalidate={props.route.params.invalidate} 
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
