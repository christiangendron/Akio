import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppTheme from '../styles/AppTheme';

export default function Account() {

  return (
    <View style={styles.container}>
      <Text>Sign in in order to access your Reddit account.</Text>
      <TouchableOpacity
        onPress={() => console.log('Open reddit authentification menu')}
        style={styles.button}>
        <Text>Sign in with Reddit</Text>
      </TouchableOpacity>
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
  button: {
    alignItems: 'center',
    backgroundColor: AppTheme.lightBlue,
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    margin: 25,
    width: 200,
  },
  flatlist: {
    flex: 1,
    width: '100%',
  },
});
