import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import Comment from '../components/items/Comment';
import DetailsHeader from '../components/DetailsHeader';
import ErrorMessage from '../components/ErrorMessage';
import FilterBox from '../components/FilterBox';
import { AuthContext } from '../context/AuthContext';
import RedditServices from '../services/RedditServices';
import AppTheme from '../styles/AppTheme';
import { DetailsScreenProps } from '../types/Details';
import { CommentItemProps } from '../types/CommentItem';
import { RedditAccessTokenResponse } from '../types/AuthContext';

export default function Details(props: DetailsScreenProps) {
  const authContext = useContext(AuthContext);
  const [filter, setFilter] = useState('best');
  const redditAccessToken = authContext?.token.data as RedditAccessTokenResponse;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => (
        <FilterBox data={{ filter, setFilter }} />
      ),
    });
  }, [navigation]);

  const comments = useQuery(`comments-for-${props.route.params.data.id}-${filter}-${props.route.params.data.subreddit}`, () => RedditServices.getComments(props.route.params.data.id, props.route.params.data.subreddit, filter, redditAccessToken.data.access_token));

  useEffect(() => {
    comments.refetch();
  }, [filter]);

  const renderItem = ({ item }: { item: CommentItemProps }): JSX.Element => {
    return <Comment key={item.data.id} data={item.data} />
  };

  if (comments.isLoading) {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatlist}
          data={null}
          renderItem={renderItem}
          refreshing={comments.isLoading}
          onRefresh={comments.refetch}
          ListHeaderComponent={<DetailsHeader data={props.route.params.data.id} />}
        />
      </View>
    );
  }

  if (comments.isError) {
    return (
      <View style={styles.container}>
        <ErrorMessage message="Error while getting comments." action={comments.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const commentsData = comments?.data?.data[1].data.children;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={commentsData.slice(0, -1)}
        renderItem={renderItem}
        refreshing={comments.isLoading}
        onRefresh={comments.refetch}
        ListHeaderComponent={<DetailsHeader data={props.route.params.data.id} />}
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
