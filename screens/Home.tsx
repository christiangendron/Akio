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
import { PostProp } from '../types/PostProp';
import SearchBarComp from '../components/SearchBarComp';

export default function Home({ }) {
  const { token } = useContext(AuthContext);
  const [filter, setFilter] = useState('hot');
  const [keyword, setKeyword] = useState('');
  const navigation = useNavigation();

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

  const posts = useQuery(`posts-all-${filter}`, () => RedditServices.getPosts('all', keyword, filter, token.data.data.access_token));

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

  const postsData = posts?.data?.data.data.children;

  const renderItem = ({ item }: { item: PostProp }): JSX.Element => {
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
