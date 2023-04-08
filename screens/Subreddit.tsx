import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import ErrorMessage from '../components/ErrorMessage';
import FilterBox from '../components/FilterBox';
import NoPostsFound from '../components/NoPostsFound';
import Post from '../components/items/Post';
import SearchBarComp from '../components/SearchBarComp';
import { AuthContext } from '../context/AuthContext';
import RedditServices from '../services/RedditServices';
import { SubredditProps } from '../types/Subreddit';
import { RedditAccessTokenResponse } from '../types/AuthContext';
import { RedditResponseRoot } from '../types/RedditResponseRoot';
import { RedditResponseT3 } from '../types/RedditResponseT3';

export default function Subreddit(props: SubredditProps) {
  const authContext = useContext(AuthContext);
  const [filter, setFilter] = useState('hot');
  const [keyword, setKeyword] = useState('');
  const subreddit = props.route.params.data;
  const redditAccessToken = authContext?.token.data as RedditAccessTokenResponse;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: subreddit,
      headerRight: () => (
        <FilterBox data={{ filter, setFilter }} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    posts.refetch();
  }, [filter]);

  const posts = useQuery(`posts-${subreddit}-${filter}`, () => RedditServices.getPosts(subreddit, keyword, filter, redditAccessToken.data.access_token));

  if (posts.isLoading) {
    return (
      <View className='flex flex-1 items-center justify-center'>
        <ActivityIndicator />
      </View>
    );
  }

  if (posts.isError) {
    return (
      <View className='flex flex-1'>
        <ErrorMessage message="Error while getting posts." action={posts.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const redditResponse = posts?.data as RedditResponseRoot;
  const postsData = redditResponse.data.data.children as RedditResponseT3[];

  const renderItem = ({ item }: { item: RedditResponseT3 }): JSX.Element => {
    return <Post key={item.data.id} data={item.data} />
  };

  const searchBarData = {
    keyword: keyword,
    handleChange: setKeyword,
    handleSubmit: posts.refetch,
  }

  return (
    <View className='flex flex-1'>
      <FlatList
        data={postsData}
        renderItem={renderItem}
        refreshing={posts.isLoading}
        onRefresh={posts.refetch}
        ListEmptyComponent={<NoPostsFound />}
        ListHeaderComponent={<SearchBarComp data={searchBarData} />}
      />
    </View>
  );
}