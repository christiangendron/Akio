import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { useQuery } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import RedditServices from '../services/RedditServices';
import { useNavigation } from '@react-navigation/native';
import FilterBox from '../components/FilterBox';
import PostItem from '../components/PostItem';
import SearchBarComp from '../components/SearchBarComp';
import NoPostsFound from '../components/NoPostsFound';
import { RedditResponseT3 } from '../types/RedditResponseT3';
import { RedditAccessTokenResponse } from '../types/AuthContext';
import { RedditResponseRoot } from '../types/RedditResponseRoot';

export default function Home() {
  const authContext = useContext(AuthContext);
  const [filter, setFilter] = useState('hot');
  const [keyword, setKeyword] = useState('');
  const navigation = useNavigation();
  const redditAccessToken = authContext?.token.data as RedditAccessTokenResponse;

  const posts = useQuery(`posts-all-${filter}`, () => RedditServices.getPosts('all', keyword, filter, redditAccessToken.data.access_token));

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
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (posts.isError) {
    return (
      <View style={styles.container}>
        <ErrorMessage message="Error while getting posts." action={posts.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const redditResponse = posts?.data as RedditResponseRoot;
  const postsData = redditResponse.data.data.children as RedditResponseT3[];

  const renderItem = ({ item }: { item: RedditResponseT3 }): JSX.Element => {
    return <PostItem key={item.data.id} data={item.data} />
  };

  const searchBarData = {
    keyword: keyword,
    handleChange: setKeyword,
    handleSubmit: posts.refetch,
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppTheme.lightgray,
    flex: 1,
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
    width: '100%',
  },
});
