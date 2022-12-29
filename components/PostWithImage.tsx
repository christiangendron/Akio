import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppTheme from '../styles/AppTheme';
import {decode} from 'html-entities';
import {useNavigation} from '@react-navigation/native';
import PostIntereaction from './PostIntereaction';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/Navigator';

function PostWithImage(props:PostWithImageProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  const currPost = props.data;

  const imageThumb = decode(currPost.preview.images[0].resolutions[2].url);
  const thumbHeight = currPost.preview.images[0].resolutions[2].height;
  const source = decode(currPost.preview.images[0].source.url);
  const image = <Image style={{resizeMode: 'contain', width: '100%', height: thumbHeight}} source={{uri: imageThumb}} />;

  const fullsizeData = {
    id: currPost.id,
    author_fullname: currPost.author_fullname,
    url: source,
  }

  const intereactionData = {
    id: currPost.id,
    ups: currPost.ups,
    num_comment: currPost.num_comments,
    created_utc: currPost.created_utc,
    subreddit: currPost.subreddit,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Details')}>
        <Text style={styles.text}>
        {currPost.title}
      </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{height: thumbHeight, width: '100%'}}
        onPress={() => navigation.navigate('FullSizeImage', {data: fullsizeData})}>
        {image}
      </TouchableOpacity>
      <PostIntereaction data={intereactionData}/>
    </View>
  );
}

export default PostWithImage;

interface PostWithImageProps {
  data: {
    id: string;
      ups: number;
      num_comments: number;
      created_utc: number;
      subreddit: string;
      author_fullname: string;
      title: string;
      preview: {
        images: {
          resolutions: {
            url: string;
            height: number;
          }[]
          source: {
            url: string;
          }
        }[]
      }
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppTheme.white,
    flex: 1,
    height: 'auto',
    marginVertical: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'left',
  },
});
