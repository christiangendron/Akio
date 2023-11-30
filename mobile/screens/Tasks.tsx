import { View} from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import CustomFlatList from '../components/shared/CustomFlatList';
import TaskItem, { TaskProps } from '../components/items/TaskItem';

/**
 * Tasks screen: shows all tasks from logged user.
 * @returns JSX.Element
 */
export default function Tasks() {
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			title: 'Tasks',
		});
	}, [navigation]);

	const queryKey = `my-tasks`;
	const query = useQuery({queryKey: [queryKey],queryFn: () => AkioServices.getTasks() });

	const renderItem = ({ item }: { item: TaskProps }): JSX.Element => {
		return <TaskItem 
			{...item}
			handler={() => console.log('Clicked on task')}
			extraStyles=' mt-1 mx-2'
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
