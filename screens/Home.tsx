import { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { useInfiniteQuery } from 'react-query';
import ErrorMessage from '../components/ErrorMessage';
import RedditServices from '../services/RedditServices';
import { useNavigation } from '@react-navigation/native';
import FilterBox from '../components/FilterBox';
import Post from '../components/items/Post';
import SearchBarComp from '../components/SearchBarComp';
import NoPostsFound from '../components/NoPostsFound';
import { RedditResponseT3 } from '../types/RedditResponseT3';

export default function Home() {
  const [filter, setFilter] = useState('hot');
  const [keyword, setKeyword] = useState('');
  const last = useRef('');
  const navigation = useNavigation();

  const query = useInfiniteQuery(`posts-all-${filter}`, () => RedditServices.getPosts('all', keyword, filter, last.current), {
    getNextPageParam: (lastPage) => lastPage[lastPage.length - 1].data.name,
  });

  useEffect(() => {
    navigation.setOptions({
      title: 'r/all',
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
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

  const renderItem = ({ item }: { item: RedditResponseT3 }): JSX.Element => {
    return <Post key={item.data.id} data={item} />;
  };

  const searchBarData = {
    keyword: keyword,
    handleChange: setKeyword,
    handleSubmit: query.refetch,
  }

  last.current = query.data?.pages[query.data?.pages.length - 1][query.data?.pages[query.data?.pages.length - 1].length - 1].data.name ?? '';

  return (
    <View className='flex flex-1 justify-center items-center'>
      <FlatList
        data={query.data?.pages.flatMap(page => page)}
        renderItem={renderItem}
        refreshing={query.isLoading}
        onEndReached={() => query.fetchNextPage()}
        ItemSeparatorComponent={() => <View className='h-2' />}
        onRefresh={query.refetch}
        ListEmptyComponent={<NoPostsFound />}
        ListHeaderComponent={<SearchBarComp data={searchBarData} />}
      />
    </View>
  );
}