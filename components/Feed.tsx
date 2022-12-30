import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import PostWithImage from '../components/PostWithImage';
import PostWithoutImage from '../components/PostWithText';
import PostWithVideo from '../components/PostWithVideo';
import PostWithGallery from '../components/PostWithGallery';
import { PostProp } from '../types/PostProp';

interface FeedProps {
  data: any;
  isLoading: boolean;
  action: () => void;
}

function Feed(props:FeedProps) {
const renderItem = ({item}: {item: PostProp}): JSX.Element => {
    if (item.data.thumbnail === 'default') {
        return <PostWithoutImage key={item.data.id} data={item.data}/>;
    } else if (item.data.is_video) {
        return <PostWithVideo key={item.data.id} data={item.data}/>;
    } else if (item.data.is_gallery) {
        return <PostWithGallery key={item.data.id} data={item.data} />;
    } else {
      return <PostWithImage key={item.data.id} data={item.data} />;
    }
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

export default Feed;

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