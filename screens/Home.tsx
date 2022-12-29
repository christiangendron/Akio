import {useContext} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import PostWithImage from '../components/PostWithImage';
import AppTheme from '../styles/AppTheme';
import {useQuery} from 'react-query';
import {AuthContext} from '../context/AuthContext';
import RedditPosts from '../services/RedditPost';
import ErrorMessage from '../components/ErrorMessage';
import PostWithoutImage from '../components/PostWithText';
import PostWithVideo from '../components/PostWithVideo';
import PostWithGallery from '../components/PostWithGallery';

interface Item {
  data: {
    id: string;
    ups: number;
    num_comments: number;
    created_utc: number;
    subreddit: string;
    author_fullname: string;
    thumbnail: string;
    is_video: boolean;
    is_gallery: boolean;
    title: string;
    preview: {
      images: {
        resolutions: {
          url: string;
          height: number;
        }[]
        source: {
          url: string;
        }
      }[]
    }
  }
}

export default function Home() {
  const {token} = useContext(AuthContext);

  const posts = useQuery('posts-all', () => RedditPosts.getPosts('canada', token.data.data.access_token));

  const renderItem = ({item}: {item: Item}): JSX.Element => {
    if (item.data.thumbnail === 'default') {
      return <PostWithoutImage key={item.data.id} data={item}/>;
    } else if (item.data.is_video) {
      return <PostWithVideo key={item.data.id} data={item} />;
    } else if (item.data.is_gallery) {
      return <PostWithGallery key={item.data.id} data={item} />;
    } else {
      return <PostWithImage key={item.data.id} data={item} />;
    }
  };

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

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={posts?.data?.data.data.children}
        renderItem={renderItem}
        refreshing={posts.isLoading}
        onRefresh={posts.refetch} />
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
