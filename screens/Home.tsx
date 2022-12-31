import { useContext, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AppTheme from '../styles/AppTheme';
import { useQuery } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import RedditServices from '../services/RedditServices';
import PostFeed from '../components/PostFeed';
import { useNavigation } from '@react-navigation/native';
import FilterBox from '../components/FilterBox';

export default function Home({ }) {
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'r/all',
      headerRight: () => (
        <FilterBox />
      ),
    });
  }, [navigation]);

  const posts = useQuery('posts-all', () => RedditServices.getPosts('all', token.data.data.access_token));

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

  return (
    <View style={styles.container}>
      <PostFeed data={postsData} action={posts.refetch} isLoading={posts.isLoading} />
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
});
