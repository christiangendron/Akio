import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import AppTheme from '../styles/AppTheme';

function ErrorMessage(props) {
  return (
    <View style={styles.container}>
      <Text>
        {props.message}
      </Text>
      <TouchableOpacity
        onPress={props.action}
        style={styles.button}>
        <Text>Action</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ErrorMessage;

ErrorMessage.propTypes = {
  message: PropTypes.string,
  action: PropTypes.func,
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

