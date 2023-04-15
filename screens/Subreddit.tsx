import { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { useContext } from 'react';
import { useInfiniteQuery } from 'react-query';
import ErrorMessage from '../components/ErrorMessage';
import RedditServices from '../services/RedditServices';
import { useNavigation } from '@react-navigation/native';
import FilterBox from '../components/FilterBox';
import Post from '../components/items/Post';
import SearchBarComp from '../components/SearchBarComp';
import NoPostsFound from '../components/NoPostsFound';
import { RedditResponseT3 } from '../types/RedditResponseT3';
import { SubredditProps } from '../types/Subreddit';
import { SettingsContext } from '../context/SettingsContext';

export default function Subreddit(props: SubredditProps) {
  const subreddit = useRef(props.route.params.data);
  const [keyword, setKeyword] = useState('');
  const last = useRef('');
  const filter = useRef('best');
  const navigation = useNavigation();
  const settings = useContext(SettingsContext);

  
  const query = useInfiniteQuery({
    queryKey: ['posts', subreddit, filter.current, keyword],
    queryFn: (lastPostName) => RedditServices.getPosts(subreddit.current, filter.current, keyword, lastPostName.pageParam),
    getNextPageParam: (lastPage) => last.current = lastPage[lastPage.length - 1].data.name
  });

  useEffect(() => {
    navigation.setOptions({
      title: subreddit.current,
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
      headerRight: () => (
        <FilterBox filter={filter} refetch={() => query.refetch()}  />
      ),
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

  const renderItem = ({ item }: { item: RedditResponseT3 }): JSX.Element => {
    return settings?.skipPinned && item.data.stickied ? <></> : <Post key={item.data.id} data={item} />;
  };

  const searchBarData = {
    keyword: keyword,
    handleChange: setKeyword,
    handleSubmit: query.refetch,
  }

  return (
    <View className='flex flex-1 justify-center items-center'>
      <FlatList
        data={query.data?.pages.flatMap(page => page)}
        renderItem={renderItem}
        refreshing={query.isLoading}
        onEndReached={() => query.fetchNextPage(last.current as any)}
        ItemSeparatorComponent={() => <View className='h-2' />}
        onRefresh={query.refetch}
        onEndReachedThreshold={2}
        ListEmptyComponent={<NoPostsFound />}
        ListHeaderComponent={settings?.searchBar ? <SearchBarComp data={searchBarData} /> : <></>}
      />
    </View>
  );
}