import { useContext } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import ErrorMessage from '../components/ErrorMessage';
import { AuthContext } from '../context/AuthContext';
import RedditServices from '../services/RedditServices';
import AppTheme from '../styles/AppTheme';

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
      <Text>Details for : {curr.title}</Text>
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
