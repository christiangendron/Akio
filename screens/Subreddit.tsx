import {StyleSheet, View, Text} from 'react-native';
import AppTheme from '../styles/AppTheme';

interface SubredditProps {
  route: {
    params: {
      data: string;
    }
  }
}

export default function Subreddit(props:SubredditProps) {
  return (
    <View style={styles.container}>
      <Text>Subreddit {props.route.params.data}</Text>
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
