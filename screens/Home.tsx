import {useContext} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import AppTheme from '../styles/AppTheme';
import {useQuery} from 'react-query';
import {AuthContext} from '../context/AuthContext';
import RedditPosts from '../services/RedditPost';
import ErrorMessage from '../components/ErrorMessage';
import Feed from '../components/Feed';

export default function Home() {
  const {token} = useContext(AuthContext);

  const posts = useQuery('posts-all', () => RedditPosts.getPosts('images', token.data.data.access_token));

  if (posts.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
      </View>
    );
  }

  if (posts.isError) {
    return (
      <View style={styles.container}>
        <ErrorMessage message="Error while getting posts." action={posts.refetch} actionMessage="Try again!"/>
      </View>
    );
  }

  const postsData = posts?.data?.data.data.children;

  return (
    <View style={styles.container}>
      <Feed data={postsData} action={posts.refetch} isLoading={posts.isLoading}/>
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
