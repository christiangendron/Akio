import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import AppTheme from '../styles/AppTheme';
import { useNavigation } from '@react-navigation/native';

export default function Account() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Account',
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
    });
  }, [navigation]);
  
  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text className='text-sm'>Sign in.</Text>
      <TouchableOpacity
        onPress={() => console.log('login')}
        className='bg-primary rounded-lg p-2 mt-5'
        >
        <Text>Sign in with Reddit</Text>
      </TouchableOpacity>
      <Text className='text-red my-5'>{errorMessage}</Text>
    </View>
  );
}
