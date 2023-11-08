import { View, Text, ScrollView} from 'react-native';
import { useContext, useEffect } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import AppTheme from '../styles/AppTheme';
import { useNavigation } from '@react-navigation/native';
import MenuItem from '../components/items/MenuItem';

export default function Settings() {
  const settings = useContext(SettingsContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Settings',
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
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
    <View className='flex flex-1 justify-center items-center'>
      <ScrollView className='flex w-full mt-1'>      
        <MenuItem withSwitch={true} label='Show author' current={settings.showUsername} handler={() => settings?.setShowUsername(!settings.showUsername)}/>
        <MenuItem withSwitch={true} label='Show community' current={settings.showCommunity} handler={() => settings?.setShowCommunity(!settings.showCommunity)}/>
        <MenuItem withSwitch={true} label='Show options' current={settings.showOptions} handler={() => settings?.setShowOptions(!settings.showOptions)}/>
        <MenuItem withSwitch={true} label='Show search' current={settings.searchBar} handler={() => settings?.setSearchBar(!settings.searchBar)}/>
      </ScrollView>
    </View>
  );
}
