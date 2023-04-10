import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import ErrorMessage from '../components/ErrorMessage';
import FilterBox from '../components/FilterBox';
import NoPostsFound from '../components/NoPostsFound';
import Post from '../components/items/Post';
import SearchBarComp from '../components/SearchBarComp';
import RedditServices from '../services/RedditServices';
import { SubredditProps } from '../types/Subreddit';
import { RedditResponseT3 } from '../types/RedditResponseT3';

export default function Subreddit(props: SubredditProps) {
  const [filter, setFilter] = useState('hot');
  const [keyword, setKeyword] = useState('');
  const subreddit = props.route.params.data;
  const navigation = useNavigation();
  const last = useRef('');

  const query = useInfiniteQuery(`posts-all-${filter}`, () => RedditServices.getPosts('all', filter, last.current), {
    getNextPageParam: (lastPage) => lastPage[lastPage.length - 1].data.name,
  });

  useEffect(() => {
    navigation.setOptions({
      title: subreddit,
      headerRight: () => (
        <FilterBox data={{ filter, setFilter }} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    query.refetch();
  }, [filter]);

  if (query.isLoading) {
    return (
      <View className='flex flex-1 items-center justify-center'>
        <ActivityIndicator />
      </View>
    );
  }

  if (query.isError) {
    return (
      <View className='flex flex-1'>
        <ErrorMessage message="Error while getting posts." action={query.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: RedditResponseT3 }): JSX.Element => {
    return <Post key={item.data.id} data={item} />
  };

  const searchBarData = {
    keyword: keyword,
    handleChange: setKeyword,
    handleSubmit: query.refetch,
  }

  last.current = query.data?.pages[query.data?.pages.length - 1][query.data?.pages[query.data?.pages.length - 1].length - 1].data.name ?? '';

  return (
    <View className='flex flex-1'>
      <FlatList
        data={query.data?.pages.flatMap(page => page)}
        renderItem={renderItem}
        refreshing={query.isLoading}
        onEndReached={() => query.fetchNextPage()}
        ItemSeparatorComponent={() => <View className='h-2' />}
        onRefresh={query.refetch}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<NoPostsFound />}
        ListHeaderComponent={<SearchBarComp data={searchBarData} />}
      />
    </View>
  );
}