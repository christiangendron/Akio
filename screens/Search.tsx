import { StyleSheet, View } from 'react-native';
import AppTheme from '../styles/AppTheme';
import SearchBarComp from '../components/SearchBar';

export default function Search() {
  return (
    <View style={styles.container}>
      <SearchBarComp />
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
