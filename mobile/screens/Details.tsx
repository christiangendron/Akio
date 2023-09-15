
import { ActivityIndicator, FlatList, View } from 'react-native';
import { DetailsScreenProps } from '../types/Details';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import ErrorMessage from '../components/ErrorMessage';
import Comment from '../components/items/Comment';
import { CommentItemProps } from '../types/CommentItem';
import Post from '../components/items/Post';
import NoPostsFound from '../components/NoPostsFound';

export default function Details(props: DetailsScreenProps) {
  const current = props.route.params;
  
  const query = useQuery({
    queryKey: ['comments', current.id],
    queryFn: () => AkioServices.getComments(current.id),
  });

  if (query.isLoading) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ActivityIndicator />
      </View>
    );
  }

  if (query.isError) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ErrorMessage message="Error while getting posts." action={query.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: CommentItemProps }): JSX.Element => {
    return <Comment key={item.id} {...item} />;
  };

  return (
    <View className='flex flex-1 justify-center items-center'>
      <FlatList
        data={query.data}
        renderItem={renderItem}
        refreshing={query.isLoading}
        ItemSeparatorComponent={() => <View className='h-2' />}
        onRefresh={query.refetch}
        onEndReachedThreshold={2}
        ListHeaderComponent={<Post {...current} />}
        ListEmptyComponent={<NoPostsFound />}
      />
    </View>
  );
}