import {Text, View, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import AppTheme from '../styles/AppTheme';

function PostItem(props) {
  const currPost = props.data.data;

  return (
    <View style={styles.container}>
      <Text>
        {currPost.title}
      </Text>
      <Image style={styles.thumbnail} source={{uri: currPost.thumbnail}} />
      <Text>
        {currPost.subreddit}
      </Text>
    </View>
  );
}

PostItem.propTypes = {
  data: PropTypes.object,
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppTheme.lightgray,
    flex: 1,
    justifyContent: 'center',
    marginVertical: 5,
    padding: 10,
  },
  thumbnail: {
    height: 400,
    resizeMode: 'contain',
    width: '100%',
  },
});
