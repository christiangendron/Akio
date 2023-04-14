import { Text, View, Image, TouchableOpacity } from 'react-native';
import { roundedCount, timeSince } from '../tools/Formating';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PostOption from './PostOptions';
import { PostInteractionProps } from '../types/PostInteraction';
import { StackParams } from '../types/Navigator';

export default function PostInteraction(props: PostInteractionProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const currentPost = props.data;

  return (
    <View className='flex flex-row justify-evenly items-center px-3 my-3'>
      <View>
        <TouchableOpacity
          className='flex-row space-x-1'
          onPress={() => navigation.push('Details', { data: props.data })}>
          <Image source={require('../assets/icons/up-arrow.png')} className='w-5 h-5' />
          <Text className='text-sm'>{roundedCount(currentPost.data.ups)}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          className='flex-row space-x-1'
          onPress={() => navigation.push('Details', { data: props.data })}>
          <Image source={require('../assets/icons/chat.png')} className='w-5 h-5' />
          <Text className='text-sm'>{roundedCount(currentPost.data.num_comments)}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          className='flex-row space-x-1'
          onPress={() => navigation.push('Details', { data: props.data })}>
          <Image source={require('../assets/icons/clock.png')} className='w-5 h-5' />
          <Text className='text-sm'>{timeSince(currentPost.data.created_utc)}</Text>
        </TouchableOpacity>
      </View>
      <Image source={require('../assets/icons/upvote.png')} className='w-5 h-5' />
      <Image source={require('../assets/icons/downvote.png')} className='w-5 h-5' />
      <View>
        <PostOption />
      </View>
    </View>
  );
}