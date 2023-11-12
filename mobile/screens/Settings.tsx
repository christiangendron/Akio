import { View, Text, ScrollView} from 'react-native';
import { useContext, useEffect } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { useNavigation } from '@react-navigation/native';
import MenuItem from '../components/items/MenuItem';
import { useColorScheme } from 'nativewind';

export default function Settings() {
  const settings = useContext(SettingsContext);
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(() => {
    navigation.setOptions({
      title: 'Settings',
    });
  }, [navigation]);

  if (settings == null) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
      <ScrollView className='flex w-full mt-1'>      
        <MenuItem withSwitch={true} label='Show author' current={settings.showUsername} handler={() => settings?.setShowUsername(!settings.showUsername)} extraStyles=' mt-1 mx-2'/>
        <MenuItem withSwitch={true} label='Show community' current={settings.showCommunity} handler={() => settings?.setShowCommunity(!settings.showCommunity)} extraStyles=' mt-2 mx-2'/>
        <MenuItem withSwitch={true} label='Show options' current={settings.showOptions} handler={() => settings?.setShowOptions(!settings.showOptions)} extraStyles=' mt-2 mx-2'/>
        <MenuItem withSwitch={true} label='Show search' current={settings.searchBar} handler={() => settings?.setSearchBar(!settings.searchBar)} extraStyles=' mt-2 mx-2' />
        <MenuItem withSwitch={true} label='Dark mode' current={colorScheme === 'dark'} handler={toggleColorScheme} extraStyles=' mt-2 mx-2'/>
      </ScrollView>
    </View>
  );
}
