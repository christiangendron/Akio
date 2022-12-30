import {Text, View, StyleSheet} from 'react-native';
import AppTheme from '../styles/AppTheme';
import PostIntereaction from './PostIntereaction';
import { PostProp } from '../types/PostProp';

function PostWithGallery(props:PostProp) {

  const intereactionData = {
    id: props.data.id,
    ups: props.data.ups,
    num_comments: props.data.num_comments,
    created_utc: props.data.created_utc,
    subreddit: props.data.subreddit,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.data.title}
      </Text>
      <Text style={styles.text}>
       IS GALLERY, not implemented yet
      </Text>
      <PostIntereaction data={intereactionData}/>
    </View>
  );
}

export default PostWithGallery;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppTheme.white,
    flex: 1,
    height: 'auto',
    marginVertical: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'left',
  },
});
