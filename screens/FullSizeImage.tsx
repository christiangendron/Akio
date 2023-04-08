import { View, Text, Image } from 'react-native';
import { FullSizeImageScreenProps } from '../types/FullSizeImage';

export default function FullSizeImageScreen(props: FullSizeImageScreenProps) {
  const currPost = props.route.params.data;

  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text>{currPost.id}</Text>
      <Text>By {currPost.author_fullname}</Text>
      <Image source={{ uri: props.route.params.data.url }} />
    </View>
  );
}
