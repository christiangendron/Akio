import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

function PostItem(props) {
  return (
    <View>
      <Text>
        {props.data.title}
      </Text>
      <Text>
        {props.data.body}
      </Text>
    </View>
  );
}

PostItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
};

export default PostItem;