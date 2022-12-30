import { useContext } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import CommentFeed from '../components/CommentFeed';
import ErrorMessage from '../components/ErrorMessage';
import PostItem from '../components/PostItem';
import { AuthContext } from '../context/AuthContext';
import RedditServices from '../services/RedditServices';
import AppTheme from '../styles/AppTheme';
import { PostProp } from '../types/PostProp';

export type DetailsScreenProps = {
  route: {
    params: {
      data: string;
    }
  }
}

export default function Details(props: DetailsScreenProps) {
  const { token } = useContext(AuthContext);

  const posts = useQuery(`post-${props.route.params.data}`, () => RedditServices.getPost(props.route.params.data, token.data.data.access_token));

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

  const curr = posts.data?.data.data.children[0].data

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>{curr.title}</Text>
        <Text>by {curr.author}</Text>
        <CommentFeed data={props.route.params.data} />
      </View>
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
