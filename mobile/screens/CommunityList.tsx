import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import AkioServices from '../services/AkioServices';
import { AuthContext } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import GenerateModal from '../components/modal/GenerateModal';
import { useColorScheme } from "nativewind";
import CustomFlatList from '../components/shared/CustomFlatList';
import Community from '../components/items/Community';
import SwipeableDelete from '../components/shared/SwipeableDelete';

/**
 * CommunityList screen: used to show a list of communities.
 * @returns JSX.Element
 */
export default function CommunityList() {
	const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
	const { colorScheme } = useColorScheme();
	const authContext = useContext(AuthContext);

	const queryKey = `community-list`;
	const query = useQuery({queryKey: [queryKey],queryFn: () => AkioServices.getCommunities() });

	useEffect(() => {
		navigation.setOptions({
			title: 'Communities',
			headerRight: () => (<GenerateModal type={'community'} id={0} keyToInvalidate={queryKey} />),
		});
	}, [navigation, authContext.isAuth, colorScheme]);

	const renderItem = ({ item }: { item: any }): JSX.Element => {
		return <SwipeableDelete 
			id={item.id} 
			user_id={item.user_id} 
			type='community' 
			keyToInvalidate={queryKey} 
			component={<Community key={item.id} {...item } />} 
		/>
	};

	return (
		<View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
			<CustomFlatList 
				type={'community'} 
				data={query.data && !query.isError ? query.data : []} 
				renderItem={renderItem}
				isLoading={query.isLoading || query.isFetching} 
				reFetch={query.refetch} 
				isError={query.isError} 
				keyToInvalidate={queryKey}
				headerComponent={null}
			/>
		</View>
	);
}
