import {Text, View, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import AppTheme from '../styles/AppTheme';
import {roundedCount, timeSince} from '../tools/Formating';

function PostIntereaction(props) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/up-arrow.png')} style={styles.icons}/>
      <Text style={styles.text}>{roundedCount(props.data.ups)}</Text>
      <Image source={require('../assets/icons/chat.png')} style={styles.icons}/>
      <Text style={styles.text}>{roundedCount(props.data.num_comment)}</Text>
      <Image source={require('../assets/icons/clock.png')} style={styles.icons}/>
      <Text style={styles.text}>{timeSince(props.data.created_utc)}</Text>
      <Image source={require('../assets/icons/placeholder.png')} style={styles.icons}/>
      <Text style={styles.text}>{props.data.subreddit}</Text>
    </View>
  );
}

PostIntereaction.propTypes = {
  data: PropTypes.object,
};

export default PostIntereaction;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppTheme.white,
    flex: 1,
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 5,
  },
  icons: {
    height: 20,
    marginHorizontal: 5,
    width: 20,
  },
  text: {
    fontSize: 15,
  },
});
