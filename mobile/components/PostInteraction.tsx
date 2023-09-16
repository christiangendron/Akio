import { Text, View, Image, TouchableOpacity } from 'react-native';
import { roundedCount } from '../tools/Formating';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import { PostProps } from '../types/Post';
import PostOptions from './PostOptions';
import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

export default function PostInteraction(props: PostProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const settings = useContext(SettingsContext);

  const community = settings?.showCommunity ? <TouchableOpacity className='flex-row flex space-x-1 bg-gray-300 rounded-lg p-2' onPress={() => navigation.push('Community', { name: props.name, id: props.community_id })}><Text>{props.name}</Text></TouchableOpacity> : null;
  const votes = settings?.showVotes ? <TouchableOpacity className='flex-row flex space-x-1 bg-gray-300 rounded-lg p-2' onPress={() => navigation.push('Details', { ...props })}><Image source={require('../assets/icons/up-arrow.png')} className='w-5 h-5' /><Text>{roundedCount(props.votes)}</Text></TouchableOpacity> : null;
  const username = settings?.showUsername ? <TouchableOpacity className='flex-row flex space-x-1 bg-gray-300 rounded-lg p-2' onPress={() => navigation.navigate('Overview', { name: props.username, id: props.user_id })}><Text>{props.username}</Text></TouchableOpacity>  : null;
  
  return (
    <View className='gap-1 flex-row p-2'>
      {community}
      {votes}
      {username}
      <PostOptions id={props.id} username={props.username} user_id={props.user_id} community={props.name} community_id={props.community_id} />
    </View>
  );
}