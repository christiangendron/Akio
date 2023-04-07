import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AppTheme from '../styles/AppTheme';
import { ErrorMEssageProps } from '../types/ErrorMessage';

export default function ErrorMessage(props:ErrorMEssageProps) {
  return (
    <View style={styles.container}>
      <Text>
        {props.message}
      </Text>
      <TouchableOpacity
        onPress={props.action}
        style={styles.button}>
        <Text>{props.actionMessage}</Text>
      </TouchableOpacity>
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
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

