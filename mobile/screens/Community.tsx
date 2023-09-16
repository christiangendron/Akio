import { useEffect, useRef, useState } from 'react';
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
import SearchBarComp from '../components/SearchBarComp';

export default function Community(props: SubredditProps) {
  const community = useRef(props.route.params.name);
  const community_id = useRef(props.route.params.id);
  const [keyword, setKeyword] = useState('');
  const navigation = useNavigation();

  const query = useQuery({
    queryKey: ['posts', community, community_id, keyword],
    queryFn: () => AkioServices.getPosts(community_id.current, keyword),
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
        ItemSeparatorComponent={() => <View className='h-4' />}
        onRefresh={query.refetch}
        onEndReachedThreshold={2}
        ListHeaderComponent={query.data?.length != 0 ? <SearchBarComp keyword={keyword} handleChange={setKeyword} handleSubmit={query.refetch}/> : null}
        ListEmptyComponent={ <NoPostsFound />}
      />
    </View>
  );
}