import { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { useQuery } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import RedditServices from '../services/RedditServices';
import { useNavigation } from '@react-navigation/native';
import FilterBox from '../components/FilterBox';
import Post from '../components/items/Post';
import SearchBarComp from '../components/SearchBarComp';
import NoPostsFound from '../components/NoPostsFound';
import { RedditResponseT3 } from '../types/RedditResponseT3';
import { RedditResponseRoot } from '../types/RedditResponseRoot';

export default function Home() {
  const [filter, setFilter] = useState('hot');
  const [keyword, setKeyword] = useState('');
  const navigation = useNavigation();

  const posts = useQuery(`posts-all-${filter}`, () => RedditServices.getPosts('all', keyword, filter));

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
    posts.refetch();
  }, [filter]);

  if (posts.isLoading) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ActivityIndicator />
      </View>
    );
  }

  if (posts.isError) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ErrorMessage message="Error while getting posts." action={posts.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const redditResponse = posts?.data as RedditResponseRoot;
  const postsData = redditResponse.data.data.children as RedditResponseT3[];

  const renderItem = ({ item }: { item: RedditResponseT3 }): JSX.Element => {
    return <Post key={item.data.id} data={item} />;
  };

  const searchBarData = {
    keyword: keyword,
    handleChange: setKeyword,
    handleSubmit: posts.refetch,
  }

  return (
    <View className='flex flex-1 justify-center items-center'>
      <FlatList
        data={postsData}
        renderItem={renderItem}
        refreshing={posts.isLoading}
        ItemSeparatorComponent={() => <View className='h-2' />}
        onRefresh={posts.refetch}
        ListEmptyComponent={<NoPostsFound />}
        ListHeaderComponent={<SearchBarComp data={searchBarData} />}
      />
    </View>
  );
}