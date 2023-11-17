import { View, Text, ScrollView} from 'react-native';
import { useContext, useEffect } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { useNavigation } from '@react-navigation/native';
import MenuItem from '../components/items/MenuItem';

export default function Settings() {
	const settings = useContext(SettingsContext);
	const navigation = useNavigation();

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
				<MenuItem 
					withSwitch={true} 
					label='Minimal browsing' 
					current={settings.minimalBrowsing} 
					handler={settings?.toggleMinimalBrowsing} 
					extraStyles=' mt-1 mx-2'/>
				<MenuItem 
					withSwitch={true} 
					label='Hide search bar' 
					current={settings.hideSearchBar} 
					handler={settings?.toggleSearchBar} 
					extraStyles=' mt-2 mx-2' />
				<MenuItem 
					withSwitch={true} 
					label='Dark mode' 
					current={settings.darkMode} 
					handler={settings?.toggleDarkMode} 
					extraStyles=' mt-2 mx-2'/>
			</ScrollView>
		</View>
	);
}
