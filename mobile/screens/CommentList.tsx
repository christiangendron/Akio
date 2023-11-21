
import { View } from 'react-native';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import Post, { PostProps } from '../components/items/Post';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { StackParams } from '../types/Navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GenerateModal from '../components/modal/GenerateModal';
import CustomFlatList from '../components/shared/CustomFlatList';
import SwipeableDelete from '../components/shared/SwipeableDelete';
import Comment from '../components/items/Comment';

type CommentListNavigationProps = {
	route: {
		params: PostProps;
	}
};

/**
 * CommentList screen: used to show the comments of a post.
 * @param props CommentListNavigationProps
 * @returns JSX.Element
 */
export default function CommentList(props: CommentListNavigationProps) {
	const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
	const authContext = useContext(AuthContext);

	const queryKey = `comment-${props.route.params.id}`;
	const query = useQuery({queryKey: [queryKey],queryFn: () => AkioServices.getComments(props.route.params.id),});

	useEffect(() => {
		navigation.setOptions({
		headerRight: () => (<GenerateModal type="comment" id={props.route.params.id} keyToInvalidate={queryKey} />),
		});
	}, [navigation, authContext.isAuth]);

	const renderItem = ({ item }: { item: any }): JSX.Element => {
		return <SwipeableDelete 
			id={item.id} 
			user_id={item.user_id} 
			type='comment' 
			keyToInvalidate={queryKey} 
			component={<Comment key={item.id} {...item} />}
		/>
	};

	return (
		<View className='flex flex-1 justify-center items-center bg-background dark:bg-backgroundDark'>
			<CustomFlatList 
				type='comment' 
				data={query.data ? query.data : []} 
				renderItem={renderItem}
				isLoading={query.isLoading || query.isFetching}
				reFetch={query.refetch} 
				isError={query.isError} 
				keyToInvalidate={queryKey}
				headerComponent={<Post {...props.route.params} />}
				currentPost={{...props.route.params}}
			/>
		</View>
	);
}