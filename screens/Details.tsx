import { StyleSheet, View, Text } from 'react-native';
import AppTheme from '../styles/AppTheme';

export type DetailsScreenProps = {
  route: {
    params: {
      data: string;
    }
  }
}

export default function Details(props: DetailsScreenProps) {

  return (
    <View style={styles.container}>
      <Text>Details for : {props.route.params.data}</Text>
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
