import { useContext } from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { useQuery } from 'react-query';
import ErrorMessage from '../components/ErrorMessage';
import Feed from '../components/Feed';
import { AuthContext } from '../context/AuthContext';
import RedditPosts from '../services/RedditPost';
import AppTheme from '../styles/AppTheme';

interface SubredditProps {
  route: {
    params: {
      data: string;
    }
  }
}

export default function Subreddit(props:SubredditProps) {
  const {token} = useContext(AuthContext);

  const posts = useQuery('posts-all', () => RedditPosts.getPosts(props.route.params.data, token.data.data.access_token));

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
  flatlist: {
    flex: 1,
    width: '100%',
  },
});