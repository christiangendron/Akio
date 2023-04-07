import { Text, View, StyleSheet } from 'react-native';
import AppTheme from '../styles/AppTheme';

export default function NoPostsFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        No posts found with that keyword.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: AppTheme.lightBlue,
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    margin: 25,
    width: 200,
  },
  text: {
    margin: 25,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

