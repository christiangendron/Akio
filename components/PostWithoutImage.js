import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import AppTheme from '../styles/AppTheme';
import PostIntereaction from './PostIntereaction';

function PostWithoutImage(props) {
  const currPost = props.data.data;

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

PostWithoutImage.propTypes = {
  data: PropTypes.object,
};

export default PostWithoutImage;

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
