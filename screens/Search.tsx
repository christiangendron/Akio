import { StyleSheet, View, Text } from 'react-native';
import AppTheme from '../styles/AppTheme';

export default function Search() {
  return (
    <View style={styles.container}>
      <Text>Search placeholder</Text>
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
});
