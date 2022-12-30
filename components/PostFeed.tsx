import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { PostProp } from '../types/PostProp';
import PostItem from './PostItem';

interface FeedProps {
  data: any;
  isLoading: boolean;
  action: () => void;
}

function PostFeed(props: FeedProps) {
  const renderItem = ({ item }: { item: PostProp }): JSX.Element => {
    return <PostItem key={item.data.id} data={item.data} />
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={props.data}
        renderItem={renderItem}
        refreshing={props.isLoading}
        onRefresh={props.action}
      />
    </View>
  );
};

export default PostFeed;

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