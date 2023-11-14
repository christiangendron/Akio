import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import PostOptions from '../modal/PostOptionsModal';
import { PostProps } from '../items/Post';
import Pill from '../items/Pill';

export default function PostInteraction(props: PostProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  return (
    <View className='flex-row mx-2 mb-2 mt-2'>
      <Pill text={props.community_name} handler={() => navigation.push('Community', { name: props.community_name, id: props.community_id, type: 'community-posts', withSearch: true, withGeneration: true })}/>
      <Pill text={props.username} handler={() => navigation.push('Overview', { name: props.username, id: props.user_id, type: 'user-posts', withSearch: true })}/>
      <PostOptions id={props.id} username={props.username} user_id={props.user_id} community={props.community_name} community_id={props.community_id} keyToInvalidate={props.keyToInvalidate} />
    </View>
  );
}