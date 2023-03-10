import { StyleSheet, View, Text, Image } from 'react-native';
import AppTheme from '../styles/AppTheme';

export type FullSizeImageScreenProps = {
  route: {
    params: {
      data: {
        id: string;
        author_fullname: string;
        url: string;
      }
    }
  }
}

function FullSizeImageScreen(props: FullSizeImageScreenProps) {

  const curr = props.route.params.data;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{curr.id}</Text>
      <Text style={styles.text}>By {curr.author_fullname}</Text>
      <Image source={{ uri: props.route.params.data.url }} style={styles.image} />
    </View>
  );
}

export default FullSizeImageScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppTheme.black,
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    backgroundColor: AppTheme.white,
    height: 500,
    width: '100%',
  },
  text: {
    color: AppTheme.white,
  }
});
