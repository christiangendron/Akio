import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

function PostItem(props) {
  const currPost = props.data;

  return (
    <View>
      <Text>
        {currPost.title}
      </Text>
      <Text>
        {currPost.body}
      </Text>
    </View>
  );
}

PostItem.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
};

export default PostItem;
