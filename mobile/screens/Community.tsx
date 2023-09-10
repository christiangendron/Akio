import { useEffect, useRef } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { useQuery } from 'react-query';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigation } from '@react-navigation/native';
import Post from '../components/items/Post';
import NoPostsFound from '../components/NoPostsFound';
import { SubredditProps } from '../types/Subreddit';
import AkioServices from '../services/AkioServices';
import { PostProps } from '../types/Post';

export default function Community(props: SubredditProps) {
  const community = useRef(props.route.params.name);
  const community_id = useRef(props.route.params.id);

  const navigation = useNavigation();

  const query = useQuery({
    queryKey: ['posts', community],
    queryFn: () => AkioServices.getPosts(community.current),
  });

  useEffect(() => {
    navigation.setOptions({
      title: community.current,
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
    });
  }, [navigation]);
  
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

  const renderItem = ({ item }: { item: PostProps }): JSX.Element => {
    return <Post key={item.id} {...item} />;
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
        ListEmptyComponent={<NoPostsFound />}
      />
    </View>
  );
}