import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import AppTheme from '../styles/AppTheme';
import {decode} from 'html-entities';

function PostWithImage(props) {
  const currPost = props.data.data;
  const imageThumb = decode(currPost.preview.images[0].resolutions[2].url);
  const thumbHeight = currPost.preview.images[0].resolutions[2].height;

  return (
    <View style={styles.container}>
      <Text>
        {currPost.title}
      </Text>
      <TouchableOpacity
        style={{height: thumbHeight, width: '100%'}}
        onPress={() => console.log('pressed image')}>
        <Image style={{resizeMode: 'cover', width: '100%', height: thumbHeight}} source={{uri: imageThumb}} />
      </TouchableOpacity>
      <Text>
        {currPost.subreddit}
      </Text>
    </View>
  );
}

PostWithImage.propTypes = {
  data: PropTypes.object,
};

export default PostWithImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppTheme.lightgray,
    flex: 1,
    height: 'auto',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
