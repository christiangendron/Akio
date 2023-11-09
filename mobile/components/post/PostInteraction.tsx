import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import PostOptions from '../modal/PostOptionsModal';
import { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { PostProps } from '../items/Post';
import Pill from '../items/Pill';

export default function PostInteraction(props: PostProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const settings = useContext(SettingsContext);

  const community = <Pill text={props.community_name} handler={() => navigation.push('Community', { name: props.community_name, id: props.community_id })}/>;
  const username = <Pill text={props.username} handler={() => navigation.navigate('Overview', { name: props.username, id: props.user_id })}/>;
  const options =  <PostOptions id={props.id} username={props.username} user_id={props.user_id} community={props.community_name} community_id={props.community_id} keyToInvalidate={props.keyToInvalidate} />;

  return (
    <View className='flex-row mx-2 mb-2'>
      {settings?.showCommunity ? community : null}
      {settings?.showUsername ? username : null}
      {settings?.showOptions ? options : null}
    </View>
  );
}