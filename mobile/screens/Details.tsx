
import { ActivityIndicator, FlatList, View } from 'react-native';
import { DetailsScreenProps } from '../types/Details';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import ErrorMessage from '../components/ErrorMessage';
import Comment, { CommentItemProps } from '../components/items/Comment';
import Post from '../components/items/Post';
import NoPostsFound from '../components/NothingFound';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import AppTheme from '../styles/AppTheme';
import GenerateComment from '../components/buttons/GenerateComment';

export default function Details(props: DetailsScreenProps) {
  const navigation = useNavigation();
  const current = props.route.params;
  
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
    });
  }, [navigation]);

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
        ListHeaderComponent={<View className='mb-2'><Post {...current} /></View>}
        ListEmptyComponent={<NoPostsFound type="comments"/>}
        ListFooterComponent={<View className='mt-2'><GenerateComment post_id={current.id} /></View>}
      />
    </View>
  );
}