import { Text, View, TouchableOpacity } from 'react-native';
import { roundedCount } from '../tools/Formating';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../types/Navigator';
import PostOptions from './PostOptions';
import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { PostProps } from './items/Post';

export default function PostInteraction(props: PostProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const settings = useContext(SettingsContext);

  const community = <TouchableOpacity className='flex-row flex space-x-1 bg-gray-300 rounded-lg p-2' onPress={() => navigation.push('Community', { name: props.name, id: props.community_id })}><Text>{props.name}</Text></TouchableOpacity>;
  const votes = <TouchableOpacity className='flex-row flex space-x-1 bg-gray-300 rounded-lg p-2' onPress={() => navigation.push('Details', { ...props })}><Text>{roundedCount(props.votes)}↑</Text></TouchableOpacity>;
  const username = <TouchableOpacity className='flex-row flex space-x-1 bg-gray-300 rounded-lg p-2' onPress={() => navigation.navigate('Overview', { name: props.username, id: props.user_id })}><Text>{props.username}</Text></TouchableOpacity>;
  
  return (
    <View className='gap-1 flex-row p-2'>
      {settings?.showCommunity ? community : null}
      {settings?.showVotes ? votes : null}
      {settings?.showUsername ? username : null}
      <PostOptions id={props.id} username={props.username} user_id={props.user_id} community={props.name} community_id={props.community_id} />
    </View>
  );
}