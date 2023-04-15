import { View, Text, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TokenServices from '../services/TokenServices';
import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import Setting from '../components/items/Setting';

export default function Settings() {
  const settings = useContext(SettingsContext);

  if (settings == null) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className='flex flex-1 justify-center items-center'>
      <ScrollView className='flex w-full'>      
        <Text className='mt-20 text-lg ml-3'>Apperence settings</Text>
        <Setting label='Remove sticked post' current={settings.skipPinned} handler={() => settings?.setSkipPinned(!settings.skipPinned)}/>
        <Text className='mt-20 text-lg ml-3'>Developpement</Text>
        <TouchableOpacity
          onPress={() => TokenServices.clearToken()}
          className='bg-primary rounded-lg p-2 mt-5'
        >
        <Text>Clear token</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => TokenServices.setExpiredToken()}
        className='bg-primary rounded-lg p-2 mt-5'
        >
        <Text>Set expired token</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
