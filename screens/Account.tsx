import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';

export default function Account() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const settings = {
    clientID: process.env.CLIENT_ID,
    type: 'token',
    randomString: process.env.RANDOM_STRING_FOR_OAUTH,
    uri: 'exp://',
    scope: 'identity',
  }

  console.log(settings)

  async function openAuthSession () {
    setErrorMessage('')

    const res = await WebBrowser.openAuthSessionAsync(`https://www.reddit.com/api/v1/authorize?client_id=${settings.clientID}&response_type=${settings.type}&state=${settings.randomString}&redirect_uri=${settings.uri}&scope=${settings.scope}`) as any;
    
    if (res.error) {
      setErrorMessage('Something went wrong. Please try again.')
    }
    
    console.log(res)
  }

  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text className='text-sm'>Sign in in order to access your Reddit account.</Text>
      <TouchableOpacity
        onPress={() => openAuthSession()}
        className='bg-primary rounded-lg p-2 mt-5'
        >
        <Text>Sign in with Reddit</Text>
      </TouchableOpacity>
      <Text className='text-red my-5'>{errorMessage}</Text>
    </View>
  );
}
