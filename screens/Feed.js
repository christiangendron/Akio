import {StyleSheet, View, FlatList} from 'react-native';
import PostItem from '../components/PostItem';
import AppTheme from '../styles/AppTheme';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-345345345',
    title: 'Title 1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-123123123',
    title: 'Title 2',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-67878678',
    title: 'Title 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];

export default function Feed() {
  const renderItem = ({item}) => (
    <PostItem data={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppTheme.white,
    flex: 1,
    justifyContent: 'center',
  },
});
