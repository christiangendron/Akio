import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import AppTheme from '../styles/AppTheme';
import {decode} from 'html-entities';
import PostIntereaction from './PostIntereaction';

function PostWithImage(props) {
  const currPost = props.data.data;
  const imageThumb = decode(currPost.preview.images[0].resolutions[2].url);
  const thumbHeight = currPost.preview.images[0].resolutions[2].height;

  const intereactionData = {
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
      <TouchableOpacity
        style={{height: thumbHeight, width: '100%'}}
        onPress={() => console.log('pressed image')}>
        <Image style={{resizeMode: 'cover', width: '100%', height: thumbHeight}} source={{uri: imageThumb}} />
      </TouchableOpacity>
      <PostIntereaction data={intereactionData}/>
    </View>
  );
}

PostWithImage.propTypes = {
  data: PropTypes.object,
};

export default PostWithImage;

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
