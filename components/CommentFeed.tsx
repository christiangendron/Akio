import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import RedditServices from '../services/RedditServices';
import { PostProp } from '../types/PostProp';
import CommentItem, { CommentItemProps } from './CommentItem';
import ErrorMessage from './ErrorMessage';
import PostItem from './PostItem';

interface CommentFeedProps {
  data: string;
}

function CommentFeed(props: CommentFeedProps) {
  const { token } = useContext(AuthContext);

  const comments = useQuery(`comments-for-${props.data}`, () => RedditServices.getComments(props.data, token.data.data.access_token));

  if (comments.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
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

  const commentsData = comments?.data?.data.data.children;

  const renderItem = ({ item }: { item: CommentItemProps }): JSX.Element => {
    return <CommentItem key={item.data.id} data={item.data} />
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={commentsData}
        renderItem={renderItem}
        refreshing={comments.isLoading}
        onRefresh={comments.refetch}
      />
    </View>
  );
};

export default CommentFeed;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  flatlist: {
    flex: 1,
    width: '100%',
  },
});