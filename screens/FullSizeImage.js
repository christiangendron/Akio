import {StyleSheet, View, Image} from 'react-native';
import AppTheme from '../styles/AppTheme';
import PropTypes from 'prop-types';

export default function FullSizeImage(props) {
  return (
    <View style={styles.container}>
      <Image source={{uri: props.route.params.data}} style={styles.image} />
    </View>
  );
}

FullSizeImage.propTypes = {
  data: PropTypes.object,
  route: PropTypes.object,
};

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
});
