import {Text, View, StyleSheet} from 'react-native';
import AppTheme from '../styles/AppTheme';
import PostIntereaction from './PostIntereaction';

interface PostWithTextProps {
  data: {
    id: string;
    ups: number;
    num_comments: number;
    created_utc: number;
    subreddit: string;
    title: string;
  }
}

function PostWithText(props:PostWithTextProps) {
  const currPost = props.data;

  const intereactionData = {
    id: currPost.id,
    ups: currPost.ups,
    num_comment: currPost.num_comments,
    created_utc: currPost.created_utc,
    subreddit: currPost.subreddit,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {currPost.title}
      </Text>
      <PostIntereaction data={intereactionData}/>
    </View>
  );
}

export default PostWithText;

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
