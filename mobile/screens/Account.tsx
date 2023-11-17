import { View, TouchableOpacity, Text} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Login from '../components/account/Login';
import { AuthContext } from '../context/AuthContext';
import Logged from '../components/account/Logged';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import { Ionicons } from '@expo/vector-icons'; 
import { useColorScheme } from 'nativewind';
import Register from '../components/account/Register';
import Icon from '../components/shared/Icon';
import { ScrollView } from 'react-native-gesture-handler';

type AccountScreenProps = {
	route: {
		params: {
			showRegister: boolean;
			showSettings: boolean
		}
	}
};

export default function Account(props: AccountScreenProps) {
	const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
	const authContext = useContext(AuthContext);
	const [showRegister, setShowRegister] = useState(props.route.params.showRegister);
	const { colorScheme } = useColorScheme();

	const settingButton = <Icon 
		icon={<Ionicons name="ios-settings-outline" size={25} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />} 
		handler={() => navigation.push('Settings')} 
		extraStyles='mr-3' 
	/>

	useEffect(() => {
		navigation.setOptions({
			title: authContext.isAuth ? 'Account' : showRegister ? 'Register' : 'Login',
			headerRight: () => (props.route.params.showSettings ?  settingButton : null),
		});
	}, [navigation, authContext.isAuth, colorScheme, showRegister]);

	if (authContext.isAuth) return (
		<ScrollView className='bg-background dark:bg-backgroundDark'>
			<Logged />
		</ScrollView>
	)

	return (
		<View className='flex flex-1 bg-background dark:bg-backgroundDark'>
			<ScrollView>
				{showRegister ? <Register /> : <Login />}
				<TouchableOpacity onPress={() => setShowRegister(!showRegister)} className='mt-5'>
					<Text className='text-center dark:text-white'>
						{showRegister ? 'You have an account ? Login' : 'No account ? Register'}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}
