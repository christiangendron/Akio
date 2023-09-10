import { View, Text, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useContext, useEffect } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import Setting from '../components/items/Setting';
import AppTheme from '../styles/AppTheme';
import { useNavigation } from '@react-navigation/native';

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
      <ScrollView className='flex w-full'>      
        <Text className='text-lg ml-3'>Appearance settings</Text>
        <Setting label='Remove sticked post' current={settings.skipPinned} handler={() => settings?.setSkipPinned(!settings.skipPinned)}/>
        <Setting label='Always show author' current={settings.showUserName} handler={() => settings?.setShowUserName(!settings.showUserName)}/>
        <Setting label='Always show subreddit' current={settings.showSubReddit} handler={() => settings?.setShowSubReddit(!settings.showSubReddit)}/>
        <Setting label='Minimal browsing' current={settings.minimalBrowsing} handler={() => settings?.setMinimalBrowsing(!settings.minimalBrowsing)}/>
        <Setting label='Show search bar' current={settings.searchBar} handler={() => settings?.setSearchBar(!settings.searchBar)}/>
      </ScrollView>
    </View>
  );
}
