import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Account() {

  return (
    <View className='flex flex-col flex-1 justify-center items-center bg-background'>
      <Text className='text-sm'>Sign in in order to access your Reddit account.</Text>
      <TouchableOpacity
        onPress={() => console.log('Open reddit authentification menu')}
        className='bg-primary rounded-lg p-2 mt-5'
        >
        <Text>Sign in with Reddit</Text>
      </TouchableOpacity>
    </View>
  );
}
