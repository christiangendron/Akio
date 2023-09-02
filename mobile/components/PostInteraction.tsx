import { Text, View, Image, TouchableOpacity } from 'react-native';
import { roundedCount, timeSince } from '../tools/Formating';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PostOption from './PostOptions';
import { PostInteractionProps } from '../types/PostInteraction';
import { StackParams } from '../types/Navigator';
import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

export default function PostInteraction(props: PostInteractionProps) {
  const settings = useContext(SettingsContext);
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const currentPost = props.data;

  const username = <TouchableOpacity
  className='flex-row flex space-x-1 bg-slate-300 rounded-lg p-2'
  onPress={() => navigation.push('Details', { data: props.data })}>
   <Text onPress={() => navigation.navigate('Overview', { data: currentPost.data.author })}>u/{currentPost.data.author}</Text> 
  </TouchableOpacity>

  const subreddit = <TouchableOpacity
  className='flex-row flex space-x-1 bg-slate-300 rounded-lg p-2'
  onPress={() => navigation.push('Subreddit', { data: currentPost.data.subreddit })}>
  <Text>r/{currentPost.data.subreddit}</Text>
  </TouchableOpacity>

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} className='p-2 gap-1'>
      {settings?.showSubReddit ? subreddit : <></>}
   <TouchableOpacity
       className='flex-row flex space-x-1 bg-slate-300 rounded-lg p-2 w-16'
       onPress={() => navigation.push('Details', { data: props.data })}>
       <Image source={require('../assets/icons/up-arrow.png')} className='w-5 h-5' />
       <Text>{roundedCount(currentPost.data.ups)}</Text>
   </TouchableOpacity>
   <TouchableOpacity
       className='flex-row flex space-x-1 bg-slate-300 rounded-lg p-2 w-16'
       onPress={() => navigation.push('Details', { data: props.data })}>
       <Image source={require('../assets/icons/chat.png')} className='w-5 h-5' />
       <Text>{roundedCount(currentPost.data.num_comments)}</Text>
     </TouchableOpacity>
   <TouchableOpacity
       className='flex-row flex space-x-1 bg-slate-300 rounded-lg p-2 w-16'
       onPress={() => navigation.push('Details', { data: props.data })}>
       <Image source={require('../assets/icons/clock.png')} className='w-5 h-5' />
       <Text>{timeSince(currentPost.data.created_utc)}</Text>
   </TouchableOpacity>
   {settings?.showUserName ? username : <></>}
   <TouchableOpacity className='flex-row flex space-x-1 bg-slate-300 rounded-lg'>
      <PostOption id={props.data.data.id} name={props.data.data.name} author={props.data.data.author} subreddit={props.data.data.subreddit} />   
    </TouchableOpacity>
 </View>
 
  );
}