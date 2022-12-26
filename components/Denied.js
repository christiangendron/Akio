import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import AppTheme from '../styles/AppTheme';

function Denied(props) {
  return (
    <View style={styles.container}>
      <Text>
        You must be authenticated to view this content.
      </Text>
      <TouchableOpacity
        onPress={props.checkAuth}
        style={styles.button}>
        <Text>Get authenticated</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Denied;

Denied.propTypes = {
  checkAuth: PropTypes.func,
};

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
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
