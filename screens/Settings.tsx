import { View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TokenServices from '../services/TokenServices';

export default function Settings() {
  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text>Settings</Text>
      <TouchableOpacity
        onPress={() => TokenServices.clearToken()}
        className='bg-primary rounded-lg p-2 mt-5'
        >
        <Text>Clear token</Text>
      </TouchableOpacity>
    </View>
  );
}
